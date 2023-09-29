import { gql } from '@apollo/client';
import type { LoaderFunction } from '@remix-run/server-runtime';
import { useLoaderData } from '@remix-run/react';
import type { MetaFunction } from '@remix-run/node';

import PostTitle from '@/components/Post/PostTitle';
import Content from '@/components/Post/Content';
import query from '@/utils/query';
import titleTemplate from '@/utils/title';
import { uploadUrl } from '@/utils/media';
import type { ImageUploadCrop } from '@/types/graphql';
import { rootData } from '@/utils/rootData';

export const meta: MetaFunction = ({ data, matches }) => {
  const { post } = data;
  const { siteSettings } = rootData(matches);
  const { title, featuredMedia, summary } = post;
  const url = `${siteSettings.siteUrl}/post/${post.slug}`;

  let featuredImage;
  if (featuredMedia && featuredMedia.length > 0) {
    const media = featuredMedia[0];
    const crop = media.crops.find((c: ImageUploadCrop) => c.width === 640);
    featuredImage = uploadUrl(media.destination, crop.fileName);
  }

  return [
    { title: titleTemplate({ title, siteSettings }) },
    { property: 'og:type', content: 'article' },
    { property: 'og:title', content: title },
    { property: 'og:description', content: summary },
    { property: 'og:url', content: url },
    { property: 'og:image', content: featuredImage },
    { property: 'twitter:title', content: title },
    { property: 'twitter:description', content: summary },
    { property: 'twitter:url', content: url },
    { property: 'twitter:image', content: featuredImage },
    { property: 'twitter:card', content: 'summary_large_image' },
  ];
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
