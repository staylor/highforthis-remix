import express from 'express';
import compression from 'compression';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { createRequestHandler } from '@remix-run/express';
import { unstable_viteServerBuildModuleId } from '@remix-run/dev';
import { installGlobals } from '@remix-run/node';

import factory from './apollo/client.mjs';

process.env.TZ = 'America/New_York';

installGlobals();

const mode = process.env.NODE_ENV;
const serverPort = (process.env.SERVER_PORT && parseInt(process.env.SERVER_PORT, 10)) || 3000;

// use a local GQL server by default
const gqlHost = process.env.GQL_HOST || 'http://localhost:8080';
const getClient = factory(`${gqlHost}/graphql`);

function getLoadContext() {
  return {
    apolloClient: getClient(),
    graphqlHost: gqlHost,
  };
}

const proxy = createProxyMiddleware({
  target: gqlHost,
  changeOrigin: true,
});

const vite =
  process.env.NODE_ENV === 'production'
    ? undefined
    : await import('vite').then(({ createServer }) =>
        createServer({
          server: {
            middlewareMode: true,
          },
        })
      );
const app = express();

app.use(compression());
app.use(morgan('tiny'));
app.use(cookieParser());

// http://expressjs.com/en/advanced/best-practice-security.html#at-a-minimum-disable-x-powered-by-header
app.disable('x-powered-by');

// handle asset requests
if (vite) {
  app.use(vite.middlewares);
} else {
  app.use(
    '/assets',
    express.static('build/client/assets', {
      immutable: true,
      maxAge: '1y',
    })
  );
}
app.use(express.static('build/client', { maxAge: '1h' }));

// proxy to the graphql server for client fetch requests
app.use('/graphql', proxy);
app.use('/upload', proxy);
app.use('/uploads', proxy);

// handle SSR requests
app.all(
  '*',
  createRequestHandler({
    // @ts-ignore
    build: vite
      ? () => vite.ssrLoadModule(unstable_viteServerBuildModuleId)
      : await import('./build/server/index.js'),
    mode,
    getLoadContext,
  })
);

app.listen(serverPort, async () => {
  console.log(`Server running at http://localhost:${serverPort}`);
});
