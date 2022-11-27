import { uploadUrl } from '@/utils/media';
import titleTemplate from '@/utils/title';

export const metaTags = ({ title, description, url, image, settings }: any) => {
  const featuredImage = uploadUrl(image.destination, image.fileName);

  return {
    title: titleTemplate({ title: title, settings }),
    'og:type': 'article',
    'og:title': title,
    'og:description': description,
    'og:url': url,
    'og:image': featuredImage,
    'twitter:title': title,
    'twitter:description': description,
    'twitter:url': url,
    'twitter:image': featuredImage,
  };
};