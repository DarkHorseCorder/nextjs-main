/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ApolloClient, gql, NormalizedCacheObject } from "@apollo/client";
import { ACCESS_TOKEN } from "../../constants";
import { omit } from "lodash";
import { removeStorageItem } from "utils/auth";

// Manual selection of fields: TODO figure out how to get from the schema
const fields: { [key in string]: string } = {
  role: "id:roleid login name creatorid createtime capabilities password_setby classes {classid}",
  role_class: "id:classid name creatorid createtime",
  policy_rule: `id:ruleid
  tenantid
  name
  filter
  creatorid
  createtime
  capabilities
  roles
  classes
  targets`,
  tenant: `id:tenantid
  name
  platform
  host
  database
  credential
  createtime`,
  capability: `id:capability package description`,
};

// Manual selection of alias id fields - react admin table is expecting an id field - TODO figure out how to get from the schema
const alias_id_fields: { [key in string]: string } = {
  role: "id:roleid",
  role_class: "id:classid",
  policy_rule: "id:ruleid",
  tenant: "id:tenantid",
  capability: "id:capability",
};

// Manual selection of id fields - TODO figure out how to get from the schema
const real_id_field: { [key in string]: string } = {
  role: "roleid",
  role_class: "classid",
  policy_rule: "ruleid",
  tenant: "tenantid",
  capability: "capability",
};

// NOTE: Devii currently doesn"t have the aggregates available for roles_pbac, instead the getList is getting the entire collection of ids available and using length as the count
export const deviiDataProvderPbac = (
  client: ApolloClient<NormalizedCacheObject>
) => ({
  getList: (resource: string, { sort, pagination, filter }: any) => {
    const { field, order } = sort;
    const { page, perPage } = pagination;

    let sort_field = field;
    if (field === "id") {
      sort_field = real_id_field[resource];
    }

    let filterString = "";
    if (filter.defaultFilter) {
      filterString = filter.defaultFilter;
    } else {
      Object.keys(filter).forEach((key) => {
        if (filterString) {
          if (typeof filter[key] === "string") {
            filterString += ` OR ${key} ilike "%${filter[key]}%"`;
          } else {
            filterString += ` OR ${key} ilike ${filter[key]}`;
          }
        } else {
          if (typeof filter[key] === "string") {
            filterString += `${key} ilike "%${filter[key]}%"`;
          } else {
            filterString += `${key} ilike ${filter[key]}`;
          }
        }
      });
    }

    return client
      .query({
        query: gql`
  		  query get${resource}($filter: String, $ordering: [String], $limit: Int, $offset: Int) {
  			  ${resource}(filter: $filter, ordering: $ordering, limit: $limit, offset: $offset) {
  				  ${fields[resource]}
  			  }
          count:${resource} {
            ${real_id_field[resource]}
          }
        }`,

        variables: {
          limit: perPage,
          offset: (page - 1) * perPage,
          ordering: [`${[sort_field]} ${order.toLowerCase()}`],
          filter: filterString,
        },
        fetchPolicy: "network-only",
      })
      .then((result) => {
        return {
          data: result.data[resource],
          total: result.data[`count`].length,
        };
      })
      .catch((error) => {
        removeStorageItem(ACCESS_TOKEN);
        throw new Error(error);
      });
  },
  getOne: (resource: string, params: any) => {
    return client
      .query({
        query: gql`
            query ${resource}($filter: String!) {
                ${resource}(filter: $filter) {
                    ${fields[resource]}
                }
            }`,
        variables: {
          filter: `${real_id_field[resource]} = ${params.id}`,
        },
      })
      .then((result) => {
        return {
          data: result.data[resource][0],
        };
      });
  },
  getMany: (resource: string, params: any) => {
    return client
      .query({
        query: gql`
            query ($filter: String) {
                ${resource}(filter: $filter) {
                    ${fields[resource]}
                }
            }`,
        variables: {
          filter: `${real_id_field[resource]} in ${JSON.stringify(
            params.ids.map((id: number) => Number(id))
          )}`,
        },
      })
      .then((result) => ({ data: result.data[resource] }));
  },
  getManyReference: (
    resource: string,
    { target, id, sort, pagination, filter }: any
  ) => {
    const { field, order } = sort;
    const { page, perPage } = pagination;
    return client
      .query({
        query: gql`
  		  query get${resource}($filter: String, $ordering: [String], $limit: Int, $offset: Int) {
  			  ${resource}(filter: $filter, ordering: $ordering, limit: $limit, offset: $offset) {
  				  ${fields[resource]}
  			  }
        Aggregates {
            count(subquery: "query ${resource}{${resource}{${real_id_field[resource]}}}", filter: $filter)
          }
        }`,
        variables: {
          limit: perPage,
          offset: (page - 1) * perPage,
          order_by: { [field]: order.toLowerCase() },
          filter: Object.keys(filter).reduce(
            (prev, key) => ({
              ...prev,
              [key]: { _eq: filter[key] },
            }),
            { [target]: { _eq: id } }
          ),
        },
      })
      .then((result) => ({
        data: result.data[resource],
        total: result.data[`${resource}_aggregate`].aggregate.count,
      }));
  },
  create: (resource: string, params: any) => {
    return client
      .mutate({
        mutation: gql`
            mutation ($data: ${resource}Input!) {
                create_${resource}(input: $data) {
                    ${fields[resource]}
                }
            }`,
        variables: {
          data: omit(params.data, ["__typename"]),
        },
      })
      .then((result) => ({
        data: result.data[`create_${resource}`],
      }));
  },
  update: (resource: string, params: any) => {
    return client
      .mutate({
        mutation: gql`
            mutation ($id: ID!, $data: ${resource}Input) {
                update_${resource}(input: $data, ${real_id_field[resource]}: $id) {
                  ${fields[resource]}
                }
            }`,
        variables: {
          id: params.id,
          data: omit(params.data, ["__typename"]),
        },
      })
      .then((result) => ({
        data: result.data[`update_${resource}`],
      }));
  },
  updateMany: (resource: string, params: any) => {
    return client
      .mutate({
        mutation: gql`
            mutation ($filter: ${resource}_bool_exp!, $data: ${resource}_set_input!) {
                update_${resource}(filter: $filter, _set: $data) {
                    affected_rows
                }
            }`,
        variables: {
          filter: {
            id: { _in: params.ids },
          },
          data: omit(params.data, ["__typename"]),
        },
      })
      .then((result) => ({
        data: params.ids,
      }));
  },
  delete: (resource: string, params: any) => {
    return client
      .mutate({
        mutation: gql`
            mutation ($id: ID!) {
                delete_${resource}(${real_id_field[resource]}: $id) {
                  ${fields[resource]}
                }
            }`,
        variables: {
          id: params.id,
        },
        update(cache, { data }) {
          cache.evict({ id: `${resource}:${data[`delete_${resource}`]?.id}` });
        },
      })
      .then((result) => ({
        data: result.data[`delete_${resource}`],
      }));
  },
  deleteMany: (resource: string, params: any) => {
    return client
      .mutate({
        mutation: gql`
            mutation ($id: ID!) {
                delete_${resource}(${real_id_field[resource]}:$id) {
                  roleid
                }
            }`,
        variables: {
          id: params.ids[0],
        },
      })
      .then((result) => ({
        data: params.ids,
      }));
  },
});
