import { gql } from '@apollo/client';
import { useLoaderData } from '@remix-run/react';
import type { ActionFunction, LoaderFunction } from '@remix-run/node';

import { Heading, HeaderAdd } from '@/components/Admin/styles';
import ListTable, { RowTitle, RowActions, usePath } from '@/components/Admin/ListTable';
import Message from '@/components/Form/Message';
import query, { addPageOffset } from '@/utils/query';
import { handleDelete } from '@/utils/action';
import type { Show } from '@/types/graphql';

export const loader: LoaderFunction = ({ request, context, params }) => {
  return query({
    request,
    context,
    query: showsQuery,
    variables: addPageOffset(params, { order: 'DESC' }),
  });
};

export const action: ActionFunction = async ({ request, context }) => {
  return handleDelete({ request, context, mutation: showsMutation });
};

export default function Shows() {
  const path = usePath();
  const { shows } = useLoaderData();

  const columns = [
    {
      label: 'Title',
      render: (show: Show) => {
        const showUrl = `${path}/${show.id}`;
        return (
          <>
            <RowTitle url={showUrl} title={show.title} />
            <RowActions
              actions={[
                { type: 'edit', url: showUrl },
                { type: 'delete', url: showUrl, ids: [show.id] },
              ]}
            />
          </>
        );
      },
    },
    {
      label: 'Artist',
      render: ({ artist }: Show) => {
        const editUrl = `/admin/term/${artist.taxonomy.id}/${artist.id}`;
        return (
          <>
            <RowTitle url={editUrl} title={artist.name} />
            <RowActions
              actions={[
                { type: 'edit', url: editUrl },
                { type: 'view', url: `/artist/${artist.slug}` },
              ]}
            />
          </>
        );
      },
    },
    {
      label: 'Venue',
      render: ({ venue }: Show) => {
        const editUrl = `/admin/term/${venue.taxonomy.id}/${venue.id}`;
        return (
          <>
            <RowTitle url={editUrl} title={venue.name} />
            <RowActions
              actions={[
                { type: 'edit', url: editUrl },
                { type: 'view', url: `/venue/${venue.slug}` },
              ]}
            />
          </>
        );
      },
    },
    {
      label: 'Date',
      prop: 'date',
      type: 'date',
    },
  ];

  return (
    <>
      <Heading>Shows</Heading>
      <HeaderAdd label="Show" />
      <Message param="deleted" text="Deleted %s shows." />
      <ListTable columns={columns} data={shows} />
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
            slug
            taxonomy {
              id
            }
          }
          venue {
            id
            name
            slug
            taxonomy {
              id
            }
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
