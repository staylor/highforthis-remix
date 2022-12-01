import { gql } from '@apollo/client';
import { useLoaderData, useParams, useSearchParams } from '@remix-run/react';
import type { ActionFunction, LoaderFunction } from '@remix-run/node';

import { Heading, HeaderAdd } from '@/components/Admin/styles';
import Message from '@/components/Form/Message';
import Link from '@/components/Link';
import Input from '@/components/Form/Input';
import Select from '@/components/Form/Select';
import ListTable, { Thumbnail, RowTitle, RowActions, usePath } from '@/components/Admin/ListTable';
import query, { addPageOffset } from '@/utils/query';
import { handleDelete } from '@/utils/action';

export const loader: LoaderFunction = ({ context, params }) => {
  return query({
    context,
    query: uploadsQuery,
    variables: addPageOffset(params),
  });
};

export const action: ActionFunction = async ({ request, context }) => {
  return handleDelete({ request, context, mutation: uploadsMutation });
};

export default function Media() {
  const { uploads } = useLoaderData();
  const params = useSearchParams();
  const path = usePath();
  const columns = [
    {
      className: 'w-16',
      render: (media: any) => {
        if (media.type === 'audio') {
          return <Thumbnail media={media} field="images" />;
        }

        if (media.type === 'image') {
          return <Thumbnail media={media} field="crops" />;
        }

        return null;
      },
    },
    {
      className: 'w-[60%]',
      label: 'Title',
      render: (media: any) => {
        const editUrl = `${path}/${media.id}`;
        return (
          <>
            <RowTitle url={editUrl} title={media.title} subtitle={media.originalName} />
            <RowActions
              actions={[
                { type: 'edit', url: editUrl },
                { type: 'delete', url: editUrl, ids: [media.id] },
              ]}
            />
          </>
        );
      },
    },
    {
      label: 'Type',
      render: (media: any) => {
        const search = new URLSearchParams();
        search.set('type', media.type);
        return <Link to={{ pathname: path, search: search.toString() }}>{media.type}</Link>;
      },
    },
    {
      label: 'MIME type',
      render: (media: any) => {
        const search = new URLSearchParams();
        search.set('mimeType', media.mimeType);
        return <Link to={{ pathname: path, search: search.toString() }}>{media.mimeType}</Link>;
      },
    },
  ];
  const filters = (
    <>
      <Select
        key="type"
        placeholder="Select Media Type"
        value={params.type}
        choices={uploads.types.map((type: string) => ({
          value: type,
          label: type.charAt(0).toUpperCase() + type.substring(1),
        }))}
        onChange={updateType}
      />
      <Select
        key="mimeType"
        placeholder="Select MIME Type"
        value={params.mimeType}
        choices={uploads.mimeTypes}
        onChange={updateMimeType}
      />
    </>
  );
  return (
    <>
      <Heading>Media</Heading>
      <HeaderAdd label="Media" />
      <Message param="deleted" text="Deleted %s uploads." />
      <ListTable columns={columns} filters={filters} data={uploads} />
    </>
  );
}

const uploadsQuery = gql`
  query UploadsAdminQuery(
    $first: Int
    $after: String
    $type: String
    $mimeType: String
    $search: String
  ) {
    uploads(first: $first, after: $after, type: $type, mimeType: $mimeType, search: $search)
      @cache(key: "admin") {
      types
      mimeTypes
      count
      edges {
        node {
          id
          type
          mimeType
          title
          originalName
          destination
          ... on ImageUpload {
            crops {
              fileName
              width
            }
          }
          ... on AudioUpload {
            images {
              fileName
              width
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

const uploadsMutation = gql`
  mutation DeleteMediaMutation($ids: [ObjID]!) {
    removeMediaUpload(ids: $ids)
  }
`;
