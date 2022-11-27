const titleTemplate = (data: any) => {
  const { settings, title } = data || {};
  const template = `%s » ${settings?.siteTitle || 'High for This'}`;
  if (!title) {
    return template.replace('%s', settings?.tagline || 'Music as it happens.');
  }
  return template.replace('%s', title);
};

export default titleTemplate;
