import { gql } from '@apollo/client';
import { useLoaderData } from '@remix-run/react';
import type { ActionFunction, LoaderFunction } from '@remix-run/node';

import { Heading, HeaderAdd } from '@/components/Admin/styles';
import ListTable, { RowTitle, RowActions } from '@/components/ListTable';
import Message from '@/components/Form/Message';
import query from '@/utils/query';
import { handleDelete } from '@/utils/action';

const columns = [
  {
    label: 'Name',
    render: (taxonomy: any) => {
      const taxonomyUrl = `/admin/taxonomy/${taxonomy.id}`;
      return (
        <>
          <RowTitle url={taxonomyUrl} title={taxonomy.name} />
          <RowActions
            actions={[
              { type: 'edit', url: taxonomyUrl },
              { type: 'delete', url: taxonomyUrl, ids: [taxonomy.id] },
            ]}
          />
        </>
      );
    },
  },
];

const variables = { first: 1000 };

export const loader: LoaderFunction = ({ context }) => {
  return query({ context, query: taxQuery, variables });
};

export const action: ActionFunction = async ({ request, context }) => {
  return handleDelete({ request, context, mutation: taxMutation });
};

export default function Taxonomies() {
  const { taxonomies } = useLoaderData();
  return (
    <>
      <Heading>Taxonomies</Heading>
      <HeaderAdd to="/admin/taxonomy/add">Add Taxonomy</HeaderAdd>
      <Message param="deleted" text="Deleted %s taxonomies." />
      <ListTable
        columns={columns}
        deletable
        perPage={variables.first}
        data={taxonomies}
        path="/admin/taxonomy"
      />
    </>
  );
}

const taxQuery = gql`
  query TaxonomiesAdminQuery {
    taxonomies @cache(key: "admin") {
      count
      edges {
        node {
          id
          name
          slug
          description
        }
      }
      pageInfo {
        hasNextPage
      }
    }
  }
`;

const taxMutation = gql`
  mutation DeleteTaxonomyMutation($ids: [ObjID]!) {
    removeTaxonomy(ids: $ids)
  }
`;
