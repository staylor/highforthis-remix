import type { LoaderFunction, MetaFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { gql } from '@apollo/client';

import query from '@/utils/query';
import { settingsQuery, podcastSettingsQuery } from '@/utils/settings';
import { uploadUrl } from '@/utils/media';

import Podcast from '@/components/Podcast';
import { metaTags } from '@/components/Podcast/utils';

const podcastUrl = (data: any) => {
  const { podcast, settings } = data;
  return `${settings.siteUrl}/podcast/${podcast.id}`;
};

export const meta: MetaFunction = ({ data }) => {
  const { url, podcast, settings, podcastSettings } = data;
  if (!podcast) {
    return {};
  }
  const { title, description } = podcast;
  return metaTags({ title, description, url, image: podcastSettings.image, settings });
};

export const loader: LoaderFunction = async ({ params, context }) => {
  const data = await query({ context, query: podcastQuery, variables: { id: params.id } });
  const url = podcastUrl(data);
  return { ...data, url };
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
    ...Settings_site
    ...Settings_podcast
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
  ${settingsQuery}
  ${podcastSettingsQuery}
`;
