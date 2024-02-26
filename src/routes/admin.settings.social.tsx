import { gql } from 'graphql-tag';
import type { ActionFunction, LoaderFunction } from '@remix-run/server-runtime';
import { useLoaderData } from '@remix-run/react';

import SettingsForm from '@/components/Admin/Settings/Form';
import query from '@/utils/query';
import { handleSubmission } from '@/utils/action';
import type { SocialSettings, SocialSettingsQuery } from '@/types/graphql';

export const loader: LoaderFunction = ({ request, context }) => {
  return query({ request, context, query: settingsQuery });
};

export const action: ActionFunction = async ({ context, request }) => {
  return handleSubmission({
    context,
    request,
    mutation: settingsMutation,
    variables: { id: 'social' },
  });
};

const settingsFields = [
  { label: 'YouTube Pathname', prop: 'youtubeUsername' },
  { label: 'Twitter Username', prop: 'twitterUsername' },
  { label: 'Instagram Username', prop: 'instagramUsername' },
  { label: 'TikTok Username', prop: 'tiktokUsername' },
];

export default function SocialSettings() {
  const data = useLoaderData<SocialSettingsQuery>();
  const socialSettings = data.socialSettings as SocialSettings;
  return <SettingsForm heading="Social Settings" data={socialSettings} fields={settingsFields} />;
}

const settingsQuery = gql`
  query SocialSettingsQuery {
    socialSettings {
      id
      twitterUsername
      instagramUsername
      youtubeUsername
      tiktokUsername
    }
  }
`;

const settingsMutation = gql`
  mutation UpdateSocialSettingsMutation($id: String!, $input: SocialSettingsInput!) {
    updateSocialSettings(id: $id, input: $input) {
      id
    }
  }
`;
