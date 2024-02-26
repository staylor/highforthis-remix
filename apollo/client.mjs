import { ApolloClient } from '@apollo/client/core/ApolloClient.js';
import { InMemoryCache } from '@apollo/client/cache/inmemory/inMemoryCache.js';

import possibleTypes from './possibleTypes.json' assert { type: 'json' };
import typePolicies from './typePolicies.mjs';

function factory(uri) {
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
