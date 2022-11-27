import cn from 'classnames';

import Link from '@/components/Link';
import Mailchimp from '@/components/Mailchimp';
import DarkMode from '@/components/DarkMode';
import Navigation from '@/components/Nav';
import Sidebar from '@/components/Sidebar';
import SocialIcons from '@/components/SocialIcons';

export const Html = (props: any) => <html {...props} className="h-full" />;
export const Body = (props: any) => <body {...props} className="h-full" />;

export const Wrapper = ({ settings, socialSettings, shows, children }: any) => {
  const social = <SocialIcons socialSettings={socialSettings} />;
  return (
    <div
      className={cn(
        'mx-auto max-w-screen-xl bg-white p-6 dark:bg-black lg:my-6',
        'transition-colors duration-300 ease-linear'
      )}
    >
      <header className="relative md:mb-6">
        <div className="md:flex md:justify-between">
          <h1 className="font-stylized xs:text-5xl text-center text-4xl font-bold lg:text-left lg:text-7xl">
            <Link to="/">{settings?.siteTitle || 'High for This'}</Link>
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
        <section dangerouslySetInnerHTML={{ __html: settings.copyrightText }} />
      </footer>
    </div>
  );
};
