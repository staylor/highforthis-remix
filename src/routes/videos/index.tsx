import type { MetaFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';

import Videos from '@/components/Videos';
import titleTemplate from '@/utils/title';

export { loader } from './videos.graphql';

export const meta: MetaFunction = ({ parentsData }) => {
  const { settings } = parentsData.root;
  return {
    title: titleTemplate({ title: 'Videos', settings }),
  };
};

export default function VideosByYear() {
  const { videos } = useLoaderData();

  return <Videos videos={videos} />;
}
