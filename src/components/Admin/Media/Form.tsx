import { gql } from '@apollo/client';

import { Heading } from '@/components/Admin/styles';
import Form from '@/components/Admin/Form';
import Message from '@/components/Form/Message';
import { uploadUrl } from '@/utils/media';
import type { Fields } from '@/types';

import ImageInfo from './ImageInfo';
import AudioInfo from './AudioInfo';
import VideoInfo from './VideoInfo';
import type { MediaUpload, ImageUpload, VideoUpload } from '@/types/graphql';

interface MediaFormProps {
  data?: MediaUpload;
  heading: string;
  buttonLabel: string;
}

const mediaFields: Fields = [
  {
    prop: 'title',
    editable: true,
    className: 'h-9 text-xl py-1 px-2',
    placeholder: 'Enter a title',
  },
  {
    type: 'custom',
    render: (media: MediaUpload) => {
      let mediaInfo = null;
      if (media.type === 'image') {
        let src;
        const imageCrop = (media as ImageUpload).crops.find((c) => c.width === 300);
        if (imageCrop) {
          src = uploadUrl(media.destination, imageCrop.fileName);
        } else {
          src = uploadUrl(media.destination, media.fileName);
        }
        mediaInfo = <img className="my-2.5" src={src} alt="" />;
      } else if (media.type === 'audio') {
        mediaInfo = (
          <audio
            className="mt-2.5 mb-5"
            controls
            src={uploadUrl(media.destination, media.fileName)}
          />
        );
      } else if (media.type === 'video') {
        const video = media as VideoUpload;
        mediaInfo = (
          <video
            className="mt-2.5 mb-5 max-w-screen-sm appearance-none"
            preload="metadata"
            width={video.width || undefined}
            height={video.height || undefined}
            controls
            src={uploadUrl(video.destination, media.fileName)}
          />
        );
      }
      return (
        <>
          <strong>Original name:</strong> {media.originalName}
          {mediaInfo}
        </>
      );
    },
  },
  {
    label: 'Description',
    prop: 'description',
    type: 'textarea',
    editable: true,
    condition: (media: MediaUpload) => media.type !== 'image',
  },
  {
    label: 'Caption',
    prop: 'caption',
    type: 'textarea',
    editable: true,
    condition: (media: MediaUpload) => media.type === 'image',
  },
  {
    label: 'Alternative Text',
    prop: 'altText',
    editable: true,
    condition: (media: MediaUpload) => media.type === 'image',
  },
  {
    type: 'custom',
    render: (media: MediaUpload) => {
      if (media.type === 'audio') {
        return <AudioInfo media={media} />;
      }
      if (media.type === 'video') {
        return <VideoInfo media={media} />;
      }
      if (media.type === 'image') {
        return <ImageInfo media={media as ImageUpload} />;
      }
      return null;
    },
    position: 'info',
  },
];

export default function MediaForm({
  data = {} as MediaUpload,
  heading,
  buttonLabel,
}: MediaFormProps) {
  return (
    <>
      <Heading>{heading}</Heading>
      <Message text="Media updated." />
      <Form data={data} fields={mediaFields} buttonLabel={buttonLabel} />
    </>
  );
}

MediaForm.fragments = {
  media: gql`
    fragment MediaForm_media on MediaUpload {
      id
      type
      title
      destination
      fileName
      fileSize
      originalName
      mimeType
      ... on ImageUpload {
        caption
        altText
        width
        height
        crops {
          fileName
          fileSize
          width
          height
        }
      }
      ... on AudioUpload {
        description
        duration
        images {
          fileName
          fileSize
          width
          height
        }
      }
      ... on VideoUpload {
        width
        height
        description
        duration
      }
      ... on FileUpload {
        description
      }
    }
  `,
};
