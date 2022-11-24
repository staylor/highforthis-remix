import cn from 'classnames';
import type { LinksFunction, LoaderFunction, MetaFunction } from '@remix-run/node';
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from '@remix-run/react';

import Link from './components/Link';
import SocialIcons from './components/SocialIcons';
import Mailchimp from './components/Mailchimp';
import DarkMode from './components/DarkMode';
import Navigation from './components/Nav';
import Sidebar from './components/Sidebar';

import client from './server.apollo';
import { appQuery } from './root.graphql';

import tailwindStylesheetUrl from './styles/tailwind.css';

export const links: LinksFunction = () => {
  return [
    { rel: 'preconnect', href: 'https://www.google-analytics.com' },
    { rel: 'preconnect', href: 'https://www.googletagmanager.com' },
    { rel: 'preconnect', href: 'https://storage.googleapis.com' },
    { rel: 'preconnect', href: 'https://use.typekit.net' },
    { rel: 'shortcut icon', href: '/favicon.png' },
    { rel: 'stylesheet', href: 'https://use.typekit.net/tts4dcv.css' },
    { rel: 'stylesheet', href: tailwindStylesheetUrl },
    { rel: 'stylesheet', href: '/fonts/icons/icons.css' },
    { rel: 'canonical', href: '' },
  ];
};

export const meta: MetaFunction = ({ data }) => ({
  charset: 'utf-8',
  title: `${data.settings.tagline} » ${data.settings.siteTitle}`,
  viewport: 'width=device-width,initial-scale=1',
});

export const loader: LoaderFunction = async () => {
  const { data } = await client.query({ query: appQuery });
  return data;
};

export default function App() {
  const { settings, socialSettings, dashboardSettings, shows } = useLoaderData();
  const social = <SocialIcons socialSettings={socialSettings} />;
  return (
    <html lang={settings.language}>
      <head>
        <Meta />
        <Links />
        {dashboardSettings.googleTrackingId && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${dashboardSettings.googleTrackingId}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', '${dashboardSettings.googleTrackingId}');`,
              }}
            />
          </>
        )}
      </head>
      <body>
        <div
          className={cn(
            'mx-auto max-w-screen-xl bg-white p-6 dark:bg-black lg:my-6',
            'transition-colors duration-300 ease-linear'
          )}
        >
          <header className="relative md:mb-6">
            <div className="md:flex md:justify-between">
              <h1 className="font-stylized xs:text-5xl text-center text-4xl font-bold lg:text-left lg:text-7xl">
                <Link to="/">High for This</Link>
              </h1>
              <div className="right-0 top-6 flex items-center justify-center lg:absolute lg:flex-none">
                <DarkMode />
                <nav className="mt-1.5 text-center">{social}</nav>
              </div>
            </div>
            <Navigation />
          </header>
          <div className="justify-between lg:flex">
            <section className="mb-12 grow lg:mr-12">
              <Outlet />
            </section>
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
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <title>Oops!</title>
      </head>
      <body>
        <div>
          <h1>App Error</h1>
          <pre>{error.message}</pre>
          <p>
            Replace this UI with what you want users to see when your app throws uncaught errors.
            The file is at <code>src/root.tsx</code>.
          </p>
        </div>

        <Scripts />
      </body>
    </html>
  );
}
