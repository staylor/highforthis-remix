import { gql } from 'graphql-tag';
import type { LoaderFunction } from '@remix-run/server-runtime';
import { useLoaderData } from '@remix-run/react';
import type { MetaFunction } from '@remix-run/node';
import type { ContentState } from 'draft-js';

import PostTitle from '@/components/Post/PostTitle';
import Content from '@/components/Post/Content';
import query from '@/utils/query';
import titleTemplate from '@/utils/title';
import { uploadUrl } from '@/utils/media';
import type { ImageUpload, ImageUploadCrop, Post, PostQuery } from '@/types/graphql';
import { rootData } from '@/utils/rootData';
import Video from '@/components/Videos/Video';

export const meta: MetaFunction = ({ data, matches }) => {
  const { post } = data as PostQuery;
  const { siteSettings } = rootData(matches);
  const { title, featuredMedia, summary, slug } = post as Post;
  const url = `${siteSettings.siteUrl}/post/${slug}`;

  let featuredImage;
  if (featuredMedia && featuredMedia.length > 0) {
    const media = featuredMedia[0] as ImageUpload;
    const crop = media.crops.find((c) => c.width === 640) as ImageUploadCrop;
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

export default function Post() {
  const data = useLoaderData<PostQuery>();
  const post = data.post as Post;
  const contentState = post.contentState as Partial<ContentState>;

  return (
    <article className="w-160 max-w-full">
      <PostTitle>{post.title}</PostTitle>
      <Content contentState={contentState} />
    </article>
  );
}

const postQuery = gql`
  query Post($slug: String) {
    post(slug: $slug) {
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
      featuredMedia {
        destination
        id
        ... on ImageUpload {
          crops {
            fileName
            width
          }
        }
      }
      id
      slug
      summary
      title
    }
  }
  ${Video.fragments.video}
`;
