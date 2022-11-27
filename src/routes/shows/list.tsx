import { useLoaderData } from '@remix-run/react';

import ShowsList from '@/components/Shows/List';

import { loader } from './shows.graphql';

export { loader };

function List() {
  const { shows } = useLoaderData();
  return <ShowsList shows={shows} />;
}

export default List;
