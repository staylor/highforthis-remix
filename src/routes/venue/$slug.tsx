import { gql } from '@apollo/client';
import { useLoaderData } from '@remix-run/react';
import type { LoaderFunction } from '@remix-run/node';

import Title from '@/components/Title';
import FeaturedMedia from '@/components/FeaturedMedia';
import Shows from '@/components/Shows';
import query from '@/utils/query';

export const loader: LoaderFunction = async ({ params, context }) => {
  return query({ context, query: venueQuery, variables: { first: 100, slug: params.slug } });
};

function Venue() {
  const { venue, shows } = useLoaderData();
  return (
    <>
      <FeaturedMedia featuredMedia={venue.featuredMedia} />
      <Title>{venue.name}</Title>
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

export default Venue;
