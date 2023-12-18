import type { OperationVariables } from '@apollo/client';
import { gql } from 'graphql-tag';
import type { LoaderFunction } from '@remix-run/server-runtime';

import Video from '@/components/Videos/Video';
import query from '@/utils/query';

export const loader: LoaderFunction = ({ context, params }) => {
  const variables = { first: 50 } as OperationVariables;
  if (params.cursor) {
    variables.cursor = params.cursor;
  }
  return query({ context, query: videosQuery, variables });
};

const videosQuery = gql`
  query VideoModalQuery($cursor: String, $first: Int) {
    videos(after: $cursor, first: $first) @cache(key: "modal") {
      edges {
        node {
          id
          ...Video_video
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
  ${Video.fragments.video},
`;
