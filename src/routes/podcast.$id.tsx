import type { LoaderFunction } from '@remix-run/server-runtime';
import { useLoaderData } from '@remix-run/react';
import { gql } from 'graphql-tag';
import type { MetaFunction } from '@remix-run/node';

import Layout from '@/components/Layout/Layout';
import query from '@/utils/query';
import { uploadUrl } from '@/utils/media';
import Podcast from '@/components/Podcast';
import { metaTags } from '@/components/Podcast/utils';
import { rootData } from '@/utils/rootData';
import type { Podcast as PodcastType, PodcastQuery, AudioUpload } from '@/types/graphql';

export const meta: MetaFunction = ({ data, matches }) => {
  const { siteSettings, podcastSettings } = rootData(matches);
  const { podcast } = data as PodcastQuery;
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
  const data = useLoaderData<PodcastQuery>();
  const podcast = data.podcast as PodcastType;
  const audio = podcast.audio as AudioUpload;

  return (
    <Layout>
      <Podcast title={podcast.title} description={podcast.description}>
        <figure className="mb-6">
          <audio src={uploadUrl(audio.destination, audio.fileName)} controls />
        </figure>
      </Podcast>
    </Layout>
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
