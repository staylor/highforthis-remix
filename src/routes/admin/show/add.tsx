import { gql } from '@apollo/client';
import type { ActionFunction, LoaderFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';

import ShowForm from '@/components/Admin/Show/Form';
import { handleSubmission } from '@/utils/action';
import query from '@/utils/query';

export const loader: LoaderFunction = ({ request, context }) => {
  return query({ request, context, query: showQuery });
};

export const action: ActionFunction = ({ request, context }) => {
  return handleSubmission({
    request,
    context,
    mutation: showMutation,
    createMutation: 'createShow',
  });
};

export default function ShowAdd() {
  const data = useLoaderData();
  return <ShowForm data={data} heading="Add Show" buttonLabel="Add Show" />;
}

const showQuery = gql`
  query CreateShowQuery {
    ...ShowForm_terms
  }
  ${ShowForm.fragments.terms}
`;

const showMutation = gql`
  mutation CreateShowMutation($input: CreateShowInput!) {
    createShow(input: $input) {
      id
    }
  }
`;
