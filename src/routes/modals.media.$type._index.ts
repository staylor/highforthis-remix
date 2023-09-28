import type { OperationVariables } from '@apollo/client';
import { gql } from '@apollo/client';
import type { LoaderFunction } from '@remix-run/server-runtime';

import query from '@/utils/query';

export const loader: LoaderFunction = ({ context, params }) => {
  const variables = { first: 50 } as OperationVariables;
  if (params.type) {
    variables.type = params.type;
  }
  if (params.cursor) {
    variables.cursor = params.cursor;
  }
  return query({ context, query: uploadsQuery, variables });
};

const uploadsQuery = gql`
  query MediaModalQuery($type: String, $first: Int, $cursor: String) {
    uploads(after: $cursor, first: $first, type: $type) @cache(key: "modal") {
      edges {
        node {
          id
          title
          type
          destination
          fileName
          ... on ImageUpload {
            crops {
              width
              fileName
            }
          }
          ... on AudioUpload {
            images {
              width
              fileName
            }
          }
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;
