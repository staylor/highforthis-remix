/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import debounce from 'lodash.debounce';
import { gql, useQuery } from '@apollo/client';
import Loading from '@/components/Loading';
import { uploadUrl } from '@/utils/media';
import { modalClass, frameClass, itemTitleClass, CloseButton } from './styles';

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

function MediaModal({
  type,
  onClose,
  selectAudio,
  selectImage,
}: {
  type?: string;
  onClose: (e: any) => void;
  selectAudio: (data: any) => void;
  selectImage: (data: any) => void;
}) {
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

    // eslint-disable-next-line consistent-return
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

  const { uploads } = data;

  return ReactDOM.createPortal(
    <div className={modalClass} id="media-modal">
      <CloseButton className="dashicons dashicons-no" onClick={onClose} />
      <div className={frameClass} ref={frameRef}>
        {uploads.edges.map(({ node }: any) => {
          const prop = type === 'audio' ? 'images' : 'crops';
          const crop = node[prop] && node[prop].find((c: any) => c.width === 150);
          return (
            <div
              className="w-30 float-left m-1.5 h-28 cursor-pointer overflow-hidden bg-zinc-50"
              key={node.id}
              onClick={(e) => {
                e.preventDefault();

                if (node.type === 'audio') {
                  selectAudio(node);
                } else {
                  const normalized = {
                    destination: node.destination,
                    crops: [],
                  } as any;

                  node.crops.forEach(({ width, fileName }: any) => {
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
