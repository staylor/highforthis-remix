import type { MetaFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';

import Videos from '@/components/Videos';
import titleTemplate from '@/utils/title';

import { loader } from './videos.graphql';

export { loader };

export const meta: MetaFunction = ({ data }) => ({
  title: titleTemplate({ title: 'Videos', settings: data.settings }),
});

export default function VideosByYear() {
  const { videos } = useLoaderData();

  return <Videos videos={videos} />;
}
