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
  ignoredRouteFiles: ['**/.*', '**/*.test.{js,jsx,ts,tsx}', '**/*.graphql.{js,jsx,ts,tsx}'],
  publicPath,
  future: {
    unstable_dev: true,
    unstable_postcss: true,
    v2_routeConvention: true,
  },
};
