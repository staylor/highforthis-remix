import { useMatches } from '@remix-run/react';

import Analytics from '@/components/Analytics';

export default function Dashboard() {
  const [root] = useMatches();
  const { dashboardSettings } = root.data;

  return dashboardSettings.googleClientId ? (
    <Analytics googleClientId={dashboardSettings.googleClientId} />
  ) : (
    'You need a Google Client ID to view analytics.'
  );
}
