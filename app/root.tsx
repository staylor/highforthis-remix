import type { LinksFunction, LoaderFunction, MetaFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration } from '@remix-run/react';

import tailwindStylesheetUrl from './styles/tailwind.css';

export const links: LinksFunction = () => {
  return [
    { rel: 'preconnect', href: 'https://www.google-analytics.com' },
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
  title: data.title,
  viewport: 'width=device-width,initial-scale=1',
});

type LoaderData = {
  title: string;
};

export const loader: LoaderFunction = async ({ request }) => {
  return json<LoaderData>({
    title: 'High for This',
  });
};

export default function App() {
  return (
    <html lang="en" className="h-full">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="h-full">
        <Outlet />
        <ScrollRestoration />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.__APOLLO_STATE__ = '<!--apollo-state-->';`,
          }}
        />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
