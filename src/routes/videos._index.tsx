import { useLoaderData } from '@remix-run/react';
import type { MetaFunction } from '@remix-run/node';

import Videos from '@/components/Videos';
import titleTemplate from '@/utils/title';
import { rootData } from '@/utils/rootData';

export { loader } from './videos/graphql';

export const meta: MetaFunction = ({ matches }) => {
  const { siteSettings } = rootData(matches);
  return [
    {
      title: titleTemplate({ title: 'Videos', siteSettings }),
    },
  ];
};

export default function VideosByYear() {
  const { videos } = useLoaderData();

  return <Videos videos={videos} />;
}
