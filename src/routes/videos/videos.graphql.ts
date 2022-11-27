import { gql } from '@apollo/client';
import { videosQuery as queryFragment } from '@/components/Videos/utils';
import type { LoaderFunction } from '@remix-run/node';

import query from '@/utils/query';
import { settingsQuery } from '@/utils/settings';

const videosQuery = gql`
  query VideosQuery(
    $cacheKey: String
    $year: Int
    $first: Int
    $last: Int
    $after: String
    $before: String
  ) {
    ...Videos_videos
    ...Settings_site
  }
  ${queryFragment}
  ${settingsQuery}
`;

export const loader: LoaderFunction = ({ params, request, context }) => {
  const url = new URL(request.url);
  const variables = { cacheKey: 'videos' } as any;
  const after = url.searchParams.get('after');
  const before = url.searchParams.get('before');
  if (after) {
    variables.first = 10;
    variables.after = after;
  } else if (before) {
    variables.last = 10;
    variables.before = before;
  } else {
    variables.first = 10;
  }
  if (params.year) {
    variables.year = parseInt(params.year, 10);
  }
  return query({
    context,
    query: videosQuery,
    variables,
  });
};
