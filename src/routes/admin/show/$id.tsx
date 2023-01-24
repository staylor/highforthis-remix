import { gql } from '@apollo/client';
import type { ActionFunction, LoaderFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';

import ShowForm from '@/components/Admin/Show/Form';
import query from '@/utils/query';
import { handleSubmission } from '@/utils/action';

export const loader: LoaderFunction = ({ request, context, params }) => {
  return query({ request, context, query: showQuery, variables: { id: params.id } });
};

export const action: ActionFunction = ({ request, context, params }) => {
  return handleSubmission({
    request,
    context,
    mutation: showMutation,
    variables: { id: params.id },
  });
};

export default function ShowEdit() {
  const { show, artists, venues } = useLoaderData();
  return (
    <ShowForm
      data={show}
      artists={artists}
      venues={venues}
      heading="Edit Show"
      buttonLabel="Update Show"
    />
  );
}

const showQuery = gql`
  query ShowEditQuery($id: ObjID!) {
    show(id: $id) {
      ...ShowForm_show
    }
    ...ShowForm_terms
  }
  ${ShowForm.fragments.show}
  ${ShowForm.fragments.terms}
`;

const showMutation = gql`
  mutation UpdateShowMutation($id: ObjID!, $input: UpdateShowInput!) {
    updateShow(id: $id, input: $input) {
      ...ShowForm_show
    }
  }
  ${ShowForm.fragments.show}
`;
