/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  GET_LIST,
  GET_ONE,
  GET_MANY,
  GET_MANY_REFERENCE,
  CREATE,
  UPDATE,
  DELETE,
} from "ra-core";
import { ALL_TYPES, IntrospectionResult } from "ra-data-graphql";
import { SCHEMA } from "../../constants";
import { getStorageItem } from "../auth";

const filterTypesByIncludeExclude = ({ include, exclude }: any) => {
  if (Array.isArray(include)) {
    return (type: any) => include.includes(type.name);
  }

  if (typeof include === "function") {
    return (type: any) => include(type);
  }

  if (Array.isArray(exclude)) {
    return (type: any) => !exclude.includes(type.name);
  }

  if (typeof exclude === "function") {
    return (type: any) => !exclude(type);
  }

  return () => true;
};

/**
 * @param {ApolloClient} client The Apollo client
 * @param {Object} options The introspection options
 */
export const getInstrospectionResult = (
  client: any,
  options: any
): IntrospectionResult => {
  const schema = JSON.parse(getStorageItem(SCHEMA) as string);
  const queries = schema?.types.reduce((acc: any, type: any) => {
    if (
      type.name !== (schema?.queryType && schema?.queryType.name) &&
      type.name !== (schema?.mutationType && schema?.mutationType.name)
    )
      return acc;

    return [...acc, ...type.fields];
  }, []);

  const types = schema?.types.filter(
    (type: { name: string }) =>
      type.name !== (schema?.queryType && schema?.queryType.name) &&
      type.name !== (schema?.mutationType && schema?.mutationType.name)
  );

  const isResource = (type: any) =>
    queries.some(
      (query: any) => query.name === options.operationNames[GET_LIST](type)
    ) &&
    queries.some(
      (query: any) => query.name === options.operationNames[GET_ONE](type)
    );

  const buildResource = (type: any) =>
    ALL_TYPES.reduce(
      (acc: any, aorFetchType: any) => ({
        ...acc,
        [aorFetchType]: queries.find(
          (query: any) =>
            options.operationNames[aorFetchType] &&
            query.name === options.operationNames[aorFetchType](type)
        ),
      }),
      { type }
    );

  const potentialResources = types.filter(isResource);
  const filteredResources = potentialResources.filter(
    filterTypesByIncludeExclude(options)
  );
  const resources = filteredResources.map(buildResource);

  return {
    types,
    queries,
    resources,
    schema,
  };
};

export const introspectionOperationNames = {
  //schema
  [GET_LIST]: (resource: any) => `${resource.name}`,
  [GET_ONE]: (resource: any) => `${resource.name}`,
  [GET_MANY]: (resource: any) => `${resource.name}`,
  [GET_MANY_REFERENCE]: (resource: any) => `${resource.name}`,
  [CREATE]: (resource: any) => `create_${resource.name}`,
  [UPDATE]: (resource: any) => `update_${resource.name}`,
  [DELETE]: (resource: any) => `delete_${resource.name}`,
};
