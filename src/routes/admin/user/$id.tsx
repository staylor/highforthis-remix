import { gql } from '@apollo/client';
import type { ActionFunction, LoaderFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';

import UserForm from '@/components/User/Form';
import query from '@/utils/query';
import { handleSubmission } from '@/utils/action';

export const loader: LoaderFunction = ({ context, params }) => {
  return query({ context, query: userQuery, variables: { id: params.id } });
};

export const action: ActionFunction = ({ request, context, params }) => {
  return handleSubmission({
    request,
    context,
    mutation: userMutation,
    variables: { id: params.id },
  });
};

export default function UserEdit() {
  const { user } = useLoaderData();
  return <UserForm data={user} heading="Edit User" buttonLabel="Update User" />;
}

const userQuery = gql`
  query UserEditQuery($id: ObjID!) {
    user(id: $id) {
      ...UserForm_user
    }
  }
  ${UserForm.fragments.user}
`;

const userMutation = gql`
  mutation UpdateUserMutation($id: ObjID!, $input: UpdateUserInput!) {
    updateUser(id: $id, input: $input) {
      ...UserForm_user
    }
  }
  ${UserForm.fragments.user}
`;
