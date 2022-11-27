import { gql } from '@apollo/client';
import { useLoaderData } from '@remix-run/react';
import type { LoaderFunction } from '@remix-run/node';

import Link from '@/components/Link';
import FeaturedMedia from '@/components/FeaturedMedia';
import TextTitle from '@/components/TextTitle';
import query from '@/utils/query';

export const loader: LoaderFunction = ({ context, params }) => {
  return query({ context, query: placeQuery, variables: { first: 100, slug: params.slug } });
};

export default function Place() {
  const { place } = useLoaderData();
  return (
    <>
      <Link to="/places" className="text-pink my-5 block">
        &larr; Back to all Places
      </Link>
      <FeaturedMedia cropSize={3840} featuredMedia={place.featuredMedia} />
      <TextTitle>{place.name}</TextTitle>
      {place.address && (
        <p
          className="mb-5"
          dangerouslySetInnerHTML={{ __html: place.address.replace(/\n/g, '<br />') }}
        />
      )}
    </>
  );
}

const placeQuery = gql`
  query PlaceQuery($slug: String!) {
    place: term(slug: $slug, taxonomy: "place") {
      id
      name
      featuredMedia {
        ...FeaturedMedia_featuredMedia
      }
      ... on Place {
        address
        neighborhood {
          id
          name
        }
        categories {
          id
          name
        }
        crossStreets {
          id
          name
        }
      }
    }
  }
  ${FeaturedMedia.fragments.featuredMedia}
`;
