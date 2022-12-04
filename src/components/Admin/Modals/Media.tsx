import type { SyntheticEvent } from 'react';
import { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import debounce from 'lodash.debounce';
import { gql, useQuery } from '@apollo/client';

import Loading from '@/components/Loading';
import { uploadUrl } from '@/utils/media';
import type { AudioUpload, ImageUpload, MediaUploadConnection } from '@/types/graphql';
import type { SelectedImage, SelectedImageData } from '@/types/admin';

import CloseButton from './CloseButton';
import { modalClass, frameClass, itemTitleClass } from './styles';

const uploadsQuery = gql`
  query MediaModalQuery($type: String, $first: Int, $cursor: String) {
    uploads(after: $cursor, first: $first, type: $type) @cache(key: "modal") {
      edges {
        node {
          id
          title
          type
          destination
          fileName
          ... on ImageUpload {
            crops {
              width
              fileName
            }
          }
          ... on AudioUpload {
            images {
              width
              fileName
            }
          }
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

type DebouncedFunction = () => void;

interface MediaModalProps {
  type?: string;
  onClose: (e: SyntheticEvent) => void;
  selectAudio: (data: AudioUpload) => void;
  selectImage: (data: SelectedImage) => void;
}

function MediaModal({ type, onClose, selectAudio, selectImage }: MediaModalProps) {
  const frameRef = useRef(null);
  const { loading, fetchMore, data } = useQuery(uploadsQuery, {
    variables: { first: 50, type },
    fetchPolicy: 'cache-and-network',
  });

  const scrollListener = debounce(() => {
    const { uploads } = data;
    const hasNext = uploads.pageInfo.hasNextPage;
    if (!frameRef.current || !hasNext || loading) {
      return;
    }
    const ref = frameRef.current as HTMLElement;
    if (ref.scrollTop + ref.offsetHeight >= ref.scrollHeight) {
      fetchMore({
        variables: {
          cursor: uploads.pageInfo.endCursor,
        },
      });
    }
  }, 500) as DebouncedFunction;

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

  if (!portal || (!loading && !data)) {
    return null;
  }

  if (loading && !data) {
    return ReactDOM.createPortal(
      <div className={modalClass}>
        <Loading />
      </div>,
      portal
    );
  }

  const { uploads } = data as { uploads: MediaUploadConnection };

  return ReactDOM.createPortal(
    <div className={modalClass} id="media-modal">
      <CloseButton className="dashicons dashicons-no" onClick={onClose} />
      <div className={frameClass} ref={frameRef}>
        {uploads.edges.map(({ node }) => {
          const crops =
            type === 'audio' ? (node as AudioUpload).images : (node as ImageUpload).crops;
          const crop = crops?.find((c) => c?.width === 150);
          return (
            <div
              className="w-30 float-left m-1.5 h-28 cursor-pointer overflow-hidden bg-zinc-50"
              key={node.id}
              onClick={(e: SyntheticEvent) => {
                e.preventDefault();

                if (node.type === 'audio') {
                  selectAudio(node);
                } else {
                  const normalized = {
                    destination: node.destination,
                    crops: [],
                  } as SelectedImageData;

                  (node as ImageUpload).crops.forEach(({ width, fileName }) => {
                    normalized.crops.push({ width, fileName });
                  });

                  selectImage({
                    imageId: node.id,
                    image: normalized,
                    size: 'FEATURE',
                  });
                }

                onClose(e);
              }}
            >
              {crop ? <img alt="" src={uploadUrl(node.destination, crop.fileName)} /> : null}
              <span className={itemTitleClass}>{node.title}</span>
            </div>
          );
        })}
      </div>
    </div>,
    portal
  );
}

export default MediaModal;
