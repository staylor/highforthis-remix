import { useLoaderData, useParams } from '@remix-run/react';
import type { V2_MetaFunction } from '@remix-run/node';

import Videos from '@/components/Videos';
import TextTitle from '@/components/TextTitle';
import titleTemplate from '@/utils/title';
import { rootData } from '@/utils/rootData';

export { loader } from './videos/graphql';

export const meta: V2_MetaFunction = ({ params, matches }) => {
  const { siteSettings } = rootData(matches);
  return [
    {
      title: titleTemplate({ title: `${params.year} » Videos`, siteSettings }),
    },
  ];
};

export default function VideosByYear() {
  const params = useParams();
  const { videos } = useLoaderData();

  return (
    <>
      <TextTitle>{params.year}</TextTitle>
      <Videos videos={videos} />
    </>
  );
}
