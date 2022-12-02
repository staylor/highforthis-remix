import { uploadUrl } from '@/utils/media';

interface ThumbnailProps {
  media: any;
  field: string;
}

const Thumbnail = ({ media, field }: ThumbnailProps) => {
  if (!media[field] || !media[field].length) {
    return null;
  }
  const sorted = [...media[field]];
  sorted.sort((a, b) => a.width - b.width);
  return <img className="w-16" src={uploadUrl(media.destination, sorted[0].fileName)} alt="" />;
};

export default Thumbnail;
