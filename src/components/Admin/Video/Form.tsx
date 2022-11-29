import { gql } from '@apollo/client';

import { Heading } from '@/components/Admin/styles';
import Form from '@/components/Admin/Form';
import Message from '@/components/Form/Message';

const videoFields = [
  { label: 'Title', prop: 'title' },
  { label: 'Slug', prop: 'slug' },
  { label: 'Type', prop: 'dataType' },
  {
    label: 'Playlist',
    prop: 'dataPlaylistIds',
    type: 'custom',
    render: (video: any) => (
      <a
        className="underline"
        href={`https://www.youtube.com/playlist?list=${video.dataPlaylistIds[0]}`}
      >
        View {video.year} Playlist
      </a>
    ),
  },
];

function VideoForm({ data = {}, heading, buttonLabel, children = null }: any) {
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
