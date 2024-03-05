import cn from 'classnames';
import { gql } from 'graphql-tag';

import { Heading } from '@/components/Admin/styles';
import Button from '@/components/Button';
import Message from '@/components/Form/Message';
import Form from '@/components/Admin/Form';
import Tags from '@/components/Admin/Form/Tags';
import FeaturedMedia from '@/components/Admin/Form/FeaturedMedia';
import type { Fields } from '@/types';
import type { Artist, Post } from '@/types/graphql';
import Video from '@/components/Videos/Video';

interface PostFormProps {
  data?: Post;
  heading: string;
  buttonLabel: string;
}

export default function PostForm({ data = {} as Post, heading, buttonLabel }: PostFormProps) {
  const postFields: Fields = [
    {
      prop: 'slug',
      type: 'custom',
      render: (post: Post) => {
        if (!post.slug) {
          return null;
        }

        const url = `/post/${post.slug}`;
        return (
          <Button href={url} target="_blank" rel="noreferrer">
            View Post
          </Button>
        );
      },
      position: 'info',
    },
    {
      prop: 'title',
      className: cn(
        'block font-stylized font-semibold tracking-wide mb-2.5 lg:mb-6 text-4xl lg:text-5xl m-0 p-0 shadow-none border-0 h-12'
      ),
      placeholder: 'Add a Title',
    },
    {
      prop: 'contentState',
      type: 'editor',
      placeholder: 'Post goes here...',
    },
    {
      label: 'Featured Media',
      prop: 'featuredMedia',
      type: 'custom',
      render: (p: Post) => <FeaturedMedia media={p.featuredMedia || []} />,
      position: 'meta',
    },
    {
      label: 'Summary',
      prop: 'summary',
      type: 'textarea',
      position: 'meta',
    },
    {
      label: 'Artists',
      prop: 'artists',
      type: 'custom',
      position: 'meta',
      render: ({ artists = [] }: Post) => {
        const tags = (
          artists ? artists.filter(Boolean).map((t) => (t as Artist).name) : []
        ) as string[];
        return <Tags tags={tags} name="artists" />;
      },
    },
    {
      label: 'Publish Date',
      prop: 'date',
      type: 'date',
      position: 'info',
    },
    {
      label: 'Status',
      prop: 'status',
      type: 'select',
      choices: [
        { label: 'Publish', value: 'PUBLISH' },
        { label: 'Draft', value: 'DRAFT' },
      ],
      position: 'info',
    },
  ];
  return (
    <>
      <Heading>{heading}</Heading>
      <Message text="Post updated." />
      <Form data={data} fields={postFields} buttonLabel={buttonLabel} />
    </>
  );
}

PostForm.fragments = {
  post: gql`
    fragment PostForm_post on Post {
      artists {
        id
        name
      }
      contentState {
        blocks {
          depth
          entityRanges {
            key
            length
            offset
          }
          inlineStyleRanges {
            length
            offset
            style
          }
          key
          text
          type
        }
        entityMap {
          data {
            ... on LinkData {
              href
              target
            }
            ... on EmbedData {
              html
              url
            }
            ... on ImageData {
              image {
                crops {
                  fileName
                  width
                }
                destination
                id
              }
              imageId
              size
            }
            ... on VideoData {
              video {
                ...Video_video
              }
              videoId
            }
          }
          mutability
          type
        }
      }
      date
      featuredMedia {
        ...FeaturedMedia_media
      }
      id
      slug
      status
      summary
      title
    }
    ${FeaturedMedia.fragments.media}
    ${Video.fragments.video}
  `,
};
