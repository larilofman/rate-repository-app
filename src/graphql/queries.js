import { gql } from 'apollo-boost';

export const GET_REPOSITORIES = gql`
query repositories($orderBy: AllRepositoriesOrderBy, $orderDirection: OrderDirection, $searchKeyword: String, $first: Int, $after: String) {
      repositories(orderBy: $orderBy, orderDirection: $orderDirection, searchKeyword: $searchKeyword, first: $first, after: $after) {
      edges {
        node {
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
        cursor
      }
      pageInfo {
        endCursor
        startCursor
        totalCount
        hasNextPage
      }
    }
  }
`;

export const GET_REPOSITORY = gql`
  query repository($id: ID!, $first: Int, $after: String) {
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
        reviews (first: $first, after: $after){
          edges {
            node {
              id
              text
              rating
              createdAt
              repositoryId
              user {
                id
                username
              }
            }
            cursor
          }
          pageInfo {
            endCursor
            startCursor
            totalCount
            hasNextPage
          }
        }
      }
    }
`;

export const GET_AUTHORIZED_USER = gql`
query getAuthorizedUser($includeReviews: Boolean = false, $first: Int, $after: String) {
    authorizedUser {
      id
      username
      reviews (first: $first, after: $after) @include(if: $includeReviews) {
        edges {
          node {
            id
              text
              rating
              createdAt
              repositoryId
              repository {
                name
                ownerName
              }
              user {
                id
                username
              }
          }
          cursor
        }
        pageInfo {
          endCursor
          startCursor
          totalCount
          hasNextPage
        }
      }
    }
  }
`;
