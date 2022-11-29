import { gql } from '@apollo/client';
import { useLoaderData } from '@remix-run/react';
import type { LoaderFunction } from '@remix-run/node';

import { Heading, HeaderAdd } from '@/components/Admin/styles';
import ListTable, { RowTitle, RowActions } from '@/components/ListTable';
import query from '@/utils/query';
import { useDelete } from '@/utils/mutate';

const columns = [
  {
    label: 'Name',
    render: (user: any, { onDelete }: any) => {
      const userUrl = `/admin/user/${user.id}`;
      return (
        <>
          <RowTitle url={userUrl} title={user.name} />
          <RowActions
            actions={[
              { type: 'edit', url: userUrl },
              { type: 'delete', url: userUrl, onClick: onDelete([user.id]) },
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

export default function Users() {
  const { users } = useLoaderData();
  const onDelete = useDelete(usersMutation);
  return (
    <>
      <Heading>Users</Heading>
      <HeaderAdd to="/admin/user/add">Add User</HeaderAdd>
      <ListTable
        columns={columns}
        onDelete={onDelete}
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
