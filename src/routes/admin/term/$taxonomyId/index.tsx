import { gql } from '@apollo/client';
import { useLoaderData } from '@remix-run/react';
import type { ActionFunction, LoaderFunction } from '@remix-run/node';

import { Heading, HeaderAdd } from '@/components/Admin/styles';
import ListTable, { RowTitle, RowActions, renderThumbnail } from '@/components/Admin/ListTable';
import Message from '@/components/Form/Message';
import query, { addPageOffset } from '@/utils/query';
import { handleDelete } from '@/utils/action';

const PER_PAGE = 20;

export const loader: LoaderFunction = ({ context, params }) => {
  return query({
    context,
    query: termsQuery,
    variables: addPageOffset(params, { first: PER_PAGE, taxonomyId: params.taxonomyId }),
  });
};

export const action: ActionFunction = async ({ request, context }) => {
  return handleDelete({ request, context, mutation: termsMutation });
};

export default function Terms() {
  const { terms } = useLoaderData();

  let columns = [
    {
      className: 'w-16',
      render: (term: any) => {
        if (term.featuredMedia && term.featuredMedia[0] && term.featuredMedia[0].type === 'image') {
          return renderThumbnail(term.featuredMedia[0], 'crops');
        }

        return null;
      },
    },
    {
      label: 'Name',
      render: (term: any) => {
        const urlPath = `/admin/term/${term.taxonomy.id}/${term.id}`;

        return (
          <>
            <RowTitle url={urlPath} title={term.name} />
            <RowActions
              actions={[
                { type: 'edit', url: urlPath },
                { type: 'delete', url: urlPath, ids: [term.id] },
              ]}
            />
          </>
        );
      },
    },
    {
      label: 'Slug',
      prop: 'slug',
    },
  ];

  if (terms.taxonomy.slug === 'venue') {
    columns.push({
      label: 'Capacity',
      prop: 'capacity',
    });
  }

  if (['venue', 'place'].includes(terms.taxonomy.slug)) {
    columns.push({
      label: 'Address',
      prop: 'address',
    });
  }

  if (['place'].includes(terms.taxonomy.slug)) {
    columns.push(
      {
        label: 'Neighborhood',
        render: (node) => node.neighborhood && node.neighborhood.name,
      },
      {
        label: 'Cross Streets',
        render: (node) => node.crossStreets.map((s: any) => s.name).join(', '),
      },
      {
        label: 'Categories',
        render: (node) => node.categories.map((s: any) => s.name).join(', '),
      }
    );
  }

  return (
    <>
      <Heading>{terms.taxonomy.plural}</Heading>
      <HeaderAdd to={`/admin/term/${terms.taxonomy.id}/add`}>Add {terms.taxonomy.name}</HeaderAdd>
      <Message param="deleted" text={`Deleted %s ${terms.taxonomy.plural}}.`} />
      <ListTable
        columns={columns}
        deletable
        perPage={PER_PAGE}
        data={terms}
        path={`/admin/term/${terms.taxonomy.id}`}
      />
    </>
  );
}

const termsQuery = gql`
  query TermsAdminQuery(
    $first: Int
    $after: String
    $taxonomyId: ObjID!
    $taxonomy: String
    $search: String
  ) {
    terms(
      first: $first
      after: $after
      taxonomyId: $taxonomyId
      taxonomy: $taxonomy
      search: $search
    ) @cache(key: "admin") {
      taxonomy {
        id
        name
        slug
        plural
      }
      count
      edges {
        node {
          id
          name
          slug
          taxonomy {
            id
          }
          featuredMedia {
            ... on ImageUpload {
              type
              destination
              crops {
                fileName
                width
              }
            }
          }
          ... on Venue {
            capacity
            address
          }
          ... on Place {
            address
            neighborhood {
              id
              name
            }
            categories {
              id
              name
            }
            crossStreets {
              id
              name
            }
          }
        }
      }
      pageInfo {
        hasNextPage
      }
    }
  }
`;

const termsMutation = gql`
  mutation DeleteTermMutation($ids: [ObjID]!) {
    removeTerm(ids: $ids)
  }
`;
