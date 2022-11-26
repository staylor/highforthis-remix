import { ApolloClient, InMemoryCache } from '@apollo/client/core';
import possibleTypes from './possibleTypes';
import typePolicies from './typePolicies';

export default function client({ uri, authToken = null }) {
  const headers = {};
  if (authToken) {
    headers.Authorization = `Bearer ${authToken}`;
  }

  let cache = new InMemoryCache({
    possibleTypes,
    typePolicies,
  });

  return new ApolloClient({
    uri,
    headers,
    cache,
  });
}
