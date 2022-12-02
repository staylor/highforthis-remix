import type { ImageUpload, SiteSettings } from '@/types/graphql';
import { uploadUrl } from '@/utils/media';
import titleTemplate from '@/utils/title';

interface MetaTags {
  title: string;
  description: string;
  url: string;
  image: ImageUpload;
  siteSettings: SiteSettings;
}

export const metaTags = ({ title, description, url, image, siteSettings }: MetaTags) => {
  const featuredImage = uploadUrl(image.destination, image.fileName);

  return {
    title: titleTemplate({ title: title, siteSettings }),
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
