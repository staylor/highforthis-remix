import { ApolloClient, InMemoryCache } from '@apollo/client/core';

import possibleTypes from './possibleTypes.json';
import typePolicies from './typePolicies';

function factory(uri: string) {
  return () =>
    new ApolloClient({
      uri,
      cache: new InMemoryCache({
        possibleTypes,
        typePolicies,
      }),
    });
}

export default factory;
