import { Fragment } from 'react';
import cn from 'classnames';
import { gql } from '@apollo/client';

import Link from '@/components/Link';

import { formatDate } from './utils';

const Cell = ({ className, ...props }: any) => (
  <td
    {...props}
    className={cn('border-detail dark:border-detail-dark border py-1 px-2', className)}
  />
);

export default function ShowsGrid({ shows, className }: any) {
  if (!shows || !shows.edges || shows.edges.length === 0) {
    return <p>No recommended shows at this time.</p>;
  }

  const years = {} as { [key: number]: number };
  const months = {} as { [key: string]: number };
  const date = formatDate(new Date());

  return (
    <article className={className}>
      <p className="font-stylized mb-2">{`Today's date is: ${date.formatted}`}</p>
      <table className="w-full border-collapse lg:w-4/5">
        <tbody>
          {shows.edges.map(({ node }: any) => {
            const d = formatDate(new Date(node.date));
            const showRow = (
              <tr key={node.id}>
                <Cell className="font-stylized text-right text-sm">{d.formatted}</Cell>
                <Cell className="text-base">
                  <Link className="text-pink underline" to={`/artist/${node.artist.slug}`}>
                    {node.title || node.artist.name}
                  </Link>
                </Cell>
                <Cell className="text-base font-medium uppercase">
                  <Link
                    className="dark:hover:text-pink hover:text-neutral-800 hover:underline"
                    to={`/venue/${node.venue.slug}`}
                  >
                    {node.venue.name}
                  </Link>
                </Cell>
              </tr>
            );

            if (!years[d.year]) {
              years[d.year] = 1;
              months[`${d.year}${d.month}`] = 1;
              return (
                <Fragment key={`${d.year}${d.month}`}>
                  <tr>
                    <Cell colSpan={3} className="font-stylized font-bold">
                      {d.year}
                    </Cell>
                  </tr>
                  <tr>
                    <Cell colSpan={3} className="font-stylized">
                      {d.monthName}
                    </Cell>
                  </tr>
                  {showRow}
                </Fragment>
              );
            }
            if (!months[`${d.year}${d.month}`]) {
              months[`${d.year}${d.month}`] = 1;
              return (
                <Fragment key={`${d.year}${d.month}`}>
                  <tr>
                    <Cell colSpan={3} className="font-stylized">
                      {d.monthName}
                    </Cell>
                  </tr>
                  {showRow}
                </Fragment>
              );
            }
            return showRow;
          })}
        </tbody>
      </table>
    </article>
  );
}

ShowsGrid.fragments = {
  shows: gql`
    fragment ShowsGrid_shows on ShowConnection {
      edges {
        node {
          id
          title
          date
          artist {
            id
            name
            slug
          }
          venue {
            id
            name
            slug
          }
        }
        cursor
      }
      pageInfo {
        hasNextPage
      }
    }
  `,
};
