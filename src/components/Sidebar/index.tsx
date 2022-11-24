import { gql } from '@apollo/client';

import Heading from '@/components/Heading';

function Sidebar({ shows }: any) {
  return (
    <aside className="lg:w-60">
      <Heading as="h3" className="text-2xl">
        Upcoming Shows
      </Heading>
      <div className="md:columns-3 lg:columns-1">
        {shows.edges.length === 0 && (
          <div className="mb-3 ml-3 text-sm">
            No recommended shows at this time. Please check back soon.
          </div>
        )}
        {shows.edges.map(({ node }: any) => {
          const d = new Date(node.date);
          const m = d.getMonth() + 1;
          const day = d.getDate();
          return (
            <div className="mb-3 ml-3 text-base" key={node.id}>
              <time className="block font-bold">{`${m < 10 ? `0${m}` : m}/${
                day < 10 ? `0${day}` : day
              }/${d.getFullYear()}`}</time>
              {node.title || node.artist.name}
              <br />
              {node.venue.name}
            </div>
          );
        })}
      </div>
    </aside>
  );
}

export const sidebarQuery = gql`
  fragment Sidebar_shows on Query {
    shows(latest: true, first: 15) @cache(key: "sidebar") {
      edges {
        node {
          id
          title
          artist {
            id
            name
          }
          venue {
            id
            name
          }
          date
        }
      }
    }
  }
`;

export default Sidebar;
