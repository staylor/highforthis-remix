import { gql } from '@apollo/client';
import type { ActionFunction, LoaderFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';

import TaxonomyForm from '@/components/Taxonomy/Form';
import query from '@/utils/query';
import { handleSubmission } from '@/utils/action';

export const loader: LoaderFunction = ({ context, params }) => {
  return query({ context, query: taxQuery, variables: { id: params.id } });
};

export const action: ActionFunction = ({ request, context, params }) => {
  return handleSubmission({
    request,
    context,
    mutation: taxMutation,
    variables: { id: params.id },
  });
};

export default function UserEdit() {
  const { taxonomy } = useLoaderData();
  return <TaxonomyForm data={taxonomy} heading="Edit Taxonomy" buttonLabel="Update Taxonomy" />;
}

const taxQuery = gql`
  query TaxonomyEditQuery($id: ObjID) {
    taxonomy(id: $id) {
      ...TaxonomyForm_taxonomy
    }
  }
  ${TaxonomyForm.fragments.taxonomy}
`;

const taxMutation = gql`
  mutation UpdateTaxonomyMutation($id: ObjID!, $input: UpdateTaxonomyInput!) {
    updateTaxonomy(id: $id, input: $input) {
      ...TaxonomyForm_taxonomy
    }
  }
  ${TaxonomyForm.fragments.taxonomy}
`;
