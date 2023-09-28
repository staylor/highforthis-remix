import type { MetaFunction } from '@remix-run/server-runtime';
import { useLoaderData } from '@remix-run/react';

import Videos from '@/components/Videos';
import titleTemplate from '@/utils/title';

export { loader } from './videos.graphql';

export const meta: MetaFunction = ({ parentsData }) => {
  const { siteSettings } = parentsData.root;
  return {
    title: titleTemplate({ title: 'Videos', siteSettings }),
  };
};

export default function VideosByYear() {
  const { videos } = useLoaderData();

  return <Videos videos={videos} />;
}
