/**
 * Logs a warning message if not in production
 */
const warn = (msg) => {
  if (process.env.NODE_ENV !== 'production') {
    console.warn(`Redraft: ${msg}`); // eslint-disable-line no-console
  }
};

export default warn;
