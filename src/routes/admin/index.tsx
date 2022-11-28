import Analytics from '@/components/Analytics';
import { useMatches } from '@remix-run/react';

export default function Dashboard() {
  const [root] = useMatches();
  const { dashboardSettings } = root.data;

  return dashboardSettings.googleClientId ? (
    <Analytics googleClientId={dashboardSettings.googleClientId} />
  ) : (
    'You need a Google Client ID to view analytics.'
  );
}
