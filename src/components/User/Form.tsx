import { gql } from '@apollo/client';

import { FormWrap, Heading } from '@/components/Admin/styles';
import Form from '@/components/Form';
import Message from '@/components/Form/Message';

const userFields = [
  { label: 'Name', prop: 'name' },
  { label: 'Email', prop: 'email', inputType: 'email', autoComplete: false },
  { label: 'Password', prop: 'password', inputType: 'password', autoComplete: false },
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
  return (
    <>
      <Heading>{heading}</Heading>
      <Message text="User updated." />
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
