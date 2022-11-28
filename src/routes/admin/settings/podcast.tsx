import query from '@/utils/query';
import { gql } from '@apollo/client';
import type { LoaderFunction } from '@remix-run/node';

export const loader: LoaderFunction = ({ context }) => {
  return query({ context, query: settingsQuery, variables: { id: 'podcast' } });
};

export default function PodcastSettings() {
  return null;
}

const settingsQuery = gql`
  query PodcastSettingsQuery($id: String) {
    settings(id: $id) {
      ... on PodcastSettings {
        id
        title
        description
        managingEditor
        copyrightText
        websiteLink
        feedLink
        itunesName
        itunesEmail
        generator
        language
        explicit
        category
        image {
          id
          type
          destination
          fileName
          crops {
            fileName
            width
          }
        }
      }
    }
  }
`;
