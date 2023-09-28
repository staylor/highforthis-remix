import { gql } from '@apollo/client';
import { useLoaderData } from '@remix-run/react';
import type { ActionFunction, LoaderFunction } from '@remix-run/server-runtime';

import { Heading, HeaderAdd } from '@/components/Admin/styles';
import ListTable, { RowTitle, RowActions, Thumbnail, usePath } from '@/components/Admin/ListTable';
import Message from '@/components/Form/Message';
import query, { addPageOffset } from '@/utils/query';
import { handleDelete } from '@/utils/action';
import type { Place, Term } from '@/types/graphql';
import type { Columns } from '@/types';

export const loader: LoaderFunction = ({ request, context, params }) => {
  return query({
    request,
    context,
    query: termsQuery,
    variables: addPageOffset(params, { taxonomyId: params.taxonomyId }),
  });
};

export const action: ActionFunction = async ({ request, context }) => {
  return handleDelete({ request, context, mutation: termsMutation });
};

export default function Terms() {
  const path = usePath();
  const { terms } = useLoaderData();

  let columns: Columns = [
    {
      className: 'w-16',
      render: (term: Term) => {
        if (term.featuredMedia && term.featuredMedia[0] && term.featuredMedia[0].type === 'image') {
          return <Thumbnail media={term.featuredMedia[0]} />;
        }

        return null;
      },
    },
    {
      label: 'Name',
      render: (term: Term) => {
        const urlPath = `${path}/${term.id}`;

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
        render: (node: Place) => node.neighborhood && node.neighborhood.name,
      },
      {
        label: 'Cross Streets',
        render: (node: Place) => node.crossStreets.map((s: Term) => s.name).join(', '),
      },
      {
        label: 'Categories',
        render: (node: Place) => node.categories.map((s: Term) => s.name).join(', '),
      }
    );
  }

  return (
    <>
      <Heading>{terms.taxonomy.plural}</Heading>
      <HeaderAdd label={terms.taxonomy.name} />
      <Message param="deleted" text={`Deleted %s ${terms.taxonomy.plural}}.`} />
      <ListTable columns={columns} data={terms} />
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
