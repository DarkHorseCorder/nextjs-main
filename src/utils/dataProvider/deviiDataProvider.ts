/* eslint-disable @typescript-eslint/no-explicit-any */
import { ApolloClient, gql, NormalizedCacheObject } from "@apollo/client";
import { DataProvider } from "react-admin";
import { omit } from "lodash";

// Manual selection of fields: TODO figure out how to get from the schema
const fields: { [key in string]: string } = {
  users:
    "id:roleid first_name last_name email phone company_name company_size_id referred_by_id referred_by_other state zipcode createtime user_typeid ",
  temp_registration:
    "id:regid first_name last_name email phone company_name company_size_id referred_by_id referred_by_other state zipcode",
  company_size: "id value ordering",
  referred_by: "id value ordering",
  database:
    "id tenantid name description projectid database_env_id database_platform_id isInternal createtime",
  database_platforms: "id platform default_port driver",
  database_environments: "id environment",
  user_types: "id:user_typeid typename role_classid",
  user_password_reset_requests: "id email",
};

// Manual selection of alias id fields - react admin table is expecting an id field - TODO figure out how to get from the schema
const alias_id_fields: { [key in string]: string } = {
  users: "id:roleid",
  temp_registration: "id:regid",
  company_size: "id",
  referred_by: "id",
  database: "id ",
  database_platforms: "id ",
  database_environments: "id ",
  user_types: "id:user_typeid",
  user_password_reset_requests: "id",
};

// Manual selection of id fields - TODO figure out how to get from the schema
const real_id_field: { [key in string]: string } = {
  users: "roleid",
  temp_registration: "regid",
  company_size: "id",
  referred_by: "id",
  database: "id",
  database_platforms: "id ",
  database_environments: "id ",
  user_types: "user_typeid",
  user_password_reset_requests: "id",
};

const convertResource = (resource: string) => {
  return resource === "invites" ? "temp_registration" : resource;
};

