import { gql } from '@apollo/client';
import { useLoaderData } from '@remix-run/react';
import type { LoaderFunction } from '@remix-run/server-runtime';

import { Heading1 } from '@/components/Heading';
import FeaturedMedia from '@/components/FeaturedMedia';
import Shows from '@/components/Shows';
import query from '@/utils/query';
import type { Artist, ArtistQuery, ImageUpload, ShowConnection } from '@/types/graphql';

export const loader: LoaderFunction = async ({ params, context }) => {
  return query({ context, query: artistQuery, variables: { first: 100, slug: params.slug } });
};

export default function Artist() {
  const data = useLoaderData<ArtistQuery>();
  const artist = data.artist as Artist;
  const shows = data.shows as ShowConnection;
  return (
    <>
      <Heading1>{artist.name}</Heading1>
      <FeaturedMedia featuredMedia={artist.featuredMedia as ImageUpload[]} />
      <Shows shows={shows} />
    </>
  );
}

const artistQuery = gql`
  query ArtistQuery($slug: String!, $first: Int) {
    artist: term(slug: $slug, taxonomy: "artist") {
      id
      name
      featuredMedia {
        ...FeaturedMedia_featuredMedia
      }
    }
    shows(latest: true, term: $slug, taxonomy: "artist", first: $first) {
      ...ShowsGrid_shows
    }
  }
  ${FeaturedMedia.fragments.featuredMedia}
  ${Shows.fragments.shows}
`;
