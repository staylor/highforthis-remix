import query from '@/utils/query';
import { gql } from '@apollo/client';
import type { LoaderFunction } from '@remix-run/node';

export const loader: LoaderFunction = ({ context }) => {
  return query({ context, query: settingsQuery, variables: { id: 'media' } });
};

export default function MediaSettings() {
  return null;
}

const settingsQuery = gql`
  query MediaSettingsQuery($id: String) {
    settings(id: $id) {
      ... on MediaSettings {
        id
        crops {
          name
          width
          height
        }
      }
    }
  }
`;
