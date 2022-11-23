import apolloClient from './apollo/client';
import serverPort from './server.port';

const client = apolloClient({
  uri: `http://localhost:${serverPort}/graphql`,
  ssrMode: true,
});

export default client;
