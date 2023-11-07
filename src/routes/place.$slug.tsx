import { gql } from '@apollo/client';
import { useLoaderData } from '@remix-run/react';
import type { LoaderFunction } from '@remix-run/server-runtime';

import Link from '@/components/Link';
import FeaturedMedia from '@/components/FeaturedMedia';
import TextTitle from '@/components/TextTitle';
import query from '@/utils/query';
import type { ImageUpload, Place, PlaceQuery } from '@/types/graphql';

export const loader: LoaderFunction = ({ context, params }) => {
  return query({ context, query: placeQuery, variables: { first: 100, slug: params.slug } });
};

export default function Place() {
  const data = useLoaderData<PlaceQuery>();
  const place = data.place as Place;
  return (
    <>
      <Link to="/places" className="my-5 block text-pink">
        &larr; Back to all Places
      </Link>
      <FeaturedMedia cropSize={3840} featuredMedia={place.featuredMedia as ImageUpload[]} />
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
