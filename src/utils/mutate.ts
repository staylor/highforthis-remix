import type { SyntheticEvent } from 'react';
import type { AppData } from '@remix-run/server-runtime';
import { useSearchParams } from '@remix-run/react';
import type { ApolloError, MutationOptions, ServerError } from '@apollo/client';
import { useMutation } from '@apollo/client';

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

// TODO: replace this with a real DELETE action
let useDelete: any;
if (typeof document === 'undefined') {
  // there is no ApolloProvider or cache on the server
  useDelete = () => () => {};
} else {
  // this is a client-only call
  useDelete = (mutation: any) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [mutate] = useMutation(mutation);

    return (ids: string[]) => (e: SyntheticEvent) => {
      e.preventDefault();

      mutate({
        variables: {
          ids,
        },
      }).then(() => {
        searchParams.set('deleted', ids.join());
        setSearchParams(searchParams);
      });
    };
  };
}

export { useDelete };
