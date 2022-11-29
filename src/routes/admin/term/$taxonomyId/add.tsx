import { gql } from '@apollo/client';
import type { ActionFunction, LoaderFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';

import TermForm from '@/components/Admin/Term/Form';
import { handleSubmission } from '@/utils/action';
import query from '@/utils/query';

export const loader: LoaderFunction = ({ context, params }) => {
  return query({ context, query: termQuery, variables: { id: params.taxonomyId } });
};

export const action: ActionFunction = ({ request, context }) => {
  return handleSubmission({
    request,
    context,
    mutation: termMutation,
    createMutation: 'createTerm',
  });
};

export default function TermAdd() {
  const { taxonony, neighborhoods } = useLoaderData();
  return (
    <TermForm
      data={taxonony}
      neighborhoods={neighborhoods}
      heading="Add Term"
      buttonLabel="Add Term"
    />
  );
}

const termQuery = gql`
  query TermTaxonomyQuery($id: ObjID) {
    taxonomy(id: $id) {
      ...TermForm_taxonomy
    }
    neighborhoods: terms(taxonomy: "neighborhood", first: 250) @cache(key: "admin") {
      ...TermForm_terms
    }
  }
  ${TermForm.fragments.taxonomy}
  ${TermForm.fragments.terms}
`;

const termMutation = gql`
  mutation CreateTermMutation($input: CreateTermInput!) {
    createTerm(input: $input) {
      ...TermForm_term
    }
  }
  ${TermForm.fragments.term}
`;
