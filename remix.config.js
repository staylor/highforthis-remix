/**
 * @type {import('@remix-run/dev').AppConfig}
 */

let publicPath = '/build/';
if (process.env.NODE_ENV === 'production') {
  publicPath = 'https://storage.googleapis.com/wonderboymusic/highforthis/build/';
}

module.exports = {
  appDirectory: 'src',
  cacheDirectory: './node_modules/.cache/remix',
  ignoredRouteFiles: ['**/.*'],
  publicPath,
  serverDependenciesToBundle: [],
  serverModuleFormat: 'cjs',
  postcss: true,
  future: {
    v2_dev: true,
    v2_errorBoundary: true,
    v2_headers: true,
    v2_meta: true,
    v2_normalizeFormMethod: true,
    v2_routeConvention: true,
  },
};
