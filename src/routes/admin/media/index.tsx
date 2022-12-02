import { gql } from '@apollo/client';
import { useLoaderData, useNavigate, useSearchParams } from '@remix-run/react';
import type { ActionFunction, LoaderFunction } from '@remix-run/node';
import debounce from 'lodash.debounce';

import { Heading, HeaderAdd } from '@/components/Admin/styles';
import Message from '@/components/Form/Message';
import Link from '@/components/Link';
import Input from '@/components/Form/Input';
import Select from '@/components/Form/Select';
import ListTable, { Thumbnail, RowTitle, RowActions, usePath } from '@/components/Admin/ListTable';
import query, { addPageOffset } from '@/utils/query';
import { handleDelete } from '@/utils/action';
import type { MediaUpload } from '@/types/graphql';
import type { Columns } from '@/types';

export const loader: LoaderFunction = ({ request, context, params }) => {
  const url = new URL(request.url);
  const variables = addPageOffset(params);
  ['type', 'mimeType', 'search'].forEach((key) => {
    const value = url.searchParams.get(key);
    if (value) {
      variables[key] = value;
    }
  });
  return query({ context, query: uploadsQuery, variables });
};

export const action: ActionFunction = async ({ request, context }) => {
  return handleDelete({ request, context, mutation: uploadsMutation });
};

export default function Media() {
  const { uploads } = useLoaderData();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const path = usePath();
  const updateQuery = (key: string) => (value: string) => {
    if (value) {
      searchParams.set(key, value);
    } else {
      searchParams.delete(key);
    }
    const qs = searchParams.toString();
    navigate(qs ? `${path}?${qs}` : path);
  };
  const querySearch = updateQuery('search');
  const updateSearch = debounce(querySearch, 600);
  const columns: Columns = [
    {
      className: 'w-16',
      render: (media: MediaUpload) => {
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
      render: (media: MediaUpload) => {
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
      render: (media: MediaUpload) => {
        const search = new URLSearchParams();
        search.set('type', media.type);
        return <Link to={{ pathname: path, search: search.toString() }}>{media.type}</Link>;
      },
    },
    {
      label: 'MIME type',
      render: (media: MediaUpload) => {
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
        className="mx-2"
        placeholder="Select Media Type"
        value={searchParams.get('type')}
        choices={uploads.types.map((type: string) => ({
          value: type,
          label: type.charAt(0).toUpperCase() + type.substring(1),
        }))}
        onChange={updateQuery('type')}
      />
      <Select
        key="mimeType"
        className="mx-2"
        placeholder="Select MIME Type"
        value={searchParams.get('mimeType')}
        choices={uploads.mimeTypes}
        onChange={updateQuery('mimeType')}
      />
    </>
  );
  return (
    <>
      <Heading>Media</Heading>
      <HeaderAdd label="Media" to={`${path}/upload`} />
      <Message param="deleted" text="Deleted %s uploads." />
      <div className="float-right">
        <Input
          value={searchParams.get('search')}
          placeholder="Search Media"
          onChange={updateSearch}
        />
      </div>
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
