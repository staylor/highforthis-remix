import { unstable_vitePlugin as remix } from '@remix-run/dev';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

let publicPath = '/';
if (process.env.NODE_ENV === 'production') {
  publicPath = 'https://storage.googleapis.com/wonderboymusic/highforthis/build/';
}

export default defineConfig({
  plugins: [
    remix({
      appDirectory: 'src',
      ignoredRouteFiles: ['**/.*'],
      publicPath,
    }),
    tsconfigPaths(),
  ],
});
