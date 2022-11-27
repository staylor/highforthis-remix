import { gql } from '@apollo/client';

export const settingsQuery = gql`
  fragment Settings_site on Query {
    settings(id: "site") {
      ... on SiteSettings {
        siteTitle
        tagline
        siteUrl
        language
        copyrightText
      }
    }
  }
`;

export const podcastSettingsQuery = gql`
  fragment Settings_podcast on Query {
    podcastSettings: settings(id: "podcast") {
      ... on PodcastSettings {
        title
        description
        websiteLink
        feedLink
        image {
          id
          destination
          fileName
        }
      }
    }
  }
`;
