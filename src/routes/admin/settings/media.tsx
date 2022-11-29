import { gql } from '@apollo/client';
import type { ActionFunction, LoaderFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';

import SettingsForm from '@/components/Settings/Form';
import Crops from '@/components/Settings/Crops';
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
    variables: { id: 'media' },
  });
};

const settingsFields = [
  {
    label: 'Crop Sizes',
    prop: 'crops',
    type: 'custom',
    render: (settings: any) => <Crops settings={settings} />,
  },
];

export default function MediaSettings() {
  const { mediaSettings } = useLoaderData();
  return <SettingsForm heading="Media Settings" data={mediaSettings} fields={settingsFields} />;
}

const settingsQuery = gql`
  query MediaSettingsQuery {
    mediaSettings {
      id
      crops {
        name
        width
        height
      }
    }
  }
`;

const settingsMutation = gql`
  mutation UpdateMediaSettingsMutation($id: String!, $input: MediaSettingsInput!) {
    updateMediaSettings(id: $id, input: $input) {
      id
    }
  }
`;
