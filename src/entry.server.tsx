import type { EntryContext } from '@remix-run/node';
import { RemixServer } from '@remix-run/react';
import { ApolloProvider } from '@apollo/client/react/context';
import { getDataFromTree } from '@apollo/client/react/ssr';
import { renderToString } from 'react-dom/server';

import client from './server.apollo';

export default function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext
) {
  const tree = (
    <ApolloProvider client={client}>
      <RemixServer context={remixContext} url={request.url} />
    </ApolloProvider>
  );

  return getDataFromTree(tree).then(() => {
    const state = client.cache.extract();
    const apolloState = JSON.stringify(state).replace(/</g, '\\u003c');
    const markup = renderToString(
      <>
        {tree}
        <script
          dangerouslySetInnerHTML={{
            __html: `window.__APOLLO_STATE__=${apolloState}`,
          }}
        />
      </>
    );

    responseHeaders.set('Content-Type', 'text/html');

    return new Response('<!DOCTYPE html>' + markup, {
      status: responseStatusCode,
      headers: responseHeaders,
    });
  });
}
