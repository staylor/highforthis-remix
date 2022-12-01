import cn from 'classnames';
import { gql } from '@apollo/client';

import { Heading } from '@/components/Admin/styles';
import Editor from '@/components/Editor';
import Button from '@/components/Button';
import Message from '@/components/Form/Message';
import Form from '@/components/Admin/Form';
import Tags from '@/components/Admin/Form/Tags';
import FeaturedMedia from '@/components/Admin/Form/FeaturedMedia';

export default function PostForm({ data = {}, heading, buttonLabel }: any) {
  const postFields = [
    {
      prop: 'slug',
      render: (post: any) => {
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
      editable: true,
      placeholder: 'Post goes here...',
    },
    {
      label: 'Featured Media',
      prop: 'featuredMedia',
      type: 'custom',
      render: (p: any) => <FeaturedMedia media={p.featuredMedia} />,
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
      render: ({ artists = [] }) => {
        let tags = artists ? artists.filter(Boolean).map((t: any) => t.name) : [];
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
      id
      title
      slug
      contentState {
        ...Editor_contentState
      }
      summary
      status
      featuredMedia {
        ...FeaturedMedia_media
      }
      artists {
        name
      }
      date
    }
    ${Editor.fragments.contentState}
    ${FeaturedMedia.fragments.media}
  `,
};
