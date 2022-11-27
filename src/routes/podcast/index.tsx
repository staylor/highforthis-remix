import type { LoaderFunction, MetaFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { gql } from '@apollo/client';

import Podcast from '@/components/Podcast';
import { metaTags } from '@/components/Podcast/utils';
import Link from '@/components/Link';
import query from '@/utils/query';
import { settingsQuery, podcastSettingsQuery } from '@/utils/settings';

export const meta: MetaFunction = ({ data }) => {
  const { settings, podcastSettings } = data;
  const { description, websiteLink: url, image } = podcastSettings;

  return metaTags({
    title: 'Podcast: ' + podcastSettings.title,
    description,
    url,
    image,
    settings,
  });
};

export const loader: LoaderFunction = async ({ context }) => {
  return query({ context, query: podcastsQuery, variables: { first: 10 } });
};

export default function Podcasts() {
  const data = useLoaderData();
  const { podcasts, podcastSettings } = data;
  const { title, description: summary } = podcastSettings;

  return (
    <Podcast title={`Podcast: ${title}`} description={summary}>
      {podcasts.edges.map(({ node }: any) => (
        <figure className="mb-6" key={node.id}>
          <figcaption className="mb-3">
            <Link to={`/podcast/${node.id}`} className="text-pink dark:text-pink block">
              {node.title}
            </Link>
            <p>{node.description}</p>
          </figcaption>
        </figure>
      ))}
    </Podcast>
  );
}

const podcastsQuery = gql`
  query PodcastsQuery($first: Int) {
    ...Settings_site
    ...Settings_podcast
    podcasts(first: $first) {
      edges {
        node {
          id
          title
          description
        }
      }
    }
  }
  ${settingsQuery}
  ${podcastSettingsQuery}
`;
