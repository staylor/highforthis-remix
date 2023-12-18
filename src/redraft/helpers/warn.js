/**
 * Logs a warning message if not in production
 */
const warn = (msg) => {
  if (import.meta.env.DEV) {
    console.warn(`Redraft: ${msg}`);
  }
};

export default warn;
