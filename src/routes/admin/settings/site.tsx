import { gql } from '@apollo/client';
import type { ActionFunction, LoaderFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';

import query from '@/utils/query';
import SettingsForm from '@/components/Settings/Form';
import { handleSubmission } from '@/components/Settings/utils';

export const loader: LoaderFunction = ({ context }) => {
  return query({ context, query: settingsQuery });
};

export const action: ActionFunction = async ({ context, request }) => {
  return handleSubmission({ context, request, mutation: settingsMutation, id: 'site' });
};

const settingsFields = [
  { label: 'Site Title', prop: 'siteTitle' },
  { label: 'Tagline', prop: 'tagline' },
  { label: 'Site URL', inputType: 'url', prop: 'siteUrl' },
  {
    label: 'Email Address',
    inputType: 'email',
    prop: 'emailAddress',
  },
  {
    label: 'Site Language',
    prop: 'language',
    type: 'select',
    choices: [{ value: 'en-US', label: 'English (United States)' }],
  },
  {
    label: 'Copyright Text',
    prop: 'copyrightText',
    type: 'textarea',
  },
];

export default function SiteSettings() {
  const { siteSettings } = useLoaderData();
  return <SettingsForm heading="General Settings" data={siteSettings} fields={settingsFields} />;
}

const settingsQuery = gql`
  query SiteSettingsQuery {
    siteSettings {
      id
      siteTitle
      tagline
      emailAddress
      language
      siteUrl
      copyrightText
    }
  }
`;

const settingsMutation = gql`
  mutation UpdateSiteSettingsMutation($id: String!, $input: SiteSettingsInput!) {
    updateSiteSettings(id: $id, input: $input) {
      id
    }
  }
`;