export const deviiDataProvider = (
  client: ApolloClient<NormalizedCacheObject>
) =>
  ({
    getList: (resource: string, { sort, pagination, filter }) => {
      const reducedResource = convertResource(resource);
      let filterString = "";
      Object.keys(filter).forEach((key) => {
        console.log(key);

        //Search and Filters
        if (key === "search") {
          if (filterString) {
            if (typeof filter[key] === "string") {
              filterString += ` OR first_name ilike "%${filter[key]}%" OR last_name ilike "%${filter[key]}%" OR email ilike "%${filter[key]}%" OR company_name ilike "%${filter[key]}%"`;
            } else {
              filterString += ` OR phone ilike ${filter[key]} OR zipcode ilike ${filter[key]}`;
            }
          } else {
            if (typeof filter[key] === "string") {
              filterString += `first_name ilike "%${filter[key]}%" OR last_name ilike "%${filter[key]}%" OR email ilike "%${filter[key]}%" OR company_name ilike "%${filter[key]}%"`;
            } else {
              filterString += `phone ilike ${filter[key]} OR zipcode ilike ${filter[key]}`;
            }
          }
        } else if (filterString) {
          if (typeof filter[key] === "string") {
            filterString += ` AND ${key} = "${filter[key]}"`;
          } else {
            filterString += ` AND ${key} = ${filter[key]}`;
          }
        } else {
          if (typeof filter[key] === "string") {
            filterString += `${key} = "${filter[key]}"`;
          } else {
            filterString += `${key} = ${filter[key]}`;
          }
        }
      });

      const { field, order } = sort;
      const { page, perPage } = pagination;

      return client
        .query({
          query: gql`
          query get${reducedResource}($filter: String, $ordering: [String], $limit: Int, $offset: Int) {
            ${reducedResource}(filter: $filter, ordering: $ordering, limit: $limit, offset: $offset) {
              ${fields[reducedResource]}
            }
          Aggregates {
              count(subquery: "query ${reducedResource}{${reducedResource}{${alias_id_fields[reducedResource]}}}", filter: $filter)
            }
          }`,

          variables: {
            limit: perPage,
            offset: (page - 1) * perPage,
            ordering: [`${[field]} ${order.toLowerCase()}`],
            filter: filterString,
          },
          fetchPolicy: "network-only",
        })
        .then((result) => {
          return {
            data: result.data[reducedResource].map((item: any) => ({
              ...item,
              id: Number(item.id),
            })),
            total: result.data["Aggregates"].count[0].count,
          };
        })
        .catch((error) => {
          throw new Error(error);
        });
    },
    getOne: (resource, params) => {
      const reducedResource = convertResource(resource);
      return client
        .query({
          query: gql`
              query ${reducedResource}($filter: String!) {
                  ${reducedResource}(filter: $filter) {
                      ${fields[reducedResource]}
                  }
              }`,
          variables: {
            filter: `${real_id_field[reducedResource]} = ${params.id}`,
          },
        })
        .then((result) => {
          return {
            data: result.data[reducedResource][0],
          };
        });
    },
    getMany: (resource, params) => {
      const reducedResource = convertResource(resource);
      return client
        .query({
          query: gql`
              query ($filter: String) {
                  ${reducedResource}(filter: $filter) {
                      ${fields[reducedResource]}
                  }
              }`,
          variables: {
            filter: `${real_id_field[reducedResource]} in [${params.ids}]`,
          },
        })
        .then((result) => ({
          data: result.data[reducedResource].map((item: any) => ({
            ...item,
            id: Number(item.id),
          })),
        }));
    },
    getManyReference: (resource, { target, id, sort, pagination, filter }) => {
      const reducedResource = convertResource(resource);
      let filterString = "";
      Object.keys(filter).forEach((key) => {
        if (filterString) {
          if (typeof filter[key] === "string") {
            filterString += ` AND ${key} = "${filter[key]}"`;
          } else {
            filterString += ` AND ${key} = ${filter[key]}`;
          }
        } else {
          if (typeof filter[key] === "string") {
            filterString += `${key} = "${filter[key]}"`;
          } else {
            filterString += `${key} = ${filter[key]}`;
          }
        }
      });

      const { field, order } = sort;
      const { page, perPage } = pagination;
      return client
        .query({
          query: gql`
          query get${reducedResource}($filter: String, $ordering: [String], $limit: Int, $offset: Int) {
            ${reducedResource}(filter: $filter, ordering: $ordering, limit: $limit, offset: $offset) {
              ${fields[reducedResource]}
            }
          Aggregates {
              count(subquery: "query ${reducedResource}{${reducedResource}{${alias_id_fields[reducedResource]}}}", filter: $filter)
            }
          }`,
          variables: {
            limit: perPage,
            offset: (page - 1) * perPage,
            order_by: { [field]: order.toLowerCase() },
            filter: filterString,
          },
        })
        .then((result) => ({
          data: result.data[reducedResource],
          total: result.data[`${reducedResource}_aggregate`].aggregate.count,
        }));
    },
    create: (resource, params) => {
      const reducedResource = convertResource(resource);
      return client
        .mutate({
          mutation: gql`
              mutation ($data: ${reducedResource}Input!) {
                  create_${reducedResource}(input: $data) {
                      ${fields[reducedResource]}
                  }
              }`,
          variables: {
            data: omit(params.data, ["__typename", "createtime"]),
          },
        })
        .then((result) => ({
          data: result.data[`create_${reducedResource}`],
        }));
    },
    update: (resource, params) => {
      const reducedResource = convertResource(resource);
      const old_key = "id";
      const new_key = real_id_field[reducedResource];
      if (old_key !== new_key) {
        Object.defineProperty(
          params.data,
          new_key,
          Object.getOwnPropertyDescriptor(
            params.data,
            old_key
          ) as PropertyDescriptor
        );
        delete params.data[old_key];
      }
      return client
        .mutate({
          mutation: gql`
              mutation ($id: ID!, $data: ${reducedResource}Input!) {
                  update_${reducedResource}(${real_id_field[reducedResource]}:$id input: $data) {
                      ${fields[reducedResource]}
                  }
              }`,
          variables: {
            id: params.id,
            // Need to omit the __typename and createtime as they can"t be updated in the record, and the server will come back with an error.
            data: omit(params.data, ["__typename", "createtime"]),
          },
        })
        .then((result) => ({
          data: result.data[`update_${reducedResource}`],
        }));
    },
    updateMany: (resource, params) => {
      const reducedResource = convertResource(resource);
      return client
        .mutate({
          mutation: gql`
              mutation ($filter: filter, $data: ${reducedResource}_set_input!) {
                  update_${reducedResource}(filter: $filter, _set: $data) {
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
          data: result.data[`delete_${reducedResource}`],
        }));
    },
    delete: (resource, params) => {
      const reducedResource = convertResource(resource);
      return client
        .mutate({
          mutation: gql`
              mutation ($id: ID!) {
                  delete_${reducedResource}(${real_id_field[reducedResource]}: $id) {
                      ${fields[reducedResource]}
                  }
              }`,
          variables: {
            id: params.id,
          },
        })
        .then((result) => ({
          data: result.data[`delete_${reducedResource}`],
        }));
    },
    deleteMany: (resource, params) => {
      const reducedResource = convertResource(resource);
      return client
        .mutate({
          mutation: gql`
              mutation ($filter: ${reducedResource}_bool_exp!) {
                  delete_${reducedResource}(filter: $filter) {
                      affected_rows
                  }
              }`,
          variables: {
            filter: {
              id: { _in: params.ids },
            },
          },
        })
        .then((result) => ({
          data: result.data[`delete_${reducedResource}`],
        }));
    },
    getUserProfile(params: any) {
      return client
        .query({
          query: gql`
              query users($filter: String!) {
                  users(filter: $filter) {
                      ${fields["users"]}
                  }
              }`,
          variables: {
            filter: `${real_id_field["users"]} = ${params.id}`,
          },
        })
        .then((result) => {
          return {
            data: result.data["users"][0],
          };
        });
    },

    updateUserProfile(params: any) {
      const resource = "users";
      const old_key = "id";
      const new_key = real_id_field[resource];
      if (old_key !== new_key) {
        Object.defineProperty(
          params.data,
          new_key,
          Object.getOwnPropertyDescriptor(
            params.data,
            old_key
          ) as PropertyDescriptor
        );
        delete params.data[old_key];
      }
      return client
        .mutate({
          mutation: gql`
              mutation ($id: ID!, $data: ${resource}Input!) {
                  update_${resource}(${real_id_field[resource]}:$id input: $data) {
                      ${fields[resource]}
                  }
              }`,
          variables: {
            id: params.id,
            // Need to omit the __typename and createtime as they can"t be updated in the record, and the server will come back with an error.
            data: omit(params.data, ["__typename", "createtime"]),
          },
        })
        .then((result) => ({
          data: result.data[`update_${resource}`],
        }));
    },
  } as DataProvider);
