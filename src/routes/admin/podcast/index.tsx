import { gql } from '@apollo/client';
import { useLoaderData } from '@remix-run/react';
import type { ActionFunction, LoaderFunction } from '@remix-run/node';

import { Heading, HeaderAdd } from '@/components/Admin/styles';
import ListTable, { RowTitle, RowActions, usePath } from '@/components/Admin/ListTable';
import Message from '@/components/Form/Message';
import query, { addPageOffset } from '@/utils/query';
import { handleDelete } from '@/utils/action';

export const loader: LoaderFunction = ({ context, params }) => {
  return query({
    context,
    query: podcastsQuery,
    variables: addPageOffset(params),
  });
};

export const action: ActionFunction = async ({ request, context }) => {
  return handleDelete({ request, context, mutation: podcastMutation });
};

export default function Podcasts() {
  const path = usePath();
  const { podcasts } = useLoaderData();
  const columns = [
    {
      label: 'Title',
      render: (podcast: any) => {
        const editUrl = `${path}/${podcast.id}`;
        return (
          <>
            <RowTitle url={editUrl} title={podcast.title} />
            <RowActions
              actions={[
                { type: 'edit', url: editUrl },
                { type: 'view', url: `/podcast/${podcast.id}` },
                { type: 'delete', url: editUrl, ids: [podcast.id] },
              ]}
            />
          </>
        );
      },
    },
  ];
  return (
    <>
      <Heading>Podcasts</Heading>
      <HeaderAdd label="Podcast" />
      <Message param="deleted" text="Deleted %s podcasts." />
      <ListTable columns={columns} data={podcasts} />
    </>
  );
}

const podcastsQuery = gql`
  query PodcastsAdminQuery {
    podcasts @cache(key: "admin") {
      count
      edges {
        node {
          id
          title
          image {
            id
            type
            destination
            crops {
              fileName
              width
            }
          }
          audio {
            id
            type
            destination
            images {
              fileName
              width
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

const podcastMutation = gql`
  mutation DeletePodcastMutation($ids: [ObjID]!) {
    removePodcast(ids: $ids)
  }
`;
