import type { MutableRefObject } from 'react';
import { useRef, useState, useEffect } from 'react';
import { useFetcher } from '@remix-run/react';
import debounce from 'lodash.debounce';
import type { TIncomingRelay } from '@apollo/client/utilities/policies/pagination';

type DebouncedFunction = () => void;

export default function useInfiniteScroll<T>(ref: MutableRefObject<null>, basePath: string) {
  const firstFetch = useRef({ [basePath]: false });
  const fetcher = useFetcher();
  const [connection, setConnection] = useState({} as TIncomingRelay<T>);

  const scrollListener = debounce(() => {
    const { pageInfo } = connection;
    if (!ref.current || !pageInfo?.hasNextPage) {
      return;
    }
    const elem = ref.current as HTMLElement;
    if (elem.scrollTop + elem.offsetHeight >= elem.scrollHeight) {
      fetcher.load(`${basePath}/${pageInfo.endCursor}`);
    }
  }, 500) as DebouncedFunction;

  useEffect(() => {
    if (!firstFetch.current[basePath]) {
      firstFetch.current[basePath] = true;
      fetcher.load(`${basePath}?index`);
    }
  }, [fetcher, basePath]);

  useEffect(() => {
    if (fetcher.data) {
      const [key] = Object.keys(fetcher.data);
      if (connection.edges) {
        const { edges, pageInfo } = fetcher.data[key];
        const newData = {
          ...(fetcher.data as AppData)[key],
          edges: [...connection.edges, ...edges],
          pageInfo,
        };
        setConnection(newData);
      } else {
        setConnection(fetcher.data[key]);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetcher.data]);

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    const elem = ref.current as HTMLElement;
    if (connection.edges) {
      elem.addEventListener('scroll', scrollListener);
    }

    return () => {
      if (connection.edges) {
        elem.removeEventListener('scroll', scrollListener);
      }
    };
  }, [ref, connection.edges, scrollListener]);

  return { fetcher, connection };
}
