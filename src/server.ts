import path from 'path';
import express from 'express';
import compression from 'compression';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { createRequestHandler } from '@remix-run/express';

import serverPort from './server.port';
import apolloClient from './apollo/client';

const BUILD_DIR = path.join(process.cwd(), 'build');

// use a local GQL server by default
const gqlHost = process.env.GQL_HOST || 'http://localhost:8080';

process.env.TZ = 'America/New_York';

async function createServer(root = process.cwd(), isProd = process.env.NODE_ENV === 'production') {
  const app = express();

  app.use(compression());

  // http://expressjs.com/en/advanced/best-practice-security.html#at-a-minimum-disable-x-powered-by-header
  app.disable('x-powered-by');

  // Remix fingerprints its assets so we can cache forever.
  app.use('/build', express.static('public/build', { immutable: true, maxAge: '1y' }));

  // Everything else (like favicon.ico) is cached for an hour. You may want to be
  // more aggressive with this caching.
  app.use(express.static('public', { maxAge: '1h' }));

  const proxy = createProxyMiddleware({
    target: gqlHost,
    changeOrigin: true,
  });

  // proxy to the graphql server
  app.use('/graphql', proxy);

  app.all('*', (req, res, next) => {
    if (process.env.NODE_ENV === 'development') {
      purgeRequireCache();
    }

    return createRequestHandler({
      build: require(BUILD_DIR),
      mode: process.env.NODE_ENV,
      getLoadContext() {
        const client = apolloClient({
          uri: `http://localhost:${serverPort}/graphql`,
        });
        return {
          apolloClient: client,
        };
      },
    })(req, res, next);
  });

  return { app };
}

createServer().then(({ app }) =>
  app.listen(serverPort, () => {
    console.log(`Serving running at http://localhost:${serverPort}`);
  })
);

function purgeRequireCache() {
  // purge require cache on requests for "server side HMR" this won't let
  // you have in-memory objects between requests in development,
  // alternatively you can set up nodemon/pm2-dev to restart the server on
  // file changes, but then you'll have to reconnect to databases/etc on each
  // change. We prefer the DX of this, so we've included it for you by default
  for (const key in require.cache) {
    if (key.startsWith(BUILD_DIR)) {
      delete require.cache[key];
    }
  }
}
