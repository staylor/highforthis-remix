import { gql } from '@apollo/client';

import { Heading } from '@/components/Admin/styles';
import Form from '@/components/Admin/Form';
import Message from '@/components/Form/Message';
import FeaturedMedia from '@/components/Admin/Form/FeaturedMedia';
import type { Fields } from '@/types';
import type { Podcast } from '@/types/graphql';

interface PodcastFormProps {
  data?: Podcast;
  heading: string;
  buttonLabel: string;
}

const podcastFields: Fields = [
  { label: 'Title', prop: 'title' },
  { label: 'Description', prop: 'description', type: 'textarea' },
  {
    label: 'Image',
    prop: 'image',
    type: 'custom',
    render: (p: Podcast) => (
      <FeaturedMedia
        className="mb-6"
        type="image"
        buttonText="Set Image"
        media={p ? [p.image] : []}
      />
    ),
  },
  {
    label: 'Audio',
    prop: 'audio',
    type: 'custom',
    render: (p: Podcast) => (
      <FeaturedMedia
        className="mb-6"
        type="audio"
        buttonText="Set Audio"
        media={p ? [p.audio] : []}
      />
    ),
  },
];

export default function PodcastForm({
  data = {} as Podcast,
  heading,
  buttonLabel,
}: PodcastFormProps) {
  return (
    <>
      <Heading>{heading}</Heading>
      <Message text="Podcast updated." />
      <Form data={data} fields={podcastFields} buttonLabel={buttonLabel} />
    </>
  );
}

PodcastForm.fragments = {
  podcast: gql`
    fragment PodcastForm_podcast on Podcast {
      id
      title
      description
      image {
        id
        ...FeaturedMedia_media
      }
      audio {
        id
        ...FeaturedMedia_media
      }
    }
    ${FeaturedMedia.fragments.media}
  `,
};
