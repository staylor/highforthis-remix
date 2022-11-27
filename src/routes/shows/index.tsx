import { useLoaderData } from '@remix-run/react';

import ShowsList from '@/components/Shows/List';
import ShowsGrid from '@/components/Shows/Grid';

import { loader } from './shows.graphql';

export { loader };

function Shows() {
  const { shows } = useLoaderData();
  return (
    <>
      <ShowsGrid shows={shows} className="xs:block hidden" />
      <ShowsList shows={shows} className="xs:hidden block" />
    </>
  );
}

export default Shows;
