import { gql } from 'apollo-boost';

export const GET_REPOSITORIES = gql`
query {
  repositories {
      edges
        {
        node
        {
          id
          fullName
          description
          ratingAverage
          reviewCount
          stargazersCount
          forksCount
          ownerAvatarUrl
          language
        }
      }
    }
}
`;

export const GET_REPOSITORY = gql`
  query repository($id: ID!) {
      repository(id: $id) {
        id
        fullName
        description
        ratingAverage
        reviewCount
        stargazersCount
        forksCount
        ownerAvatarUrl
        language
        url
      }
    }
`;



export const AUTHORIZED_USER = gql`
query {
    authorizedUser {
      id
      username
    }
}
`;