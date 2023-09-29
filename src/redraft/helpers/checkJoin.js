/**
 * Joins the input if the joinOutput option is enabled
 */
const checkJoin = (input, options) => {
  if (Array.isArray(input) && options.joinOutput) {
    return input.join('');
  }
  return input;
};

export default checkJoin;
