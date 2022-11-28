import query from '@/utils/query';
import { gql } from '@apollo/client';
import type { LoaderFunction } from '@remix-run/node';

export const loader: LoaderFunction = ({ context }) => {
  return query({ context, query: settingsQuery });
};

export default function DashboardSettings() {
  return null;
}

const settingsQuery = gql`
  query DashboardSettingsQuery {
    dashboardSettings {
      id
      googleClientId
      googleTrackingId
    }
  }
`;
