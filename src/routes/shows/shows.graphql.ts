import type { LoaderFunction } from '@remix-run/node';
import { gql } from '@apollo/client';

import query from '@/utils/query';
import ShowsGrid from '@/components/Shows/Grid';

export const loader: LoaderFunction = async ({ params, context }) => {
  const variables = { first: 200 } as any;
  if (params.taxonomy && params.term) {
    variables.taxonomy = params.taxonomy;
    variables.term = params.term;
  }

  return query({
    context,
    query: showsQuery,
    variables,
  });
};

export const showsQuery = gql`
  query ShowsQuery($first: Int, $after: String, $taxonomy: String, $term: String) {
    shows(latest: true, first: $first, after: $after, taxonomy: $taxonomy, term: $term) {
      ...ShowsGrid_shows
    }
  }
  ${ShowsGrid.fragments.shows}
`;
