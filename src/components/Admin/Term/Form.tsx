import { gql } from '@apollo/client';

import { Heading } from '@/components/Admin/styles';
import Form from '@/components/Admin/Form';
import Message from '@/components/Form/Message';
import FeaturedMedia from '@/components/Admin/Form/FeaturedMedia';
import Tags from '@/components/Admin/Form/Tags';
import type { Fields } from '@/types';
import type { Term, TermEdge } from '@/types/graphql';

interface TermFormProps {
  data?: any;
  heading: string;
  buttonLabel: string;
}

export default function TermForm({ data = {}, heading, buttonLabel }: TermFormProps) {
  const { neighborhoods } = data;
  const termFields: Fields = [
    {
      prop: 'taxonomy',
      type: 'hidden',
      render: ({ term, taxonomy }) => term?.taxonomy?.id || taxonomy?.id,
    },
    { label: 'Name', prop: 'name', render: ({ term }) => term?.name },
    {
      label: 'Slug',
      prop: 'slug',
      render: ({ term }) => term?.slug,
      condition: ({ term }) => term?.slug,
      editable: false,
    },
    {
      label: 'Description',
      prop: 'description',
      type: 'textarea',
      render: ({ term }) => term?.description,
    },
    {
      label: 'Capacity',
      prop: 'capacity',
      condition: ({ term }) => term?.taxonomy?.slug === 'venue',
      render: ({ term }) => term?.capacity,
    },
    {
      label: 'Address',
      prop: 'address',
      type: 'textarea',
      condition: ({ term }) => ['venue', 'place'].includes(term?.taxonomy?.slug),
      render: ({ term }) => term?.address,
    },
    {
      label: 'Featured Media',
      prop: 'featuredMedia',
      type: 'custom',
      render: ({ term }) => (term ? <FeaturedMedia media={term.featuredMedia || []} /> : null),
      condition: ({ term }) => ['artist', 'venue', 'place'].includes(term?.taxonomy?.slug),
    },
    {
      label: 'Neighborhood',
      prop: 'neighborhood',
      type: 'select',
      placeholder: '---',
      choices: neighborhoods.edges.map(({ node }: TermEdge) => ({
        label: node.name,
        value: node.id,
      })),
      render: ({ term }) => term?.neighborhood?.id,
      condition: ({ term }) => term?.taxonomy?.slug === 'place',
      position: 'meta',
    },
    {
      label: 'Categories',
      prop: 'categories',
      type: 'custom',
      condition: ({ term }) => term?.taxonomy?.slug === 'place',
      render: ({ term }) => {
        let tags = term?.categories
          ? term.categories.filter((t: Term) => t && t.name).map((t: Term) => t.name)
          : [];
        return <Tags name="categories" tags={tags} />;
      },
      position: 'meta',
    },
    {
      label: 'Cross Streets',
      prop: 'crossStreets',
      type: 'custom',
      condition: ({ term }) => term?.taxonomy?.slug === 'place',
      render: ({ term }) => {
        let tags = term?.crossStreets
          ? term.crossStreets.filter((t: Term) => t && t.name).map((t: Term) => t.name)
          : [];
        return <Tags name="crossStreets" tags={tags} />;
      },
      position: 'meta',
    },
  ];
  return (
    <>
      <Heading>{heading}</Heading>
      <Message text="Term updated." />
      <Form data={data} fields={termFields} buttonLabel={buttonLabel} />
    </>
  );
}

TermForm.fragments = {
  term: gql`
    fragment TermForm_term on Term {
      id
      name
      slug
      description
      taxonomy {
        id
        name
        slug
        plural
      }
      featuredMedia {
        ...FeaturedMedia_media
      }
      ... on Venue {
        capacity
        address
      }
      ... on Place {
        address
        crossStreets {
          id
          name
        }
        categories {
          id
          name
        }
        neighborhood {
          id
          name
        }
      }
    }
    ${FeaturedMedia.fragments.media}
  `,
  taxonomy: gql`
    fragment TermForm_taxonomy on Taxonomy {
      id
      name
      slug
      plural
    }
  `,
  terms: gql`
    fragment TermForm_terms on TermConnection {
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
  `,
};
