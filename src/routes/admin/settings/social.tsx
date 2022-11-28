import query from '@/utils/query';
import { gql } from '@apollo/client';
import type { LoaderFunction } from '@remix-run/node';

export const loader: LoaderFunction = ({ context }) => {
  return query({ context, query: settingsQuery });
};

export default function SocialSettings() {
  return null;
}

const settingsQuery = gql`
  query SocialSettingsQuery {
    socialSettings {
      id
      twitterUsername
      instagramUsername
      youtubeUsername
      tiktokUsername
    }
  }
`;
