import { gql } from '@apollo/client';

import { Heading } from '@/components/Admin/styles';
import Form from '@/components/Admin/Form';
import Message from '@/components/Form/Message';

const taxonomyFields = [
  { label: 'Name', prop: 'name' },
  { label: 'Slug', prop: 'slug', condition: (term: any) => term.slug, editable: false },
  { label: 'Plural Name', prop: 'plural' },
  {
    label: 'Description',
    prop: 'description',
    type: 'textarea',
  },
];

export default function TaxonomyForm({ data = {}, heading, buttonLabel }: any) {
  return (
    <>
      <Heading>{heading}</Heading>
      <Message text="Taxonomy updated." />
      <Form fields={taxonomyFields} data={data} buttonLabel={buttonLabel} />
    </>
  );
}

TaxonomyForm.fragments = {
  taxonomy: gql`
    fragment TaxonomyForm_taxonomy on Taxonomy {
      id
      name
      plural
      slug
      description
    }
  `,
};
