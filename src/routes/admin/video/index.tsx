import { gql } from '@apollo/client';
import { useLoaderData, useNavigate, useSearchParams } from '@remix-run/react';
import type { ActionFunction, LoaderFunction } from '@remix-run/node';
import debounce from 'lodash.debounce';

import { Heading } from '@/components/Admin/styles';
import ListTable, { RowTitle, RowActions } from '@/components/Admin/ListTable';
import Message from '@/components/Form/Message';
import Select from '@/components/Form/Select';
import Input from '@/components/Form/Input';
import query, { addPageOffset } from '@/utils/query';
import { handleDelete } from '@/utils/action';

const PER_PAGE = 20;
const path = '/admin/video';

const columns = [
  {
    label: 'Title',
    render: (video: any) => (
      <>
        <RowTitle url={`${path}/${video.id}`} title={video.title} />
        <RowActions
          actions={[
            { type: 'edit', url: `${path}/${video.id}` },
            { type: 'view', url: `${path}/${video.slug}` },
          ]}
        />
      </>
    ),
  },
  {
    label: 'Slug',
    prop: 'slug',
  },
  {
    label: 'Year',
    prop: 'year',
  },
  {
    label: 'Date',
    render: (video: any) => {
      const date = new Date(video.publishedAt);
      const formattedDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
      return (
        <>
          Published
          <br />
          {formattedDate}
        </>
      );
    },
  },
];

export const loader: LoaderFunction = ({ request, context, params }) => {
  const url = new URL(request.url);
  const variables = addPageOffset(params, { first: PER_PAGE });
  ['search', 'year'].forEach((key) => {
    const value = url.searchParams.get(key);
    if (value) {
      variables[key] = key === 'year' ? parseInt(value, 10) : value;
    }
  });

  return query({ context, query: videosQuery, variables });
};

export const action: ActionFunction = async ({ request, context }) => {
  return handleDelete({ request, context, mutation: videoMutation });
};

export default function Videos() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { videos } = useLoaderData();

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

  const filters = (
    <Select
      className="mx-2"
      key="year"
      placeholder="Select Year"
      value={searchParams.get('year')}
      choices={videos.years}
      onChange={updateQuery('year')}
    />
  );
  return (
    <>
      <Heading>Videos</Heading>
      <Message param="deleted" text="Deleted %s videos." />
      <div className="float-right">
        <Input
          value={searchParams.get('search')}
          placeholder="Search Videos"
          onChange={updateSearch}
        />
      </div>
      <ListTable
        columns={columns}
        deletable
        filters={filters}
        perPage={PER_PAGE}
        data={videos}
        path={path}
      />
    </>
  );
}

const videosQuery = gql`
  query VideosAdminQuery($first: Int, $after: String, $year: Int, $search: String) {
    videos(first: $first, after: $after, year: $year, search: $search) @cache(key: "admin") {
      count
      years
      edges {
        node {
          id
          title
          slug
          publishedAt
          year
        }
      }
      pageInfo {
        hasNextPage
      }
    }
  }
`;

const videoMutation = gql`
  mutation DeleteVideoMutation($ids: [ObjID]!) {
    removeVideo(ids: $ids)
  }
`;
