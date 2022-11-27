import { gql } from '@apollo/client';

import { uploadUrl } from '@/utils/media';

function FeaturedMedia({ featuredMedia, alt = '', cropSize = 640, className }: any) {
  if (!featuredMedia) {
    return null;
  }

  return (
    <>
      {featuredMedia.filter(Boolean).map((media: any) => {
        const crop = media.crops.find((c: any) => c.width === cropSize);
        return (
          <img
            key={crop.fileName}
            className={className || 'mb-4'}
            alt={alt}
            loading="lazy"
            src={uploadUrl(media.destination, crop.fileName)}
          />
        );
      })}
    </>
  );
}

FeaturedMedia.fragments = {
  featuredMedia: gql`
    fragment FeaturedMedia_featuredMedia on MediaUpload {
      destination
      ... on ImageUpload {
        crops {
          fileName
          width
        }
      }
    }
  `,
};

export default FeaturedMedia;
