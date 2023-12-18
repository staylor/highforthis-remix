import { gql } from 'graphql-tag';

import Video from './Video';

export const videosQuery = gql`
  fragment Videos_videos on Query {
    videos(year: $year, first: $first, last: $last, after: $after, before: $before)
      @cache(key: $cacheKey) {
      edges {
        node {
          id
          ...Video_video
        }
        cursor
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
      }
    }
  }
  ${Video.fragments.video}
`;
