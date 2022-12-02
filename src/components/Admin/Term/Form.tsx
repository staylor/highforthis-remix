import { gql } from '@apollo/client';

import { Heading } from '@/components/Admin/styles';
import Form from '@/components/Admin/Form';
import Message from '@/components/Form/Message';
import FeaturedMedia from '@/components/Admin/Form/FeaturedMedia';
import Tags from '@/components/Admin/Form/Tags';
import type { Fields } from '@/types';
import type { Place, Term, TermConnection, TermEdge } from '@/types/graphql';

interface TermFormProps {
  data?: Term;
  neighborhoods?: TermConnection;
  heading: string;
  buttonLabel: string;
}

export default function TermForm({
  data = {} as Term,
  neighborhoods = {} as TermConnection,
  heading,
  buttonLabel,
}: TermFormProps) {
  const termFields: Fields = [
    {
      prop: 'taxonomy',
      type: 'hidden',
      render: (term: Term) => term.taxonomy.id,
    },
    { label: 'Name', prop: 'name' },
    {
      label: 'Slug',
      prop: 'slug',
      condition: (term: Term) => term.slug.length > 0,
      editable: false,
    },
    {
      label: 'Description',
      prop: 'description',
      type: 'textarea',
    },
    {
      label: 'Capacity',
      prop: 'capacity',
      condition: (term: Term) => term.taxonomy.slug === 'venue',
    },
    {
      label: 'Address',
      prop: 'address',
      type: 'textarea',
      condition: (term: Term) => ['venue', 'place'].includes(term.taxonomy.slug),
    },
    {
      label: 'Featured Media',
      prop: 'featuredMedia',
      type: 'custom',
      render: (term: Term) => <FeaturedMedia media={term.featuredMedia} />,
      condition: (term: Term) => ['artist', 'venue', 'place'].includes(term.taxonomy.slug),
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
      render: (term: Place) => term.neighborhood && term.neighborhood.id,
      condition: (term: Term) => term.taxonomy.slug === 'place',
      position: 'meta',
    },
    {
      label: 'Categories',
      prop: 'categories',
      type: 'custom',
      condition: (term: Term) => term.taxonomy.slug === 'place',
      render: (term: Place) => {
        let tags = term.categories
          ? term.categories.filter((term: Term) => term && term.name).map((term: Term) => term.name)
          : [];
        return <Tags name="categories" tags={tags} />;
      },
      position: 'meta',
    },
    {
      label: 'Cross Streets',
      prop: 'crossStreets',
      type: 'custom',
      condition: (term: Term) => term.taxonomy.slug === 'place',
      render: (term: Place) => {
        let tags = term.crossStreets
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
