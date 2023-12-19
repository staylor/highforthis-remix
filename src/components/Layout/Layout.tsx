import type { PropsWithChildren } from 'react';

import { SITE_TITLE } from '@/constants';
import Link from '@/components/Link';
import Navigation from '@/components/Nav';
import Sidebar from '@/components/Sidebar';
import type { ShowConnection, SocialSettings } from '@/types/graphql';
import { useRootData } from '@/utils/rootData';

import SocialIcons from './SocialIcons';
import DarkMode from './DarkMode';
import Mailchimp from './Mailchimp';
import Wrapper from './Wrapper';

import '@/styles/main.css';

const Layout = ({ children }: PropsWithChildren) => {
  const { siteSettings, socialSettings, shows } = useRootData();

  const social = <SocialIcons socialSettings={socialSettings as SocialSettings} />;
  return (
    <Wrapper className="lg:my-6">
      <header className="relative md:mb-6">
        <div className="md:flex md:justify-between">
          <h1 className="text-center font-stylized text-4xl font-bold xs:text-5xl lg:text-left lg:text-7xl">
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
          <Sidebar shows={shows as ShowConnection} />
        </section>
      </div>
      <nav className="my-2.5 text-center">{social}</nav>
      <footer className="overflow-hidden text-center text-sm">
        <Mailchimp />
        <section dangerouslySetInnerHTML={{ __html: siteSettings?.copyrightText as string }} />
      </footer>
    </Wrapper>
  );
};

export default Layout;
