import type { AppData } from '@remix-run/server-runtime';
import type { ApolloError, QueryOptions, ServerError } from '@apollo/client';

import { offsetToCursor } from './connection';

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

export const addPageOffset = (params: any, variables: any) => {
  if (params.page) {
    const pageOffset = parseInt(params.page, 10) - 1;
    if (pageOffset > 0) {
      variables.after = offsetToCursor(pageOffset * variables.first - 1);
    }
  }
  return variables;
};
