import { gql } from '@apollo/client';
import type { ActionFunction } from '@remix-run/node';

import UserForm from '@/components/User/Form';
import { handleSubmission } from '@/utils/action';

export const action: ActionFunction = ({ request, context }) => {
  return handleSubmission({
    request,
    context,
    mutation: userMutation,
    createMutation: 'createUser',
  });
};

export default function UserAdd() {
  return <UserForm heading="Add User" buttonLabel="Add User" />;
}

const userMutation = gql`
  mutation CreateUserMutation($input: CreateUserInput!) {
    createUser(input: $input) {
      id
    }
  }
`;
