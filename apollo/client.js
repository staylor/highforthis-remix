// This file is loaded by server.js, which is not compiled.

const { ApolloClient, InMemoryCache } = require('@apollo/client/core');

const possibleTypes = require('./possibleTypes.json');
const { typePolicies } = require('./typePolicies');

function factory(uri) {
  return () =>
    new ApolloClient({
      uri,
      cache: new InMemoryCache({
        possibleTypes,
        typePolicies,
      }),
    });
}

module.exports = { factory };
