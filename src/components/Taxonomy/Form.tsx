import { gql } from '@apollo/client';

import { FormWrap, Heading } from '@/components/Admin/styles';
import Form from '@/components/Form';
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
      <FormWrap>
        <Form fields={taxonomyFields} data={data} buttonLabel={buttonLabel} />
      </FormWrap>
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
