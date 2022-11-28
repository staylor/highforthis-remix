import { gql } from '@apollo/client';
import { sidebarQuery } from '@/components/Sidebar';

export const appQuery = gql`
  query AppQuery {
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
