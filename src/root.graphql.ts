import { gql } from 'graphql-tag';

import { sidebarQuery } from '@/components/Sidebar';

export const appQuery = gql`
  query AppQuery {
    apiKeys {
      googleMaps
    }
    siteSettings {
      siteTitle
      tagline
      siteUrl
      language
      copyrightText
    }
    podcastSettings {
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
    dashboardSettings {
      googleTrackingId
      googleClientId
    }
    socialSettings {
      twitterUsername
      instagramUsername
      youtubeUsername
      tiktokUsername
    }
    ...Sidebar_shows
  }
  ${sidebarQuery}
`;
