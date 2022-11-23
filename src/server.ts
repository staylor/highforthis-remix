import path from 'path';
import express from 'express';
import compression from 'compression';
import serveStatic from 'serve-static';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { createRequestHandler } from '@remix-run/express';

import serverPort from './server.port';

// use a local GQL server by default
const gqlHost = process.env.GQL_HOST || 'http://localhost:8080';

process.env.TZ = 'America/New_York';

async function createServer(root = process.cwd(), isProd = process.env.NODE_ENV === 'production') {
  const app = express();

  let staticDir;
  if (isProd) {
    app.use(compression());
    staticDir = path.join(root, 'build/client');
  } else {
    staticDir = path.join(root, 'public');
  }

  app.use(
    serveStatic(staticDir, {
      index: false,
    })
  );

  const proxy = createProxyMiddleware({
    target: gqlHost,
    changeOrigin: true,
  });

  // proxy to the graphql server
  app.use('/graphql', proxy);

  app.all(
    '*',
    createRequestHandler({
      // `remix build` and `remix dev` output files to a build directory, you need
      // to pass that build to the request handler
      build: require(path.join(root, 'build')),

      // return anything you want here to be available as `context` in your
      // loaders and actions. This is where you can bridge the gap between Remix
      // and your server
      getLoadContext(req, res) {
        return {};
      },
    })
  );

  return { app };
}

createServer().then(({ app }) =>
  app.listen(serverPort, () => {
    console.log(`Serving running at http://localhost:${serverPort}`);
  })
);
