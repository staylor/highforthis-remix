import path from 'path';
import express from 'express';
import compression from 'compression';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { createRequestHandler } from '@remix-run/express';
import factory from './apollo/client';

process.env.TZ = 'America/New_York';

const BUILD_DIR = path.join(process.cwd(), 'build');

// use a local GQL server by default
const gqlHost = process.env.GQL_HOST || 'http://localhost:8080';
const getClient = factory(`${gqlHost}/graphql`);

const proxy = createProxyMiddleware({
  target: gqlHost,
  changeOrigin: true,
});

const remixHandler = createRequestHandler({
  build: require(BUILD_DIR),
  mode: process.env.NODE_ENV,
  getLoadContext() {
    return {
      apolloClient: getClient(),
      graphqlHost: gqlHost,
    };
  },
});

async function createServer() {
  const app = express();

  app.use(compression());
  app.use(morgan('tiny'));
  app.use(cookieParser());

  // http://expressjs.com/en/advanced/best-practice-security.html#at-a-minimum-disable-x-powered-by-header
  app.disable('x-powered-by');

  // Remix fingerprints its assets so we can cache forever.
  app.use('/build', express.static('public/build', { immutable: true, maxAge: '1y' }));

  // Everything else (like favicon.ico) is cached for an hour. You may want to be
  // more aggressive with this caching.
  app.use(express.static('public', { maxAge: '1h' }));

  // proxy to the graphql server for client fetch requests
  app.use('/graphql', proxy);
  app.use('/upload', proxy);
  app.use('/uploads', proxy);

  app.all('*', (req, res, next) => {
    if (process.env.NODE_ENV === 'development') {
      purgeRequireCache();
    }

    return remixHandler(req, res, next);
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
  console.log('Purging cache...');
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
