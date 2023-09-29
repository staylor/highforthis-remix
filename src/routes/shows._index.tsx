import { useLoaderData } from '@remix-run/react';

import Shows from '@/components/Shows';
import type { ShowConnection, ShowsQuery } from '@/types/graphql';

export { loader, meta } from './shows/graphql';

function ShowsRoute() {
  const data = useLoaderData<ShowsQuery>();
  const shows = data.shows as ShowConnection;
  return <Shows shows={shows} />;
}

export default ShowsRoute;
