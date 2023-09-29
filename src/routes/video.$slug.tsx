import type { LoaderFunction } from '@remix-run/server-runtime';
import { useLoaderData } from '@remix-run/react';
import { gql } from '@apollo/client';
import type { MetaFunction } from '@remix-run/node';

import Video from '@/components/Videos/Video';
import titleTemplate from '@/utils/title';
import query from '@/utils/query';
import { rootData } from '@/utils/rootData';

export const meta: MetaFunction = ({ data, matches }) => {
  const { siteSettings } = rootData(matches);
  return [
    {
      title: titleTemplate({ title: data.video.title, siteSettings }),
    },
  ];
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
