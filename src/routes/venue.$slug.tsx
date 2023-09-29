import { gql } from '@apollo/client';
import { useLoaderData } from '@remix-run/react';
import type { LoaderFunction } from '@remix-run/server-runtime';

import { Heading1 } from '@/components/Heading';
import FeaturedMedia from '@/components/FeaturedMedia';
import Shows from '@/components/Shows';
import query from '@/utils/query';
import type { ImageUpload, ShowConnection, Venue, VenueQuery } from '@/types/graphql';

export const loader: LoaderFunction = async ({ params, context }) => {
  return query({ context, query: venueQuery, variables: { first: 100, slug: params.slug } });
};

export default function Venue() {
  const data = useLoaderData<VenueQuery>();
  const venue = data.venue as Venue;
  const shows = data.shows as ShowConnection;

  return (
    <>
      <FeaturedMedia featuredMedia={venue.featuredMedia as ImageUpload[]} />
      <Heading1>{venue.name}</Heading1>
      {venue.address && (
        <p
          className="mb-3"
          dangerouslySetInnerHTML={{ __html: venue.address.replace(/\n/g, '<br />') }}
        />
      )}
      {venue.capacity && <p className="mb-5">Capacity: {venue.capacity}</p>}
      <Shows shows={shows} />
    </>
  );
}

const venueQuery = gql`
  query VenueQuery($slug: String!, $first: Int) {
    venue: term(slug: $slug, taxonomy: "venue") {
      id
      name
      featuredMedia {
        ...FeaturedMedia_featuredMedia
      }
      ... on Venue {
        capacity
        address
      }
    }
    shows(latest: true, term: $slug, taxonomy: "venue", first: $first) {
      ...ShowsGrid_shows
    }
  }
  ${FeaturedMedia.fragments.featuredMedia}
  ${Shows.fragments.shows}
`;
