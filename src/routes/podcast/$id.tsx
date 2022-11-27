import type { LoaderFunction, MetaFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { gql } from '@apollo/client';

import query from '@/utils/query';
import { uploadUrl } from '@/utils/media';

import Podcast from '@/components/Podcast';
import { metaTags } from '@/components/Podcast/utils';

export const meta: MetaFunction = ({ data, parentsData }) => {
  const { settings, podcastSettings } = parentsData.root;
  const { podcast } = data;
  if (!podcast) {
    return {};
  }
  const { title, description } = podcast;
  return metaTags({
    title,
    description,
    url: `${settings.siteUrl}/podcast/${podcast.id}`,
    image: podcastSettings.image,
    settings,
  });
};

export const loader: LoaderFunction = async ({ params, context }) => {
  return query({ context, query: podcastQuery, variables: { id: params.id } });
};

export default function PodcastRoute() {
  const data = useLoaderData();
  const { podcast } = data;

  return (
    <Podcast title={podcast.title} description={podcast.description}>
      <figure className="mb-6">
        <audio src={uploadUrl(podcast.audio.destination, podcast.audio.fileName)} controls />
      </figure>
    </Podcast>
  );
}

const podcastQuery = gql`
  query PodcastQuery($id: ObjID!) {
    podcast(id: $id) {
      id
      title
      description
      audio {
        id
        duration
        destination
        fileName
      }
    }
  }
`;
