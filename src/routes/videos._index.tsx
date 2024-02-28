import { useLoaderData } from '@remix-run/react';
import type { MetaFunction } from '@remix-run/node';

import Videos from '@/components/Videos';
import titleTemplate from '@/utils/title';
import { rootData } from '@/utils/rootData';
import type { VideoConnection, VideosQuery } from '@/types/graphql';
import { createClientCache } from '@/utils/cache';

export { loader } from './videos/graphql';

export const clientLoader = createClientCache();

export const meta: MetaFunction = ({ matches }) => {
  const { siteSettings } = rootData(matches);
  return [
    {
      title: titleTemplate({ title: 'Videos', siteSettings }),
    },
  ];
};

export default function VideosByYear() {
  const data = useLoaderData<VideosQuery>();
  const videos = data.videos as VideoConnection;

  return <Videos videos={videos} />;
}
