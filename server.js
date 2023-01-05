// This file is not compiled.

const path = require('path');
const express = require('express');
const compression = require('compression');
const { createProxyMiddleware } = require('http-proxy-middleware');
const { createRequestHandler } = require('@remix-run/express');

const { factory } = require('./apollo/client');
const { podcastFeedQuery, podcastTemplate } = require('./podcast.server');

const BUILD_DIR = path.join(process.cwd(), 'build');

// use a local GQL server by default
const gqlHost = process.env.GQL_HOST || 'http://localhost:8080';
const getClient = factory(`${gqlHost}/graphql`);

process.env.TZ = 'America/New_York';

async function createServer() {
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

  // proxy to the graphql server for client fetch requests
  app.use('/graphql', proxy);
  app.use('/upload', proxy);
  app.use('/uploads', proxy);

  app.use('/podcast.xml', async (req, res) => {
    try {
      const client = getClient();
      const { data } = await client.query({
        query: podcastFeedQuery,
      });
      const template = podcastTemplate(data);

      res.set('Content-Type', 'application/xml');
      res.send(template);
    } catch (e) {
      console.log(e);
      res.status(500).send('GraphQL Error.');
    }
  });

  app.all('*', (req, res, next) => {
    if (process.env.NODE_ENV === 'development') {
      purgeRequireCache();
    }

    return createRequestHandler({
      build: require(BUILD_DIR),
      mode: process.env.NODE_ENV,
      getLoadContext() {
        return {
          apolloClient: getClient(),
          graphqlHost: gqlHost,
        };
      },
    })(req, res, next);
  });

  return { app };
}

const serverPort = (process.env.SERVER_PORT && parseInt(process.env.SERVER_PORT, 10)) || 3000;

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
