import { gql } from '@apollo/client';
import { useSearchParams } from '@remix-run/react';

import { FormWrap, Heading } from '@/components/Admin/styles';
import Form from '@/components/Form';
import Message from '@/components/Form/Message';

const userFields = [
  { label: 'Name', prop: 'name' },
  { label: 'Email', prop: 'email', inputType: 'email' },
  { label: 'Password', prop: 'password', inputType: 'password' },
  {
    label: 'Bio',
    prop: 'bio',
    type: 'textarea',
  },
  {
    label: 'Roles',
    prop: 'roles',
    type: 'select',
    choices: [
      { label: 'Admin', value: 'admin' },
      { label: 'Editor', value: 'editor' },
    ],
    multiple: true,
  },
];

function UserForm({ data = {}, heading, buttonLabel }: any) {
  const [searchParams] = useSearchParams();
  const message = searchParams.get('message');

  return (
    <>
      <Heading>{heading}</Heading>
      {message === 'updated' && <Message text="User updated." />}
      <FormWrap>
        <Form data={data} fields={userFields} buttonLabel={buttonLabel} />
      </FormWrap>
    </>
  );
}

UserForm.fragments = {
  user: gql`
    fragment UserForm_user on User {
      id
      name
      email
      bio
      roles
    }
  `,
};

export default UserForm;
