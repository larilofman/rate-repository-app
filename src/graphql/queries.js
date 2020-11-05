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

export const AUTHORIZED_USER = gql`
query {
    authorizedUser {
      id
      username
    }
}
`;