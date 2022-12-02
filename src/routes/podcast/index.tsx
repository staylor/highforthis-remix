import type { LoaderFunction, MetaFunction } from '@remix-run/node';
import { useLoaderData, useMatches } from '@remix-run/react';
import { gql } from '@apollo/client';

import Podcast from '@/components/Podcast';
import { metaTags } from '@/components/Podcast/utils';
import Link from '@/components/Link';
import query from '@/utils/query';
import type { PodcastEdge } from '@/types/graphql';

export const meta: MetaFunction = ({ parentsData }) => {
  const { siteSettings, podcastSettings } = parentsData.root;
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
  const { podcasts } = useLoaderData();
  const [root] = useMatches();
  const { title, description: summary } = root.data.podcastSettings;

  return (
    <Podcast title={`Podcast: ${title}`} description={summary}>
      {podcasts.edges.map(({ node }: PodcastEdge) => (
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
