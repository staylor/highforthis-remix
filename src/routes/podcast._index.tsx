import type { LoaderFunction } from '@remix-run/server-runtime';
import { useLoaderData } from '@remix-run/react';
import { gql } from '@apollo/client';
import type { MetaFunction } from '@remix-run/node';

import Podcast from '@/components/Podcast';
import { metaTags } from '@/components/Podcast/utils';
import Link from '@/components/Link';
import query from '@/utils/query';
import type { PodcastConnection, PodcastsQuery } from '@/types/graphql';
import { rootData, useRootData } from '@/utils/rootData';

export const meta: MetaFunction = ({ matches }) => {
  const { siteSettings, podcastSettings } = rootData(matches);
  const { description, websiteLink: url, image } = podcastSettings;

  return metaTags({
    title: 'Podcast: ' + podcastSettings.title,
    description,
    url,
    image,
    siteSettings,
  });
};

export const loader: LoaderFunction = async ({ context }) => {
  return query({ context, query: podcastsQuery, variables: { first: 10 } });
};

export default function Podcasts() {
  const data = useLoaderData<PodcastsQuery>();
  const podcasts = data.podcasts as PodcastConnection;
  const { podcastSettings } = useRootData();
  const { title, description: summary } = podcastSettings;

  return (
    <Podcast title={`Podcast: ${title}`} description={summary as string}>
      {podcasts.edges.map(({ node }) => (
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
`;
