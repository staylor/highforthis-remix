import { gql } from '@apollo/client';
import type { LoaderFunction, MetaFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';

import PostTitle from '@/components/Post/PostTitle';
import Content from '@/components/Post/Content';
import query from '@/utils/query';
import titleTemplate from '@/utils/title';
import { uploadUrl } from '@/utils/media';

export const meta: MetaFunction = ({ data, parentsData }) => {
  const { post } = data;
  const { settings } = parentsData.root;
  const { title, featuredMedia, summary } = post;
  const url = `${settings.siteUrl}/post/${post.slug}`;

  let featuredImage;
  if (featuredMedia && featuredMedia.length > 0) {
    const media = featuredMedia[0];
    const crop = media.crops.find((c: any) => c.width === 640);
    featuredImage = uploadUrl(media.destination, crop.fileName);
  }

  return {
    title: titleTemplate({ title, settings }),
    'og:type': 'article',
    'og:title': title,
    'og:description': summary,
    'og:url': url,
    'og:image': featuredImage,
    'twitter:title': title,
    'twitter:description': summary,
    'twitter:url': url,
    'twitter:image': featuredImage,
    'twitter:card': 'summary_large_image',
  };
};

export const loader: LoaderFunction = ({ params, context }) => {
  return query({ context, query: postQuery, variables: { slug: params.slug } });
};

function Post() {
  const { post } = useLoaderData();

  return (
    <article className="w-160 max-w-full">
      <PostTitle>{post.title}</PostTitle>
      <Content contentState={post.contentState} />
    </article>
  );
}

const postQuery = gql`
  query PostQuery($slug: String) {
    post(slug: $slug) {
      id
      title
      slug
      contentState {
        ...Content_contentState
      }
      summary
      featuredMedia {
        destination
        ... on ImageUpload {
          crops {
            fileName
            width
          }
        }
      }
    }
  }
  ${Content.fragments.contentState}
`;

export default Post;
