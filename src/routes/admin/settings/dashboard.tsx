import { gql } from '@apollo/client';
import type { ActionFunction, LoaderFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';

import SettingsForm from '@/components/Admin/Settings/Form';
import query from '@/utils/query';
import { handleSubmission } from '@/utils/action';

export const loader: LoaderFunction = ({ context }) => {
  return query({ context, query: settingsQuery });
};

export const action: ActionFunction = async ({ context, request }) => {
  return handleSubmission({
    context,
    request,
    mutation: settingsMutation,
    variables: { id: 'dashboard' },
  });
};

const settingsFields = [
  { label: 'Google Analytics Client ID', prop: 'googleClientId' },
  { label: 'Google Analytics Tracking ID', prop: 'googleTrackingId' },
];

export default function DashboardSettings() {
  const { dashboardSettings } = useLoaderData();
  return (
    <SettingsForm heading="Dashboard Settings" data={dashboardSettings} fields={settingsFields} />
  );
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

const settingsMutation = gql`
  mutation UpdateDashboardSettingsMutation($id: String!, $input: DashboardSettingsInput!) {
    updateDashboardSettings(id: $id, input: $input) {
      id
    }
  }
`;
