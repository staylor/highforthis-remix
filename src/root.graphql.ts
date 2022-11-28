import { gql } from '@apollo/client';
import { sidebarQuery } from '@/components/Sidebar';

export const appQuery = gql`
  query AppQuery {
    settings(id: "site") {
      ... on SiteSettings {
        siteTitle
        tagline
        siteUrl
        language
        copyrightText
      }
    }
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
    dashboardSettings: settings(id: "dashboard") {
      ... on DashboardSettings {
        googleTrackingId
        googleClientId
      }
    }
    socialSettings: settings(id: "social") {
      ... on SocialSettings {
        twitterUsername
        instagramUsername
        youtubeUsername
        tiktokUsername
      }
    }
    ...Sidebar_shows
  }
  ${sidebarQuery}
`;
