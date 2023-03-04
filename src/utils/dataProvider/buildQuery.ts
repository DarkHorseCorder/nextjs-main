/* eslint-disable @typescript-eslint/no-explicit-any */
import { IntrospectedResource, IntrospectionResult } from "ra-data-graphql";
import { TypeKind, IntrospectionField, IntrospectionType } from "graphql";
// eslint-disable-next-line import/no-named-as-default
import gql from "graphql-tag";
import _ from "underscore";
import { CANCELLED, COMPLETED } from "../../constants";

export const isSubObject = (field: any) => {
  return (
    field.type.kind === TypeKind.OBJECT ||
    (field.type.kind === TypeKind.NON_NULL &&
      field.type.ofType.kind === TypeKind.OBJECT) ||
    ((field.type.ofType && field.type.ofType.kind) === TypeKind.NON_NULL &&
      (field.type.ofType &&
        field.type.ofType.ofType &&
        field.type.ofType.ofType.kind) === TypeKind.OBJECT)
  );
};

const interceptResponse = (item: any) => {
  const { cancelled, completed } = item;
  return {
    ...item,
    status: completed ? COMPLETED : cancelled ? CANCELLED : "",
  };
};

const getType = (field: IntrospectionField) => {
  if (
    field.type.kind === TypeKind.LIST ||
    field.type.kind === TypeKind.NON_NULL
  ) {
    return field.type.ofType;
  }
  return field.type;
};

const isResource = (
  field: IntrospectionField,
  resources: IntrospectedResource[]
) => {
  const type = getType(field) as any;
  return resources.some((r) => r.type.name === type.name);
};

const buildMutationType = (resource: any, aorFetchType: any) => {
  return resource[aorFetchType].args.reduce((acc: any, arg: any) => {
    const suffix: { [key in string]: string } = {
      SCALAR: "!",
      INPUT_OBJECT: "",
    };
    const type: string =
      arg.type.name ?? `${arg.type.ofType.name}${suffix[arg.type.ofType.kind]}`;
    const key = arg.name === "id" ? "$id" : "$data";
    const mutationType = `${key}: ${type}`;
    if (acc) {
      acc += `, ${mutationType}`;
      return acc;
    }
    return mutationType;
  }, "");
};

const buildMutationArgs = (resource: any, aorFetchType: any) => {
  return resource[aorFetchType].args.reduce((acc: any, arg: any) => {
    const value = arg.name === "id" ? "$id" : "$data";
    const mutationArgs = `${arg.name}: ${value}`;
    if (acc) {
      acc += `, ${mutationArgs}`;
      return acc;
    }
    return mutationArgs;
  }, "");
};

const buildFieldList = (
  introspectionResults: IntrospectionResult,
  resource?: IntrospectedResource,
  aorFetchType?: string,
  depth = 0,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  originalResource?: any
) => {
  const types: Array<IntrospectionType> = introspectionResults.types;
  const resources = introspectionResults.resources;
  if (!resource?.type.fields) return;
  return resource.type.fields
    .filter((field) => !field.name.startsWith("__"))
    .map((field: any): any => {
      try {
        if (isSubObject(field) && depth < 1) {
          const typeToCheck: any = getType(field);
          if (isResource(field, resources)) {
            const type: any = types.find(
              (t: IntrospectionType) => t.name === typeToCheck.name
            );
            const resource = introspectionResults.resources.find(
              (r: IntrospectedResource) => r.type.name === type.name
            );
            if (
              type &&
              resource &&
              !(field.type.name === originalResource.type.name)
            ) {
              const subFields = buildFieldList(
                introspectionResults,
                resource,
                aorFetchType,
                depth + 1,
                originalResource
              );
              return `${field.name} { ${subFields} }`;
            }
          } else {
            const type: any = types.find((t) => t.name === typeToCheck.name);
            if (type && type.fields) {
              let subFields = type.fields
                .map((_type: any) => {
                  if (!isSubObject(_type)) {
                    return _type.name;
                  } else {
                    if (isResource(_type, resources)) {
                      const resource = introspectionResults.resources.find(
                        (r) => r.type.name === _type.type.name
                      );
                      if (_type && resource) {
                        const subFields = buildFieldList(
                          introspectionResults,
                          resource,
                          aorFetchType,
                          depth + 1,
                          originalResource
                        );
                        return `${_type.name} { ${subFields} }`;
                      }
                    }
                  }
                })
                .filter((item: any) => item);
              subFields = _.without(subFields, "_id");
              if (subFields.length >= 1) {
                return `${field.name} { ${subFields} }`;
              }
              return false;
            }
          }
          return false;
        }
        if (
          (field.name === "_id" && depth >= 1) ||
          field.type.kind == TypeKind.LIST
        ) {
          return false;
        }
        return field.name;
      } catch (err) {}
      return false;
    })
    .filter((f) => f !== false)
    .join(" ");
};

