import { gql } from '@apollo/client';
import { sidebarQuery } from '@/components/Sidebar';
import { settingsQuery, podcastSettingsQuery } from '@/utils/settings';

export const appQuery = gql`
  query AppQuery {
    ...Settings_site
    ...Settings_podcast
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
  ${settingsQuery}
  ${podcastSettingsQuery}
`;
