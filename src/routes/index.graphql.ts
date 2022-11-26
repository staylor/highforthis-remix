import { gql } from '@apollo/client';

import { videosQuery } from '@/components/Videos';
import { latestQuery } from '@/components/Latest';

export const homeQuery = gql`
  query HomeQuery($cacheKey: String, $first: Int, $last: Int, $after: String, $before: String) {
    ...Latest_posts
    ...Videos_videos
  }
  ${latestQuery}
  ${videosQuery}
`;
