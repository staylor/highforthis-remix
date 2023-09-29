import * as fs from 'node:fs';
import path from 'path';

import express from 'express';
import chokidar from 'chokidar';
import compression from 'compression';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { createRequestHandler } from '@remix-run/express';
import type { ServerBuild } from '@remix-run/node';
import { broadcastDevReady, installGlobals } from '@remix-run/node';

import factory from './apollo/client';

process.env.TZ = 'America/New_York';

installGlobals();

const BUILD_DIR = path.join(process.cwd(), 'build');

let build: ServerBuild | Promise<ServerBuild>;
const mode = process.env.NODE_ENV;
const isDev = mode === 'development';
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

async function createServer() {
  /**
   * @type { import('@remix-run/node').ServerBuild | Promise<import('@remix-run/node').ServerBuild> }
   */
  build = await import(BUILD_DIR);

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

  app.all(
    '*',
    isDev
      ? createDevRequestHandler()
      : createRequestHandler({
          build: require(BUILD_DIR),
          mode,
          getLoadContext,
        })
  );

  app.listen(serverPort, async () => {
    const build = await import(BUILD_DIR);
    console.log(`Server running at http://localhost:${serverPort}`);

    if (isDev) {
      broadcastDevReady(build);
    }
  });
}

function createDevRequestHandler() {
  const watcher = chokidar.watch(BUILD_DIR, { ignoreInitial: true });

  watcher.on('all', async () => {
    // 1. purge require cache && load updated server build
    const stat = fs.statSync(BUILD_DIR);
    build = import(BUILD_DIR + '?t=' + stat.mtimeMs);
    // 2. tell dev server that this app server is now ready
    broadcastDevReady(await build);
  });

  return async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
      return createRequestHandler({
        build: await build,
        mode,
        getLoadContext,
      })(req, res, next);
    } catch (error) {
      next(error);
    }
  };
}

(async () => {
  await createServer();
})();
