import type { ClientLoaderFunctionArgs } from '@remix-run/react';

export const ONE_MINUTE = 60 * 1000;

interface CacheWithExpiry {
  data: any;
  expiry: number;
}

export const createClientCache = (maxAge?: number) => {
  const expiry = maxAge || ONE_MINUTE;
  const cache: CacheWithExpiry = { expiry, data: undefined };
  const clientLoader = async ({ serverLoader }: ClientLoaderFunctionArgs) => {
    const now = Date.now();
    if (cache.data && now < cache.expiry) {
      return cache.data;
    }
    const data = await serverLoader();
    cache.data = data;
    cache.expiry = now + expiry;
    return data;
  };
  clientLoader.hydrate = true;
  return clientLoader;
};
