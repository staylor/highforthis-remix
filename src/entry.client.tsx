// DraftJS needs ReactDOM.findDOMNode(), which is disallowed in StrictMode
import { startTransition /* StrictMode */ } from 'react';
import { hydrateRoot } from 'react-dom/client';
import { RemixBrowser } from '@remix-run/react';
import { ApolloProvider } from '@apollo/client';

import apolloClient from './apollo/client';

const client = apolloClient({ uri: '/graphql' });

function hydrate() {
  startTransition(() => {
    hydrateRoot(
      document,
      <ApolloProvider client={client}>
        <RemixBrowser />
      </ApolloProvider>
    );
  });
}

if (window.requestIdleCallback) {
  window.requestIdleCallback(hydrate);
} else {
  // Safari doesn't support requestIdleCallback
  // https://caniuse.com/requestidlecallback
  window.setTimeout(hydrate, 1);
}
