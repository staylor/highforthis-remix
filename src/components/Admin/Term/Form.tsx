import { gql } from '@apollo/client';

import { Heading } from '@/components/Admin/styles';
import Form from '@/components/Admin/Form';
import Message from '@/components/Form/Message';
import FeaturedMedia from '@/components/Admin/Form/FeaturedMedia';
import Tags from '@/components/Admin/Form/Tags';

function termFields({ neighborhoods }: any) {
  return [
    {
      prop: 'taxonomy',
      type: 'hidden',
      render: (term: any) => term.taxonomy.id,
    },
    { label: 'Name', prop: 'name' },
    { label: 'Slug', prop: 'slug', condition: (term: any) => term.slug, editable: false },
    {
      label: 'Description',
      prop: 'description',
      type: 'textarea',
    },
    {
      label: 'Capacity',
      prop: 'capacity',
      type: 'text',
      condition: (term: any) => term.taxonomy.slug === 'venue',
    },
    {
      label: 'Address',
      prop: 'address',
      type: 'textarea',
      condition: (term: any) => ['venue', 'place'].includes(term.taxonomy.slug),
    },
    {
      label: 'Featured Media',
      prop: 'featuredMedia',
      type: 'custom',
      render: (term: any) => <FeaturedMedia media={term.featuredMedia} />,
      condition: (term: any) => ['artist', 'venue', 'place'].includes(term.taxonomy.slug),
    },
    {
      label: 'Neighborhood',
      prop: 'neighborhood',
      type: 'select',
      placeholder: '---',
      choices: neighborhoods.edges.map(({ node }: any) => ({
        label: node.name,
        value: node.id,
      })),
      render: (term: any) => term.neighborhood && term.neighborhood.id,
      condition: (term: any) => term.taxonomy.slug === 'place',
      position: 'meta',
    },
    {
      label: 'Categories',
      prop: 'categories',
      type: 'custom',
      condition: (term: any) => term.taxonomy.slug === 'place',
      render: (term: any) => {
        let tags = term.categories
          ? term.categories.filter((term: any) => term && term.name).map((term: any) => term.name)
          : [];
        return <Tags name="categories" tags={tags} />;
      },
      position: 'meta',
    },
    {
      label: 'Cross Streets',
      prop: 'crossStreets',
      type: 'custom',
      condition: (term: any) => term.taxonomy.slug === 'place',
      render: (term: any) => {
        let tags = term.crossStreets
          ? term.crossStreets.filter((t: any) => t && t.name).map((t: any) => t.name)
          : [];
        return <Tags name="crossStreets" tags={tags} />;
      },
      position: 'meta',
    },
  ];
}

export default function TermForm({ data = {}, neighborhoods = {}, heading, buttonLabel }: any) {
  return (
    <>
      <Heading>{heading}</Heading>
      <Message text="Term updated." />
      <Form data={data} fields={termFields({ neighborhoods })} buttonLabel={buttonLabel} />
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
