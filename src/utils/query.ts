import type { AppData } from '@remix-run/server-runtime';
import type { QueryOptions } from '@apollo/client';

type QueryData = Pick<QueryOptions, 'query' | 'variables'> & AppData;

const query = async ({ query, variables, context }: QueryData) => {
  const { apolloClient } = context;
  const { data } = await apolloClient.query({ query, variables });
  return data;
};

export default query;
