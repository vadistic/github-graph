import { gql } from '../../utils'
export const REPOSITORY_FRAGMENT = gql`
  fragment RepositoryFragment on Repository {
    id
    name
    owner {
      id
    }
    watchers {
      totalCount
    }
    stargazers {
      totalCount
    }
    forks {
      totalCount
    }
    issues {
      totalCount
    }
  }
`
export const GRAPHQL_REPOSITORY_BASE_QUERY = gql`
  query RepositoryBaseQuery($ids: [ID!]!) {
    nodes(ids: $ids) {
      ... on Repository {
        ...RepositoryFragment
      }
    }
  }
  ${REPOSITORY_FRAGMENT}
`
export const GRAPHQL_USER_STARS_BY_LOGIN_QUERY = gql`
  query UserStarsByLoginQuery($login: String!, $after: String) {
    user(login: $login) {
      id
      starredRepositories(
        first: 100
        after: $after
        orderBy: { field: STARRED_AT, direction: DESC }
      ) {
        edges {
          starredAt
          node {
            id
          }
        }
        pageInfo {
          startCursor
          endCursor
          hasNextPage
        }
      }
    }
  }
`
export const GRAPHQL_USER_STARS_BY_ID_QUERY = gql`
  query UserStarsByIdQuery($id: ID!, $after: String) {
    node(id: $id) {
      ... on User {
        id
        starredRepositories(
          first: 100
          after: $after
          orderBy: { field: STARRED_AT, direction: DESC }
        ) {
          edges {
            starredAt
            node {
              id
            }
          }
          pageInfo {
            startCursor
            endCursor
            hasNextPage
          }
        }
      }
    }
  }
`
