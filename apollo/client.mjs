import { ApolloClient } from '@apollo/client/core/ApolloClient.js';
import { InMemoryCache } from '@apollo/client/cache/inmemory/inMemoryCache.js';

import jsonImport from './possibleTypes.json' assert { type: 'json' };
import typePolicies from './typePolicies.mjs';

function factory(uri) {
  return () =>
    new ApolloClient({
      uri,
      cache: new InMemoryCache({
        possibleTypes: jsonImport.possibleTypes,
        typePolicies,
      }),
    });
}

export default factory;
