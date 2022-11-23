import { ApolloClient, InMemoryCache } from '@apollo/client/core';
import possibleTypes from './possibleTypes';
import typePolicies from './typePolicies';

export default function client({ uri, authToken = null, ssrMode = false }) {
  const headers = {};
  if (authToken) {
    headers.Authorization = `Bearer ${authToken}`;
  }

  let cache = new InMemoryCache({
    possibleTypes,
    typePolicies,
  });
  if (!ssrMode) {
    cache = cache.restore(window.__APOLLO_STATE__);
  }

  return new ApolloClient({
    uri,
    headers,
    cache,
    ssrMode,
  });
}
