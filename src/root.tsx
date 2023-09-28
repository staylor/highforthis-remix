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

import { Html, Body, Boundary, useLayout } from './components/Layout';
import { TWITTER_USERNAME } from './constants';
import query from './utils/query';
import titleTemplate from './utils/title';
import { appQuery } from './root.graphql';
import mainStylesheetUrl from './styles/build/main.css';
import adminStylesheetUrl from './styles/build/admin.css';
import type { DashboardSettings, PodcastSettings } from './types/graphql';

export const links: LinksFunction = () => {
  return [
    { rel: 'preconnect', href: 'https://storage.googleapis.com' },
    { rel: 'preconnect', href: 'https://use.typekit.net' },
    { rel: 'shortcut icon', href: '/favicon.png', type: 'image/png' },
    { rel: 'stylesheet', href: 'https://use.typekit.net/tts4dcv.css' },
    { rel: 'stylesheet', href: '/fonts/icons/icons.css' },
  ];
};
export const meta: MetaFunction = ({ data }) => {
  const username = data?.socialSettings?.twitterUsername || TWITTER_USERNAME;
  return {
    charset: 'utf-8',
    title: titleTemplate(data),
    viewport: 'width=device-width,initial-scale=1',
    'twitter:site': `@${username}`,
    'twitter:creator': `@${username}`,
  };
};

export const loader: LoaderFunction = async ({ request, context }) => {
  return query({ request, context, query: appQuery });
};

interface AppLinksData {
  dashboardSettings: DashboardSettings;
  podcastSettings: PodcastSettings;
}

const AppLinks = ({ data }: { data: AppLinksData }) => {
  const { podcastSettings, dashboardSettings } = data;
  return (
    <>
      <link rel="preconnect" href="https://www.google-analytics.com" />
      <link rel="preconnect" href="https://www.googletagmanager.com" />
      {podcastSettings.feedLink && podcastSettings.title && (
        <link
          rel="alternate"
          type="application/rss+xml"
          href={podcastSettings.feedLink}
          title={podcastSettings.title}
        />
      )}
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
    </>
  );
};

export default function Root() {
  const layout = useLayout();
  const data = useLoaderData();
  return (
    <Html>
      <head>
        <Meta />
        <Links />
        {layout !== 'app' && <link rel="stylesheet" href="/css/dashicons.min.css" />}
        {layout === 'admin' && <link rel="stylesheet" href="/css/Draft.css" />}
        {layout !== 'admin' && <link rel="stylesheet" href={mainStylesheetUrl} />}
        {layout === 'admin' && <link rel="stylesheet" href={adminStylesheetUrl} />}
        {layout === 'app' && <AppLinks data={data} />}
      </head>
      <Body>
        <Boundary>
          <Outlet />
        </Boundary>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </Body>
    </Html>
  );
}

export function CatchBoundary() {
  const caught = useCatch();
  return (
    <Html>
      <head>
        <title>Oops!</title>
        <Meta />
        <Links />
      </head>
      <Body>
        <Boundary>
          <h1>
            {caught.status} {caught.statusText}
          </h1>
        </Boundary>
        <Scripts />
      </Body>
    </Html>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  return (
    <Html>
      <head>
        <meta charSet="utf-8" />
        <title>Oops!</title>
        <Meta />
        <Links />
      </head>
      <Body>
        <Boundary>
          <pre>{error.message}</pre>
        </Boundary>
        <Scripts />
      </Body>
    </Html>
  );
}
