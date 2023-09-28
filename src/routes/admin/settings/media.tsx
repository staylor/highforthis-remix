import { gql } from '@apollo/client';
import type { ActionFunction, LoaderFunction } from '@remix-run/server-runtime';
import { useLoaderData } from '@remix-run/react';

import SettingsForm from '@/components/Admin/Settings/Form';
import Crops from '@/components/Admin/Settings/Crops';
import query from '@/utils/query';
import { handleSubmission } from '@/utils/action';
import type { MediaSettings } from '@/types/graphql';
import type { Fields } from '@/types';

export const loader: LoaderFunction = ({ request, context }) => {
  return query({ request, context, query: settingsQuery });
};

export const action: ActionFunction = async ({ context, request }) => {
  return handleSubmission({
    context,
    request,
    mutation: settingsMutation,
    variables: { id: 'media' },
  });
};

const settingsFields: Fields = [
  {
    label: 'Crop Sizes',
    prop: 'crops',
    type: 'custom',
    render: (settings: MediaSettings) => <Crops settings={settings} />,
  },
];

export default function MediaSettingsRoute() {
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
