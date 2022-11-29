import type { AppData } from '@remix-run/server-runtime';
import type { ApolloError, MutationOptions, ServerError } from '@apollo/client';

type MutationData = Pick<MutationOptions, 'mutation' | 'variables'> & AppData;

const mutate = async ({ mutation, variables, context }: MutationData) => {
  const { apolloClient } = context;
  let data = {};
  try {
    ({ data } = await apolloClient.mutate({ mutation, variables }));
  } catch (e) {
    const error = e as ApolloError;
    console.error((error.networkError as ServerError)?.result?.errors);
  }
  return data;
};

export default mutate;
