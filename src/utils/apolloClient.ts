import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  NormalizedCacheObject,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { useMemo } from "react";
import { ACCESS_TOKEN, BASE_URL, QUERY_URL, ROLES_PBAC } from "../constants";
import { getStorageItem } from "./auth";

const defaultUrls: { [key in string]: string } = {
  [QUERY_URL]: `${BASE_URL}/tenant14/query`,
  [ROLES_PBAC]: `${BASE_URL}/tenant14/roles_pbac`,
};

const apolloClients: {
  [key in string]?: ApolloClient<NormalizedCacheObject> | null;
} = {};

const authLink = setContext((_, { headers }) => {
  const newContext = {
    headers: {
      ...headers,
      Authorization: `Bearer ${getStorageItem(ACCESS_TOKEN)}`,
    },
  };
  return newContext;
});

export const cache = new InMemoryCache({});

const createApolloClient = (key: string) => {
  const httpLink = createHttpLink({
    uri: getStorageItem(key) ?? defaultUrls[key],
  });
  return new ApolloClient({
    cache,
    link: authLink.concat(httpLink),
    connectToDevTools: true,
  });
};

export function initializeApollo(
  initialState: NormalizedCacheObject | null = null,
  key: string
): ApolloClient<NormalizedCacheObject> {
  const _apolloClient = apolloClients[key] ?? createApolloClient(key);

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // gets hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract();
    // Restore the cache using the data passed from getStaticProps/getServerSideProps
    // combined with the existing cached data

    _apolloClient.cache.restore({ ...existingCache, ...initialState });
  }
  // Create the Apollo Client once in the client
  if (!apolloClients[key]) apolloClients[key] = _apolloClient;
  return createApolloClient(key);
}

export function useApollo(
  key: string,
  initialState?: NormalizedCacheObject
): ApolloClient<NormalizedCacheObject> {
  const store = useMemo(
    () => initializeApollo(initialState, key),
    [initialState, key]
  );
  return store;
}
