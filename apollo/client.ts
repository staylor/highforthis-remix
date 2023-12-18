import { ApolloClient } from '@apollo/client/core/ApolloClient';
import { InMemoryCache } from '@apollo/client/cache/inmemory/inMemoryCache';

import { possibleTypes } from './possibleTypes.json';
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
