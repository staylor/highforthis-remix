import type { LoaderFunction } from '@remix-run/server-runtime';
import { useLoaderData } from '@remix-run/react';
import { gql } from 'graphql-tag';
import type { MetaFunction } from '@remix-run/node';

import Layout from '@/components/Layout/Layout';
import Video from '@/components/Videos/Video';
import titleTemplate from '@/utils/title';
import query from '@/utils/query';
import { rootData } from '@/utils/rootData';
import type { VideoQuery, Video as VideoType } from '@/types/graphql';

export const meta: MetaFunction = ({ data, matches }) => {
  const { siteSettings } = rootData(matches);
  const { video } = data as VideoQuery;
  return [
    {
      title: titleTemplate({ title: video?.title, siteSettings }),
    },
  ];
};

export const loader: LoaderFunction = async ({ params, context }) => {
  return query({ context, query: videoQuery, variables: { slug: params.slug } });
};

export default function VideoRoute() {
  const data = useLoaderData<VideoQuery>();
  const video = data.video as VideoType;

  return (
    <Layout>
      <Video single video={video} />
    </Layout>
  );
}

const videoQuery = gql`
  query VideoQuery($slug: String) {
    video(slug: $slug) {
      ...Video_video
    }
  }
  ${Video.fragments.video}
`;
