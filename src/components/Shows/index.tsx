import ShowsList from './List';
import ShowsGrid from './Grid';

function Shows({ shows }: any) {
  return (
    <>
      <ShowsGrid shows={shows} className="xs:block hidden" />
      <ShowsList shows={shows} className="xs:hidden block" />
    </>
  );
}

Shows.fragments = ShowsGrid.fragments;

export default Shows;
