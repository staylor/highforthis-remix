import { gql } from '@apollo/client';

import { videosQuery } from '@/components/Videos/utils';
import { latestQuery } from '@/components/Latest';

export const homeQuery = gql`
  query HomeQuery(
    $cacheKey: String
    $year: Int
    $first: Int
    $last: Int
    $after: String
    $before: String
  ) {
    ...Latest_posts
    ...Videos_videos
  }
  ${latestQuery}
  ${videosQuery}
`;
