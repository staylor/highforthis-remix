import type { ReactNode } from 'react';
import { gql } from '@apollo/client';

import { Heading } from '@/components/Admin/styles';
import Form from '@/components/Admin/Form';
import Message from '@/components/Form/Message';
import type { Fields } from '@/types';
import type { Video } from '@/types/graphql';

interface VideoFormProps {
  data?: Video;
  heading: string;
  buttonLabel: string;
  children?: ReactNode;
}

const videoFields: Fields = [
  { label: 'Title', prop: 'title' },
  { label: 'Slug', prop: 'slug' },
  { label: 'Type', prop: 'dataType' },
  {
    label: 'Playlist',
    prop: 'dataPlaylistIds',
    type: 'custom',
    render: (video: Video) => (
      <a
        className="underline"
        href={`https://www.youtube.com/playlist?list=${video.dataPlaylistIds[0]}`}
      >
        View {video.year} Playlist
      </a>
    ),
  },
];

function VideoForm({ data = {} as Video, heading, buttonLabel, children = null }: VideoFormProps) {
  return (
    <>
      <Heading>{heading}</Heading>
      <Message text="Video updated." />
      {children}
      <Form data={data} fields={videoFields} buttonLabel={buttonLabel} />
    </>
  );
}

VideoForm.fragments = {
  video: gql`
    fragment VideoForm_video on Video {
      id
      title
      slug
      dataType
      thumbnails {
        url
        width
        height
      }
      year
      dataPlaylistIds
    }
  `,
};

export default VideoForm;
