import { gql } from '@apollo/client';

import { Heading } from '@/components/Admin/styles';
import Form from '@/components/Admin/Form';
import Message from '@/components/Form/Message';
import Link from '@/components/Link';
import type { Fields } from '@/types';
import type { Artist, Show, TermConnection, Venue } from '@/types/graphql';

interface ShowFormProps {
  data?: Show;
  artists: TermConnection;
  venues: TermConnection;
  heading: string;
  buttonLabel: string;
}

export default function ShowForm({
  data = {} as Show,
  artists,
  venues,
  heading,
  buttonLabel,
}: ShowFormProps) {
  const date = new Date();
  date.setHours(20);
  date.setMinutes(0);
  date.setSeconds(0);

  const showFields: Fields = [
    { label: 'Title', prop: 'title' },
    {
      prop: 'date',
      type: 'date',
      defaultValue: date.getTime(),
    },
    {
      label: 'Artist',
      prop: 'artist',
      type: 'select',
      placeholder: '---',
      choices: artists.edges.map(({ node }: { node: Artist }) => ({
        label: node.name,
        value: node.id,
      })),
      render: (show: Show) => show.artist?.id,
    },
    {
      type: 'custom',
      render: () => (
        <Link className="underline" to={`/terms/${artists.taxonomy.id}/add`}>
          Add Artist
        </Link>
      ),
    },
    {
      label: 'Venue',
      prop: 'venue',
      editable: true,
      type: 'select',
      placeholder: '---',
      choices: venues.edges.map(({ node }: { node: Venue }) => ({
        label: node.name,
        value: node.id,
      })),
      render: (show: Show) => show.venue?.id,
    },
    {
      type: 'custom',
      render: () => (
        <Link className="underline" to={`/terms/${venues.taxonomy.id}/add`}>
          Add Venue
        </Link>
      ),
    },
    { label: 'URL', prop: 'url', inputType: 'url' },
    { label: 'Notes', prop: 'notes', type: 'textarea' },
  ];
  return (
    <>
      <Heading>{heading}</Heading>
      <Message text="Show updated." />
      <Form data={data} fields={showFields} buttonLabel={buttonLabel} />
    </>
  );
}

ShowForm.fragments = {
  show: gql`
    fragment ShowForm_show on Show {
      id
      title
      date
      url
      notes
      artist {
        id
      }
      venue {
        id
      }
    }
  `,
  terms: gql`
    fragment ShowForm_terms on Query {
      artists: terms(taxonomy: "artist", first: 500) @cache(key: "admin") {
        taxonomy {
          id
        }
        edges {
          node {
            id
            name
          }
        }
      }
      venues: terms(taxonomy: "venue", first: 500) @cache(key: "admin") {
        taxonomy {
          id
        }
        edges {
          node {
            id
            name
          }
        }
      }
    }
  `,
};
