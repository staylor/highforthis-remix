import { gql } from '@apollo/client';
import type { ActionFunction, LoaderFunction } from '@remix-run/server-runtime';
import { useLoaderData } from '@remix-run/react';

import ShowForm from '@/components/Admin/Show/Form';
import query from '@/utils/query';
import { handleSubmission } from '@/utils/action';
import type { ShowEditQuery } from '@/types/graphql';

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
  const data = useLoaderData<ShowEditQuery>();
  return <ShowForm data={data} heading="Edit Show" buttonLabel="Update Show" />;
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
