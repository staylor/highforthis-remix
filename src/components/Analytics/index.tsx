import { useEffect } from 'react';

export default function Analytics({ googleClientId }: any) {
  useEffect(() => {
    // @ts-ignore
    const gapi = window.gapi || (window.gapi = {});
    gapi.analytics = {
      q: [],
      ready(cb: any) {
        this.q.push(cb);
      },
    };
    const js = document.createElement('script');
    const first = document.getElementsByTagName('script')[0];
    js.src = 'https://apis.google.com/js/platform.js';
    first?.parentNode?.insertBefore(js, first);
    js.onload = () => {
      gapi.load('analytics');
    };

    gapi.analytics.ready(() => {
      const CLIENT_ID = googleClientId;

      gapi.analytics.auth.authorize({
        container: 'auth-button',
        clientid: CLIENT_ID,
      });

      const viewSelector = new gapi.analytics.ViewSelector({
        container: 'view-selector',
      });

      const timeline = new gapi.analytics.googleCharts.DataChart({
        reportType: 'ga',
        query: {
          dimensions: 'ga:date',
          metrics: 'ga:sessions',
          'start-date': '30daysAgo',
          'end-date': 'yesterday',
        },
        chart: {
          type: 'LINE',
          container: 'timeline',
        },
      });

      // Step 6: Hook up the components to work together.

      gapi.analytics.auth.on('success', () => {
        viewSelector.execute();
      });

      viewSelector.on('change', (ids: string[]) => {
        const newIds = {
          query: {
            ids,
          },
        };
        timeline.set(newIds).execute();
      });
    });
  }, []);

  return (
    <>
      <section id="auth-button" />
      <section id="view-selector" />
      <section id="timeline" />
    </>
  );
}
