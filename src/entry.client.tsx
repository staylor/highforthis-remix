import { RemixBrowser } from '@remix-run/react';
import { ApolloProvider } from '@apollo/client/react/context';
import { hydrateRoot } from 'react-dom/client';

import client from './apollo/client';

hydrateRoot(
  document,
  <ApolloProvider client={client({ uri: '/graphql' })}>
    <RemixBrowser />
  </ApolloProvider>
);
