import type { LoaderFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';

import Latest from '@/components/Latest';
import Divider from '@/components/Divider';
import Videos from '@/components/Videos';

import client from '@/server.apollo';
import { homeQuery } from './index.graphql';

export const loader: LoaderFunction = async () => {
  const { data } = await client.query({
    query: homeQuery,
    variables: { first: 10, cacheKey: 'home-videos' },
  });
  return data;
};

function Home() {
  const { posts, videos } = useLoaderData();
  return (
    <div className="flex flex-col-reverse md:my-0 md:mx-auto md:flex-row lg:m-0">
      <Latest posts={posts} />
      <Divider>
        <Videos videos={videos} cacheKey="home-videos" />
      </Divider>
    </div>
  );
}

export default Home;
