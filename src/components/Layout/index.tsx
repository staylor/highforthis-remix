import cn from 'classnames';
import type { ReactNode } from 'react';
import { useMatches } from '@remix-run/react';

import { SITE_TITLE } from '@/constants';
import Link from '@/components/Link';
import Navigation from '@/components/Nav';
import Sidebar from '@/components/Sidebar';
import SocialIcons from './SocialIcons';
import DarkMode from './DarkMode';
import Mailchimp from './Mailchimp';

// Find the deepest matched route that has 'layout' set on 'handle'
export const useLayout = () => {
  const matches = useMatches();
  const match = matches.reverse().find(({ handle }) => handle && handle.layout);
  return match?.handle?.layout || 'app';
};

export const Boundary = ({ children }: { children: ReactNode }) => {
  const layout = useLayout();
  return layout === 'app' ? <Layout>{children}</Layout> : <Wrapper>{children}</Wrapper>;
};

export const Html = (props: any) => {
  const [root] = useMatches();
  const { siteSettings } = root.data || {};
  return <html lang={siteSettings?.language} {...props} className="h-full" />;
};

export const Body = (props: any) => <body {...props} className="h-full" />;

export const Wrapper = ({ className, children }: any) => (
  <div
    className={cn(
      'mx-auto max-w-screen-xl bg-white p-6 dark:bg-black',
      'transition-colors duration-300 ease-linear',
      className
    )}
  >
    {children}
  </div>
);

export const Layout = ({ children }: any) => {
  const [root] = useMatches();
  const { siteSettings, socialSettings, shows } = root.data || {};

  const social = <SocialIcons socialSettings={socialSettings} />;
  return (
    <Wrapper className="lg:my-6">
      <header className="relative md:mb-6">
        <div className="md:flex md:justify-between">
          <h1 className="font-stylized xs:text-5xl text-center text-4xl font-bold lg:text-left lg:text-7xl">
            <Link to="/">{siteSettings?.siteTitle || SITE_TITLE}</Link>
          </h1>
          <div className="right-0 top-6 flex items-center justify-center lg:absolute lg:flex-none">
            <DarkMode />
            <nav className="mt-1.5 text-center">{social}</nav>
          </div>
        </div>
        <Navigation />
      </header>
      <div className="justify-between lg:flex">
        <section className="mb-12 grow lg:mr-12">{children}</section>
        <section>
          <Sidebar shows={shows} />
        </section>
      </div>
      <nav className="my-2.5 text-center">{social}</nav>
      <footer className="overflow-hidden text-center text-sm">
        <Mailchimp />
        <section dangerouslySetInnerHTML={{ __html: siteSettings?.copyrightText }} />
      </footer>
    </Wrapper>
  );
};
