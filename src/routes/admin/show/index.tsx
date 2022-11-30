import { gql } from '@apollo/client';
import { useLoaderData } from '@remix-run/react';
import type { ActionFunction, LoaderFunction } from '@remix-run/node';

import { Heading, HeaderAdd } from '@/components/Admin/styles';
import ListTable, { RowTitle, RowActions } from '@/components/Admin/ListTable';
import Message from '@/components/Form/Message';
import query, { addPageOffset } from '@/utils/query';
import { handleDelete } from '@/utils/action';

const columns = [
  {
    label: 'Title',
    render: (show: any) => {
      const showUrl = `/admin/show/${show.id}`;
      return (
        <>
          <RowTitle url={showUrl} title={show.title} />
          <RowActions
            actions={[
              { type: 'edit', url: showUrl },
              { type: 'view', url: `/show/${show.id}` },
              { type: 'delete', url: showUrl, ids: [show.id] },
            ]}
          />
        </>
      );
    },
  },
  {
    label: 'Artist',
    render: (show: any) => show.artist.name,
  },
  {
    label: 'Venue',
    render: (show: any) => show.venue.name,
  },
  {
    label: 'Date',
    prop: 'date',
    type: 'date',
  },
];

const PER_PAGE = 20;

export const loader: LoaderFunction = ({ context, params }) => {
  return query({
    context,
    query: showsQuery,
    variables: addPageOffset(params, { first: PER_PAGE, order: 'DESC' }),
  });
};

export const action: ActionFunction = async ({ request, context }) => {
  return handleDelete({ request, context, mutation: showsMutation });
};

export default function Shows() {
  const { shows } = useLoaderData();
  return (
    <>
      <Heading>Shows</Heading>
      <HeaderAdd to="/admin/show/add">Add Show</HeaderAdd>
      <Message param="deleted" text="Deleted %s shows." />
      <ListTable columns={columns} deletable perPage={PER_PAGE} data={shows} path="/admin/show" />
    </>
  );
}

const showsQuery = gql`
  query ShowsAdminQuery(
    $first: Int
    $after: String
    $date: Float
    $taxonomy: String
    $term: String
    $search: String
    $order: ShowOrder
  ) {
    shows(
      first: $first
      after: $after
      date: $date
      taxonomy: $taxonomy
      term: $term
      search: $search
      order: $order
    ) @cache(key: "admin") {
      count
      edges {
        node {
          id
          title
          date
          artist {
            id
            name
          }
          venue {
            id
            name
          }
        }
      }
      pageInfo {
        hasNextPage
      }
    }
  }
`;

const showsMutation = gql`
  mutation DeleteShowMutation($ids: [ObjID]!) {
    removeShow(ids: $ids)
  }
`;
