import cn from 'classnames';
import type { SyntheticEvent } from 'react';
import { useNavigate, useSearchParams } from '@remix-run/react';
import { gql } from '@apollo/client';
import Video from './Video';

function Videos({ videos }: any) {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const loadNext = (e: SyntheticEvent) => {
    e.preventDefault();

    navigate('?after=' + videos.edges[videos.edges.length - 1].cursor);
  };

  const loadPrevious = (e: SyntheticEvent) => {
    e.preventDefault();

    navigate('?before=' + videos.edges[0].cursor);
  };

  const Button = ({ children, ...props }: any) => (
    <button
      className={cn(
        'box-border cursor-pointer appearance-none bg-white',
        'border-detail border transition-colors',
        'mr-2 inline-block py-1.5 px-2  text-center text-base uppercase dark:text-black',
        'hover:outline-none focus:outline-none active:outline-none',
        'hover:text-black focus:text-black active:text-black',
        'hover:border-black focus:border-black active:border-black'
      )}
      type="button"
      {...props}
    >
      {children}
    </button>
  );

  const hasPrevious = videos.pageInfo.hasPreviousPage || searchParams.get('after');
  const hasNext = videos.pageInfo.hasNextPage || searchParams.get('before');

  return (
    <>
      {videos.edges.length === 0 && <p>No videos found.</p>}
      {videos.edges.map((edge: any) => (
        <Video key={edge.node.id} video={edge.node} />
      ))}
      {hasPrevious && <Button onClick={loadPrevious}>PREVIOUS</Button>}
      {hasNext && <Button onClick={loadNext}>NEXT</Button>}
    </>
  );
}

export const videosQuery = gql`
  fragment Videos_videos on Query {
    videos(first: $first, last: $last, after: $after, before: $before) @cache(key: $cacheKey) {
      edges {
        node {
          id
          ...Video_video
        }
        cursor
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
      }
    }
  }
  ${Video.fragments.video}
`;

export default Videos;
