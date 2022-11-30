import { gql } from '@apollo/client';
import type { ActionFunction } from '@remix-run/node';

import PodcastForm from '@/components/Admin/Podcast/Form';
import { handleSubmission } from '@/utils/action';

export const action: ActionFunction = ({ request, context }) => {
  return handleSubmission({
    request,
    context,
    mutation: podcastMutation,
    createMutation: 'createShow',
  });
};

export default function PodcastAdd() {
  return <PodcastForm heading="Add Podcast" buttonLabel="Add Podcast" />;
}

const podcastMutation = gql`
  mutation CreatePodcastMutation($input: CreatePodcastInput!) {
    createPodcast(input: $input) {
      id
    }
  }
`;
