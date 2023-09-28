import { useLoaderData } from '@remix-run/react';

import Shows from '@/components/Shows';

export { loader, meta } from './shows/graphql';

function ShowsRoute() {
  const { shows } = useLoaderData();
  return <Shows shows={shows} />;
}

export default ShowsRoute;