export const queryBuilder =
  (introspectionResults: IntrospectionResult) =>
  (aorFetchType: string, resourceName: string, params: any) => {
    const resource: any = introspectionResults.resources.find(
      (r) => r.type.name === resourceName
    );
    let result = {};
    switch (aorFetchType) {
      case "GET_LIST":
      case "GET_MANY":
      case "GET_MANY_REFERENCE":
        const {
          pagination: { page, perPage },
          sort: { field, order },
          filter: { task },
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } = params as any;
        const start = (page - 1) * perPage;
        const end = page * perPage;
        result = {
          query: gql`{${resource[aorFetchType].name} {
            ${buildFieldList(
              introspectionResults,
              resource,
              aorFetchType,
              0,
              resource
            )}
          }}`,
          variables: {},
          parseResponse: (response: {
            data: {
              [key in string]: Array<any>;
            };
          }) => {
            return {
              data: response.data[resource[aorFetchType].name]
                .filter((item) => item?.task.includes(task || ""))
                .map(interceptResponse)
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                .sort((a: any, b: any) => {
                  if (order === "ASC") {
                    if (isNaN(Number(a[field]))) {
                      return a[field].localeCompare(b[field]);
                    }
                    return Number(a[field]) - Number(b[field]);
                  }
                  if (isNaN(Number(a[field]))) {
                    return b[field].localeCompare(a[field]);
                  }
                  return Number(b[field]) - Number(a[field]);
                })
                .slice(start, end),
              total: response.data[resource[aorFetchType].name].filter((item) =>
                item?.task.includes(task || "")
              ).length,
            };
          },
        };
        break;
      case "GET_ONE":
        result = {
          query: gql`{${resource[aorFetchType].name} {
            ${buildFieldList(
              introspectionResults,
              resource,
              aorFetchType,
              0,
              resource
            )}
          }}`,
          variables: {},
          parseResponse: (response: {
            data: {
              [key in string]: Array<any>;
            };
          }) => {
            return {
              data: response.data[resource[aorFetchType].name]
                .filter((item: { id: string }) => item.id === params?.id)
                .map(interceptResponse)[0],
              id: params?.id,
            };
          },
        };
        break;
      case "UPDATE":
        result = {
          query: gql`mutation (${buildMutationType(resource, aorFetchType)}) {
            ${resource[aorFetchType].name}(${buildMutationArgs(
            resource,
            aorFetchType
          )}) {
              ${buildFieldList(
                introspectionResults,
                resource,
                aorFetchType,
                0,
                resource
              )}
            }
          }`,
          variables: {
            id: params?.id,
            data: params.data,
          },
          parseResponse: (response: {
            data: {
              [key in string]: any;
            };
          }) => {
            const updatedTask: any = response.data[resource[aorFetchType].name];
            return {
              data: interceptResponse(updatedTask),
            };
          },
        };
        break;
      case "CREATE":
        result = {
          query: gql`mutation (${buildMutationType(resource, aorFetchType)}) {
            ${resource[aorFetchType].name}(${buildMutationArgs(
            resource,
            aorFetchType
          )}) {
              ${buildFieldList(
                introspectionResults,
                resource,
                aorFetchType,
                0,
                resource
              )}
            }
          }`,
          variables: {
            data: params.data,
          },
          parseResponse: (response: {
            data: {
              [key in string]: any;
            };
          }) => {
            const createdTask: any = response.data[resource[aorFetchType].name];
            return {
              data: interceptResponse(createdTask),
            };
          },
        };
        break;
      case "DELETE":
        result = {
          query: gql`mutation (${buildMutationType(resource, aorFetchType)}) {
            ${resource[aorFetchType].name}(${buildMutationArgs(
            resource,
            aorFetchType
          )}) {
              id
            }
          }`,
          variables: {
            id: params.id,
          },
          parseResponse: (response: {
            data: {
              [key in string]: Array<any>;
            };
          }) => {
            return {
              data: response.data[resource[aorFetchType].name],
            };
          },
        };
        break;
      default:
        return undefined;
    }
    return result;
  };
