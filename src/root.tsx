import type { LinksFunction, LoaderFunction, MetaFunction } from '@remix-run/node';
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
  useLoaderData,
} from '@remix-run/react';

import { Html, Body, Wrapper } from './components/Layout';

import query from './utils/query';
import titleTemplate from './utils/title';
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
  ];
};
export const meta: MetaFunction = ({ data }) => ({
  charset: 'utf-8',
  title: titleTemplate(data),
  viewport: 'width=device-width,initial-scale=1',
  'twitter:site': `@${data.socialSettings.twitterUsername}`,
  'twitter:creator': `@${data.socialSettings.twitterUsername}`,
});

export const loader: LoaderFunction = async ({ context }) => {
  return query({ context, query: appQuery });
};

export default function App() {
  const data = useLoaderData();
  const { settings, socialSettings, podcastSettings, dashboardSettings, shows } = data;
  return (
    <Html lang={settings.language}>
      <head>
        <Meta />
        <link
          rel="alternate"
          type="application/rss+xml"
          href={podcastSettings.feedLink}
          title={podcastSettings.title}
        />
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
      <Body>
        <Wrapper settings={settings} socialSettings={socialSettings} shows={shows}>
          <Outlet />
        </Wrapper>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </Body>
    </Html>
  );
}

export function CatchBoundary() {
  const data = useLoaderData();
  const caught = useCatch();
  const { settings, socialSettings, shows } = data;
  return (
    <Html lang={settings.language}>
      <head>
        <title>Oops!</title>
        <Meta />
        <Links />
      </head>
      <Body>
        <Wrapper settings={settings} socialSettings={socialSettings} shows={shows}>
          <h1>
            {caught.status} {caught.statusText}
          </h1>
        </Wrapper>
        <Scripts />
      </Body>
    </Html>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  const settings = {} as any;
  const socialSettings = {} as any;
  const shows = { edges: [] } as any;
  return (
    <Html lang={settings.language}>
      <head>
        <meta charSet="utf-8" />
        <title>Oops!</title>
        <Meta />
        <Links />
      </head>
      <Body>
        <Wrapper settings={settings} socialSettings={socialSettings} shows={shows}>
          <pre>{error.message}</pre>
        </Wrapper>
        <Scripts />
      </Body>
    </Html>
  );
}
