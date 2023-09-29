import type { LoaderFunction } from '@remix-run/server-runtime';
import { useLoaderData } from '@remix-run/react';
import { gql } from '@apollo/client';
import type { V2_MetaFunction } from '@remix-run/node';

import query from '@/utils/query';
import { uploadUrl } from '@/utils/media';
import Podcast from '@/components/Podcast';
import { metaTags } from '@/components/Podcast/utils';
import { rootData } from '@/utils/rootData';

export const meta: V2_MetaFunction = ({ data, matches }) => {
  const { siteSettings, podcastSettings } = rootData(matches);
  const { podcast } = data;
  if (!podcast) {
    return [];
  }
  const { title, description } = podcast;
  return metaTags({
    title,
    description,
    url: `${siteSettings.siteUrl}/podcast/${podcast.id}`,
    image: podcastSettings.image,
    siteSettings,
  });
};

export const loader: LoaderFunction = async ({ params, context }) => {
  return query({ context, query: podcastQuery, variables: { id: params.id } });
};

export default function PodcastRoute() {
  const { podcast } = useLoaderData();

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
