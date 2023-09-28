import { gql } from '@apollo/client';

const feedQuery = gql`
  query PodcastFeedQuery {
    podcastSettings {
      title
      description
      managingEditor
      copyrightText
      websiteLink
      feedLink
      itunesName
      itunesEmail
      generator
      language
      explicit
      category
      image {
        id
        destination
        fileName
      }
    }
    podcasts {
      edges {
        node {
          id
          title
          description
          audio {
            id
            destination
            fileName
            fileSize
            duration
          }
          date
        }
      }
    }
  }
`;

export default feedQuery;
