import { useLoaderData } from '@remix-run/react';

import Layout from '@/components/Layout/Layout';
import Shows from '@/components/Shows';
import type { ShowConnection, ShowsQuery } from '@/types/graphql';

export { loader, meta } from './shows/graphql';

function ShowsRoute() {
  const data = useLoaderData<ShowsQuery>();
  const shows = data.shows as ShowConnection;
  return (
    <Layout>
      <Shows shows={shows} />
    </Layout>
  );
}

export default ShowsRoute;
