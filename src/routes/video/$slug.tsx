import type { LoaderFunction, MetaFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { gql } from '@apollo/client';

import Video from '@/components/Videos/Video';
import titleTemplate from '@/utils/title';
import query from '@/utils/query';
import { settingsQuery } from '@/utils/settings';

export const meta: MetaFunction = ({ data }) => ({
  title: titleTemplate({ title: data.video.title, settings: data.settings }),
});

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
    ...Settings_site
  }
  ${Video.fragments.video}
  ${settingsQuery}
`;
