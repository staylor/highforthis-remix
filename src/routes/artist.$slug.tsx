import { gql } from 'graphql-tag';
import { useLoaderData } from '@remix-run/react';
import type { LoaderFunction } from '@remix-run/server-runtime';

import Layout from '@/components/Layout/Layout';
import { Heading1 } from '@/components/Heading';
import Shows from '@/components/Shows';
import query from '@/utils/query';
import type { Artist, ArtistQuery, ShowConnection } from '@/types/graphql';
import Image from '@/components/Image';

export const loader: LoaderFunction = async ({ params, context }) => {
  return query({ context, query: artistQuery, variables: { first: 100, slug: params.slug } });
};

export default function Artist() {
  const data = useLoaderData<ArtistQuery>();
  const artist = data.artist as Artist;
  const shows = data.shows as ShowConnection;
  const { url, artwork } = artist.appleMusic || {};

  return (
    <Layout>
      <Heading1>{artist.name}</Heading1>
      {artwork?.url && url && (
        <a
          href={url}
          className="mb-4 block rounded-lg"
          style={{ width: 300, height: 300 }}
          target="_blank"
          rel="noreferrer"
        >
          <Image
            className="block rounded-lg"
            src={artwork.url?.replace(/\{[wh]\}/g, '300')}
            alt={artist.name}
            width={300}
            height={300}
          />
        </a>
      )}
      <Shows shows={shows} />
    </Layout>
  );
}

const artistQuery = gql`
  query ArtistQuery($slug: String!, $first: Int) {
    artist: term(slug: $slug, taxonomy: "artist") {
      id
      name
      ... on Artist {
        appleMusic {
          url
          artwork {
            url
          }
        }
      }
    }
    shows(latest: true, term: $slug, taxonomy: "artist", first: $first) {
      ...ShowsGrid_shows
    }
  }
  ${Shows.fragments.shows}
`;
