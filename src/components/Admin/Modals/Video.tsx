import type { SyntheticEvent } from 'react';
import { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { gql, useQuery } from '@apollo/client';
import debounce from 'lodash.debounce';

import Loading from '@/components/Loading';
import Video from '@/components/Videos/Video';
import type { VideoEdge, VideoThumbnail } from '@/types/graphql';

import CloseButton from './CloseButton';
import { modalClass, frameClass, itemTitleClass } from './styles';

const videosQuery = gql`
  query VideoModalQuery($cursor: String, $first: Int) {
    videos(after: $cursor, first: $first) @cache(key: "modal") {
      edges {
        node {
          id
          ...Video_video
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
  ${Video.fragments.video},
`;

interface SelectedVideoData {
  dataId: string;
  title: string;
  slug: string;
  thumbnails: VideoThumbnail[];
}

interface SelectedVideo {
  videoId: string;
  video: SelectedVideoData;
}

interface VideoModalProps {
  selectVideo: (data: SelectedVideo) => void;
  onClose: (event: SyntheticEvent) => void;
}

function VideoModal({ selectVideo, onClose }: VideoModalProps) {
  const frameRef = useRef(null);
  const { loading, fetchMore, data } = useQuery(videosQuery, {
    variables: {
      first: 50,
    },
  });

  const scrollListener = debounce(() => {
    const { videos } = data;
    const hasNext = videos.pageInfo.hasNextPage;
    if (!frameRef.current || !hasNext || loading) {
      return;
    }
    const ref = frameRef.current as HTMLElement;
    if (ref.scrollTop + ref.offsetHeight >= ref.scrollHeight) {
      fetchMore({
        variables: {
          cursor: videos.pageInfo.endCursor,
        },
      });
    }
  }, 500);

  useEffect(() => {
    if (!frameRef.current) {
      return;
    }

    const frame = frameRef.current as HTMLElement;
    if (data) {
      frame.addEventListener('scroll', scrollListener);
    }

    return () => {
      if (data) {
        frame.removeEventListener('scroll', scrollListener);
      }
    };
  }, [data, scrollListener]);

  const portal = document.getElementById('portal');

  if (!loading && !data) {
    return null;
  }

  if (loading && !data) {
    return ReactDOM.createPortal(
      <div className={modalClass}>
        <Loading />
      </div>,
      portal as HTMLElement
    );
  }

  const { videos } = data;

  return ReactDOM.createPortal(
    <div className={modalClass}>
      <CloseButton className="dashicons dashicons-no" onClick={onClose} />
      <div className={frameClass} ref={frameRef}>
        {videos.edges.map(({ node }: VideoEdge) => {
          const crop = node.thumbnails.find((c) => c.width === 120) as VideoThumbnail;
          return (
            <div
              className="w-30 float-left m-1.5 h-28 cursor-pointer overflow-hidden"
              key={node.id}
              onClick={(e) => {
                e.preventDefault();

                const normalized: SelectedVideoData = {
                  dataId: node.dataId,
                  title: node.title,
                  slug: node.slug,
                  thumbnails: [],
                };
                node.thumbnails.forEach(({ width, height, url }) => {
                  normalized.thumbnails.push({ width, height, url });
                });

                selectVideo({
                  videoId: node.id,
                  video: normalized,
                });
                onClose(e);
              }}
            >
              <img alt="" src={crop.url} />
              <span className={itemTitleClass}>{node.title}</span>
            </div>
          );
        })}
      </div>
    </div>,
    document.getElementById('portal') as HTMLElement
  );
}

export default VideoModal;
