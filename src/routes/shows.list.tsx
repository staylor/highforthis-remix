import { useLoaderData } from '@remix-run/react';

import Layout from '@/components/Layout/Layout';
import ShowsList from '@/components/Shows/List';
import type { ShowConnection, ShowsQuery } from '@/types/graphql';

export { loader, meta } from './shows/graphql';

function List() {
  const data = useLoaderData<ShowsQuery>();
  const shows = data.shows as ShowConnection;
  return (
    <Layout>
      <ShowsList shows={shows} />
    </Layout>
  );
}

export default List;
