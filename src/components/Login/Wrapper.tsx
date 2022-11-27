import { useMatches } from '@remix-run/react';
import type { ReactNode } from 'react';

import { SITE_TITLE } from '@/const';

const Wrapper = ({ children }: { children: ReactNode }) => {
  const [root] = useMatches();
  const { settings } = root?.data || {};
  return (
    <div className="block min-h-screen">
      <div className="m-auto w-80 pt-[8%]">
        <h1 className="font-stylized mb-5 block text-5xl font-bold">
          {settings?.siteTitle || SITE_TITLE}
        </h1>
        {children}
      </div>
    </div>
  );
};

export default Wrapper;
