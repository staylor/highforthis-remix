import { useLoaderData } from '@remix-run/react';

import ShowsList from '@/components/Shows/List';

export { loader, meta } from './shows/graphql';

function List() {
  const { shows } = useLoaderData();
  return <ShowsList shows={shows} />;
}

export default List;
