import type { ShowConnection } from '@/types/graphql';

import ShowsList from './List';
import ShowsGrid from './Grid';

function Shows({ shows }: { shows: ShowConnection }) {
  return (
    <>
      <ShowsGrid shows={shows} className="xs:block hidden" />
      <ShowsList shows={shows} className="xs:hidden block" />
    </>
  );
}

Shows.fragments = ShowsGrid.fragments;

export default Shows;
