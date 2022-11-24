import { gql } from '@apollo/client';
import { sidebarQuery } from './components/Sidebar';

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
    dashboardSettings: settings(id: "dashboard") {
      ... on DashboardSettings {
        googleTrackingId
      }
    }
    socialSettings: settings(id: "social") {
      ... on SocialSettings {
        facebookUrl
        facebookAppId
        twitterUsername
        instagramUsername
        youtubeUsername
      }
    }
    ...Sidebar_shows
  }
  ${sidebarQuery}
`;
