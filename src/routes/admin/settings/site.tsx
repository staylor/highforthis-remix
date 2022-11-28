import query from '@/utils/query';
import { gql } from '@apollo/client';
import type { LoaderFunction } from '@remix-run/node';

export const loader: LoaderFunction = ({ context }) => {
  return query({ context, query: settingsQuery, variables: { id: 'site' } });
};

export default function SiteSettings() {
  return null;
}

const settingsQuery = gql`
  query SiteSettingsQuery($id: String) {
    settings(id: $id) {
      ... on SiteSettings {
        id
        siteTitle
        tagline
        emailAddress
        language
        siteUrl
        copyrightText
      }
    }
  }
`;
