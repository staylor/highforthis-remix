import { gql } from '@apollo/client';

import Link from '@/components/Link';
import { uploadUrl } from '@/utils/media';

function Latest({ posts }: any) {
  return (
    <div className="mr-8 w-full md:w-72">
      {posts.edges.map(({ node }: any) => (
        <article className="mb-8 overflow-hidden" key={node.id}>
          <h1 className="mb-2.5 text-xl font-semibold">
            <Link to={`/post/${node.slug}`}>{node.title}</Link>
          </h1>
          {node.featuredMedia &&
            node.featuredMedia.map((media: any) => {
              const crop = media.crops.find((c: any) => c.width === 300);
              return (
                <Link
                  to={`/post/${node.slug}`}
                  key={crop.fileName}
                  className="float-left mr-4 mb-4 block w-2/5 md:float-none md:mr-0 md:w-full"
                >
                  <img alt="" src={uploadUrl(media.destination, crop.fileName)} />
                </Link>
              );
            })}
          <p>{node.summary}</p>
        </article>
      ))}
    </div>
  );
}

export const latestQuery = gql`
  fragment Latest_posts on Query {
    posts(first: 5, status: PUBLISH) @cache(key: "latest") {
      edges {
        node {
          id
          slug
          title
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
    }
  }
`;

export default Latest;
