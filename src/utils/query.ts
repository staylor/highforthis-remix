import type { AppData } from '@remix-run/server-runtime';
import type { ApolloError, QueryOptions, ServerError } from '@apollo/client';

type QueryData = Pick<QueryOptions, 'query' | 'variables'> & AppData;

const query = async ({ query, variables, context }: QueryData) => {
  const { apolloClient } = context;
  let data = {};
  try {
    ({ data } = await apolloClient.query({ query, variables }));
  } catch (e) {
    const error = e as ApolloError;
    console.error((error.networkError as ServerError)?.result?.errors);
  }
  return data;
};

export default query;
