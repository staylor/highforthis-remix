import type { LoaderFunction, MetaFunction } from '@remix-run/server-runtime';
import { useLoaderData } from '@remix-run/react';
import { gql } from '@apollo/client';

import Video from '@/components/Videos/Video';
import titleTemplate from '@/utils/title';
import query from '@/utils/query';

export const meta: MetaFunction = ({ data, parentsData }) => {
  const { siteSettings } = parentsData.root;
  return {
    title: titleTemplate({ title: data.video.title, siteSettings }),
  };
};

export const loader: LoaderFunction = async ({ params, context }) => {
  return query({ context, query: videoQuery, variables: { slug: params.slug } });
};

export default function VideoRoute() {
  const { video } = useLoaderData();

  return <Video single video={video} />;
}

const videoQuery = gql`
  query VideoQuery($slug: String) {
    video(slug: $slug) {
      ...Video_video
    }
  }
  ${Video.fragments.video}
`;
