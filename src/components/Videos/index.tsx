import cn from 'classnames';
import type { SyntheticEvent } from 'react';
import { gql, useQuery } from '@apollo/client';
import Video from './Video';

function Videos({ cacheKey }: any) {
  // These results will already be in the cache
  const { loading, fetchMore, data } = useQuery(
    gql`
      query VideosQuery($first: Int, $after: String, $cacheKey: String) {
        ...Videos_videos
      }
      ${videosQuery}
    `,
    {
      variables: {
        first: 10,
        cacheKey,
      },
    }
  );
  if (loading && !data) {
    return null;
  }

  const { videos } = data;

  const loadMore = (e: SyntheticEvent) => {
    e.preventDefault();

    return fetchMore({
      variables: {
        after: videos.edges[videos.edges.length - 1].cursor,
      },
    });
  };

  return (
    <>
      {videos.edges.length === 0 && <p>No videos found.</p>}
      {videos.edges.map((edge: any) => (
        <Video key={edge.node.id} video={edge.node} />
      ))}
      {videos.pageInfo.hasNextPage && (
        <button
          className={cn(
            'box-border cursor-pointer appearance-none bg-white',
            'border-detail border transition-colors duration-500',
            'block h-8 w-20 text-center text-base uppercase dark:text-black',
            'hover:outline-none focus:outline-none active:outline-none',
            'hover:text-black focus:text-black active:text-black',
            'hover:border-black focus:border-black active:border-black'
          )}
          type="button"
          onClick={loadMore}
        >
          MORE
        </button>
      )}
    </>
  );
}

export const videosQuery = gql`
  fragment Videos_videos on Query {
    videos(first: $first, after: $after) @cache(key: $cacheKey) {
      edges {
        node {
          id
          ...Video_video
        }
        cursor
      }
      pageInfo {
        hasNextPage
      }
    }
  }
  ${Video.fragments.video}
`;

export default Videos;
