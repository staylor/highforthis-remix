import { gql } from '@apollo/client';
import type { ActionFunction, LoaderFunction } from '@remix-run/server-runtime';
import { useLoaderData } from '@remix-run/react';

import TermForm from '@/components/Admin/Term/Form';
import { handleSubmission } from '@/utils/action';
import query from '@/utils/query';

export const loader: LoaderFunction = ({ request, context, params }) => {
  return query({ request, context, query: termQuery, variables: { id: params.taxonomyId } });
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
  const data = useLoaderData();
  const label = `Add ${data.taxonomy.name}`;
  return <TermForm data={data} heading={label} buttonLabel={label} />;
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
