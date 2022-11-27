import type { LoaderFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';

import Latest from '@/components/Latest';
import Divider from '@/components/Divider';
import Videos from '@/components/Videos';
import query from '@/utils/query';

import { homeQuery } from './index.graphql';

export const loader: LoaderFunction = async ({ request, context }) => {
  const url = new URL(request.url);
  const variables = { cacheKey: 'home-videos' } as any;
  const after = url.searchParams.get('after');
  const before = url.searchParams.get('before');
  if (after) {
    variables.first = 10;
    variables.after = after;
  } else if (before) {
    variables.last = 10;
    variables.before = before;
  } else {
    variables.first = 10;
  }
  return query({
    context,
    query: homeQuery,
    variables,
  });
};

function Home() {
  const { posts, videos } = useLoaderData();
  return (
    <div className="flex flex-col-reverse md:my-0 md:mx-auto md:flex-row lg:m-0">
      <Latest posts={posts} />
      <Divider>
        <Videos videos={videos} />
      </Divider>
    </div>
  );
}

export default Home;
