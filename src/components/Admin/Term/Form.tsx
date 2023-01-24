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

export default function TermForm({ data = {} as any, heading, buttonLabel }: TermFormProps) {
  const { term, taxonomy, neighborhoods } = data;
  const termFields: Fields = [
    {
      prop: 'taxonomy',
      type: 'custom',
      render: () => <input type="hidden" name="taxonomy" value={taxonomy?.id} />,
    },
    { label: 'Name', render: () => term.name },
    {
      label: 'Slug',
      render: () => term.slug,
      condition: () => term?.slug?.length > 0,
      editable: false,
    },
    {
      label: 'Description',
      render: () => term.description,
      type: 'textarea',
    },
    {
      label: 'Capacity',
      render: () => term.capacity,
      condition: () => term?.taxonomy?.slug === 'venue',
    },
    {
      label: 'Address',
      render: () => term.address,
      type: 'textarea',
      condition: () => ['venue', 'place'].includes(taxonomy?.slug),
    },
    {
      label: 'Featured Media',
      type: 'custom',
      render: () => <FeaturedMedia media={term?.featuredMedia || []} />,
      condition: () => ['artist', 'venue', 'place'].includes(taxonomy?.slug),
    },
    {
      label: 'Neighborhood',
      type: 'select',
      placeholder: '---',
      choices: neighborhoods.edges.map(({ node }: TermEdge) => ({
        label: node.name,
        value: node.id,
      })),
      render: () => term?.neighborhood?.id,
      condition: () => taxonomy?.slug === 'place',
      position: 'meta',
    },
    {
      label: 'Categories',
      type: 'custom',
      condition: () => taxonomy?.slug === 'place',
      render: () => {
        let tags = term?.categories
          ? term.categories.filter((t: Term) => t && t.name).map((t: Term) => t.name)
          : [];
        return <Tags name="categories" tags={tags} />;
      },
      position: 'meta',
    },
    {
      label: 'Cross Streets',
      type: 'custom',
      condition: () => term?.taxonomy?.slug === 'place',
      render: () => {
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
