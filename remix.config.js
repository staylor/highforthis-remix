/**
 * @type {import('@remix-run/dev').AppConfig}
 */

let publicPath = '/build/';
if (process.env.NODE_ENV === 'production') {
  publicPath = 'https://storage.googleapis.com/wonderboymusic/highforthis/build/';
}

export default {
  appDirectory: 'src',
  cacheDirectory: './node_modules/.cache/remix',
  ignoredRouteFiles: ['**/.*'],
  publicPath,
};
