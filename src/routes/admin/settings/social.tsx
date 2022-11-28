import query from '@/utils/query';
import { gql } from '@apollo/client';
import type { LoaderFunction } from '@remix-run/node';

export const loader: LoaderFunction = ({ context }) => {
  return query({ context, query: settingsQuery, variables: { id: 'social' } });
};

export default function SocialSettings() {
  return null;
}

const settingsQuery = gql`
  query SocialSettingsQuery($id: String) {
    settings(id: $id) {
      ... on SocialSettings {
        id
        twitterUsername
        instagramUsername
        youtubeUsername
        tiktokUsername
      }
    }
  }
`;
