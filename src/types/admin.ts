import type { ImageUploadCrop, VideoThumbnail } from '@/types/graphql';

type SelectedImageCrop = Pick<ImageUploadCrop, 'width' | 'fileName'>;

export interface SelectedImageData {
  destination: string;
  crops: SelectedImageCrop[];
}

export interface SelectedImage {
  imageId: string;
  image: SelectedImageData;
  size: string;
}

export interface SelectedVideoData {
  dataId: string;
  title: string;
  slug: string;
  thumbnails: VideoThumbnail[];
}

export interface SelectedVideo {
  videoId: string;
  video: SelectedVideoData;
}
