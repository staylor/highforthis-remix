import { gql } from '@apollo/client';
import type { ActionFunction, LoaderFunction } from '@remix-run/server-runtime';
import { useLoaderData } from '@remix-run/react';

import FeaturedMedia from '@/components/Admin/Form/FeaturedMedia';
import SettingsForm from '@/components/Admin/Settings/Form';
import query from '@/utils/query';
import { handleSubmission } from '@/utils/action';
import type { Podcast } from '@/types/graphql';
import type { Fields } from '@/types';

export const loader: LoaderFunction = ({ request, context }) => {
  return query({ request, context, query: settingsQuery });
};

export const action: ActionFunction = async ({ context, request }) => {
  return handleSubmission({
    context,
    request,
    mutation: settingsMutation,
    variables: { id: 'podcast' },
  });
};

const settingsFields: Fields = [
  { label: 'Podcast Title', prop: 'title', editable: true },
  { label: 'Description', prop: 'description', type: 'textarea' },
  { label: 'Managing Editor', prop: 'managingEditor' },
  {
    label: 'Copyright Text',
    prop: 'copyrightText',
  },
  {
    label: 'Website Link',
    prop: 'websiteLink',
  },
  {
    label: 'Feed Link',
    prop: 'feedLink',
  },
  {
    label: 'iTunes Name',
    prop: 'itunesName',
  },
  {
    label: 'iTunes Email',
    prop: 'itunesEmail',
  },
  {
    label: 'Generator',
    prop: 'generator',
  },
  {
    label: 'Language',
    prop: 'language',
  },
  {
    label: 'Explicit',
    prop: 'explicit',
  },
  {
    label: 'Category',
    prop: 'category',
  },
  {
    label: 'Image',
    prop: 'image',
    type: 'custom',
    render: (p: Podcast) => (
      <FeaturedMedia type="image" buttonText="Set Podcast Image" media={p.image ? [p.image] : []} />
    ),
  },
];

export default function PodcastSettings() {
  const { podcastSettings } = useLoaderData();
  return <SettingsForm heading="Podcast Settings" data={podcastSettings} fields={settingsFields} />;
}

const settingsQuery = gql`
  query PodcastSettingsQuery {
    podcastSettings {
      id
      title
      description
      managingEditor
      copyrightText
      websiteLink
      feedLink
      itunesName
      itunesEmail
      generator
      language
      explicit
      category
      image {
        id
        type
        destination
        fileName
        crops {
          fileName
          width
        }
      }
    }
  }
`;

const settingsMutation = gql`
  mutation UpdatePodcastSettingsMutation($id: String!, $input: PodcastSettingsInput!) {
    updatePodcastSettings(id: $id, input: $input) {
      id
    }
  }
`;
