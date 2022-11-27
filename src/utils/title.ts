const titleTemplate = ({ settings, title }: any) => {
  const template = `%s » ${settings.siteTitle}`;
  if (!title) {
    return template.replace('%s', settings.tagline);
  }
  return template.replace('%s', title);
};

export default titleTemplate;
