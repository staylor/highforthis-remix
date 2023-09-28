import { gql } from '@apollo/client';
import type { ActionFunction, LoaderFunction } from '@remix-run/server-runtime';
import { useLoaderData } from '@remix-run/react';

import PodcastForm from '@/components/Admin/Podcast/Form';
import query from '@/utils/query';
import { handleSubmission } from '@/utils/action';

export const loader: LoaderFunction = ({ request, context, params }) => {
  return query({ request, context, query: podcastQuery, variables: { id: params.id } });
};

export const action: ActionFunction = ({ request, context, params }) => {
  return handleSubmission({
    request,
    context,
    mutation: podcastMutation,
    variables: { id: params.id },
  });
};

export default function PodcastEdit() {
  const { podcast } = useLoaderData();
  return <PodcastForm data={podcast} heading="Edit Podcast" buttonLabel="Update Podcast" />;
}

const podcastQuery = gql`
  query PodcastEditQuery($id: ObjID!) {
    podcast(id: $id) {
      ...PodcastForm_podcast
    }
  }
  ${PodcastForm.fragments.podcast}
`;

const podcastMutation = gql`
  mutation UpdatePodcastMutation($id: ObjID!, $input: UpdatePodcastInput!) {
    updatePodcast(id: $id, input: $input) {
      ...PodcastForm_podcast
    }
  }
  ${PodcastForm.fragments.podcast}
`;
