import { gql } from '@apollo/client';
import { useLoaderData } from '@remix-run/react';
import type { ActionFunction, LoaderFunction } from '@remix-run/node';

import { Heading, HeaderAdd } from '@/components/Admin/styles';
import ListTable, { RowTitle, RowActions } from '@/components/Admin/ListTable';
import Message from '@/components/Form/Message';
import query from '@/utils/query';
import { handleDelete } from '@/utils/action';

const columns = [
  {
    label: 'Name',
    render: (user: any) => {
      const userUrl = `/admin/user/${user.id}`;
      return (
        <>
          <RowTitle url={userUrl} title={user.name} />
          <RowActions
            actions={[
              { type: 'edit', url: userUrl },
              { type: 'delete', url: userUrl, ids: [user.id] },
            ]}
          />
        </>
      );
    },
  },
];

const variables = { first: 1000 };

export const loader: LoaderFunction = ({ context }) => {
  return query({ context, query: usersQuery, variables });
};

export const action: ActionFunction = async ({ request, context }) => {
  return handleDelete({ request, context, mutation: usersMutation });
};

export default function Users() {
  const { users } = useLoaderData();
  return (
    <>
      <Heading>Users</Heading>
      <HeaderAdd to="/admin/user/add">Add User</HeaderAdd>
      <Message param="deleted" text="Deleted %s users." />
      <ListTable
        columns={columns}
        deletable
        perPage={variables.first}
        data={users}
        path="/admin/user"
      />
    </>
  );
}

const usersQuery = gql`
  query UsersAdminQuery {
    users @cache(key: "admin") {
      count
      edges {
        node {
          id
          name
        }
      }
      pageInfo {
        hasNextPage
      }
    }
  }
`;

const usersMutation = gql`
  mutation DeleteUserMutation($ids: [ObjID]!) {
    removeUser(ids: $ids)
  }
`;
