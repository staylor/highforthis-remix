import cn from 'classnames';
import type { ReactNode, SyntheticEvent } from 'react';
import { useNavigate, useSearchParams } from '@remix-run/react';
import Video from './Video';
import type { VideoConnection } from '@/types/graphql';

function Videos({ videos }: { videos: VideoConnection }) {
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

  const Button = ({ children, onClick }: { children: ReactNode; onClick: (e: any) => void }) => (
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
      onClick={onClick}
    >
      {children}
    </button>
  );

  const hasPrevious = videos.pageInfo.hasPreviousPage || searchParams.get('after');
  const hasNext = videos.pageInfo.hasNextPage || searchParams.get('before');

  return (
    <>
      {videos.edges.length === 0 && <p>No videos found.</p>}
      {videos.edges.map((edge) => (
        <Video key={edge.node.id} video={edge.node} />
      ))}
      {hasPrevious && <Button onClick={loadPrevious}>PREVIOUS</Button>}
      {hasNext && <Button onClick={loadNext}>NEXT</Button>}
    </>
  );
}

export default Videos;
