import type { MetaFunction } from '@remix-run/node';
import { useLoaderData, useParams } from '@remix-run/react';

import Videos from '@/components/Videos';
import TextTitle from '@/components/TextTitle';
import titleTemplate from '@/utils/title';

export { loader } from './videos.graphql';

export const meta: MetaFunction = ({ params, parentsData }) => {
  const { settings } = parentsData.root;
  return {
    title: titleTemplate({ title: `${params.year} » Videos`, settings }),
  };
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
