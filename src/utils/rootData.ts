export function rootData(matches: { id: string; data?: any }[]) {
  const root = matches.find((match) => match.id === 'root');
  return root?.data || {};
}
