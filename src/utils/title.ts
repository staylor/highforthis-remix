import { SITE_TITLE, SITE_TAGLINE } from '@/const';

const titleTemplate = (data: any) => {
  const { settings, title } = data || {};
  const template = `%s » ${settings?.siteTitle || SITE_TITLE}`;
  if (!title) {
    return template.replace('%s', settings?.tagline || SITE_TAGLINE);
  }
  return template.replace('%s', title);
};

export default titleTemplate;
