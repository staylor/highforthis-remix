/**
 * @type {import('@remix-run/dev').AppConfig}
 */
module.exports = {
  appDirectory: 'src',
  cacheDirectory: './node_modules/.cache/remix',
  ignoredRouteFiles: [
    '**/.*',
    '**/*.css',
    '**/*.test.{js,jsx,ts,tsx}',
    '**/*.graphql.{js,jsx,ts,tsx}',
  ],
  serverDependenciesToBundle: ['@apollo/client', 'filesize', 'ts-invariant', 'zen-observable-ts'],
};
