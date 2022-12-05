import type { AppData } from '@remix-run/server-runtime';
import type { Params } from '@remix-run/react';
import type { ApolloError, OperationVariables, QueryOptions, ServerError } from '@apollo/client';

import { PER_PAGE } from '@/constants';
import { offsetToCursor } from './connection';

type QueryData = Pick<QueryOptions, 'query' | 'variables'> & AppData;

const query = async ({ query, variables, context }: QueryData) => {
  const { apolloClient } = context;
  let data = {};
  try {
    ({ data } = await apolloClient.query({ query, variables }));
  } catch (e) {
    const error = e as ApolloError;
    if (error.graphQLErrors) {
      error.graphQLErrors.forEach((err) => {
        console.error(err.message);
      });
    }
    if (error.networkError) {
      console.error((error.networkError as ServerError)?.result?.errors);
    }
  }
  return data;
};

export default query;

export const addPageOffset = (params: Params, listVariables?: OperationVariables) => {
  const variables = listVariables || {};
  if (!variables.first) {
    variables.first = PER_PAGE;
  }
  if (params.page) {
    const pageOffset = parseInt(params.page, 10) - 1;
    if (pageOffset > 0) {
      variables.after = offsetToCursor(pageOffset * variables.first - 1);
    }
  }
  return variables;
};
