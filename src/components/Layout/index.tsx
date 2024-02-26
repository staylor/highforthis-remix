import cn from 'classnames';
import type { HtmlHTMLAttributes, HTMLAttributes, PropsWithChildren } from 'react';
import { useMatches } from '@remix-run/react';

import { useRootData } from '@/utils/rootData';

// Find the deepest matched route that has 'layout' set on 'handle'
export const useLayout = () => {
  const matches = useMatches();
  const match = matches.reverse().find(({ handle }) => handle && (handle as RouteHandle).layout);
  return (match?.handle as RouteHandle)?.layout || 'app';
};

export const Boundary = ({ children }: PropsWithChildren) => {
  const layout = useLayout();
  return layout === 'app' ? children : <Wrapper>{children}</Wrapper>;
};

export const Html = (props: HtmlHTMLAttributes<HTMLHtmlElement>) => {
  const { siteSettings } = useRootData();
  return <html lang={siteSettings?.language as string} {...props} className="h-full" />;
};

export const Body = (props: HTMLAttributes<HTMLBodyElement>) => (
  <body {...props} className="h-full" />
);

export const Wrapper = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      'mx-auto max-w-screen-xl bg-white p-6 dark:bg-black',
      'transition-colors duration-300 ease-linear',
      className
    )}
    {...props}
  />
);
