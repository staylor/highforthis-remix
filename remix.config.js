/**
 * @type {import('@remix-run/dev').AppConfig}
 */

let publicPath = '/build/';
if (process.env.NODE_ENV === 'production') {
  publicPath = 'https://storage.googleapis.com/wonderboymusic/build/';
}

module.exports = {
  appDirectory: 'src',
  cacheDirectory: './node_modules/.cache/remix',
  ignoredRouteFiles: [
    '**/.*',
    '**/*.css',
    '**/*.test.{js,jsx,ts,tsx}',
    '**/*.graphql.{js,jsx,ts,tsx}',
  ],
  publicPath,
  serverDependenciesToBundle: ['@apollo/client', 'filesize', 'ts-invariant', 'zen-observable-ts'],
};
