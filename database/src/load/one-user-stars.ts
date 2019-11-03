import { gh } from '../github-client'
import { isNonNullable, printRelationTriple } from '../utils'
import {
  GRAPHQL_USER_STARS_BY_LOGIN_QUERY,
  UserStarsByLoginQuery,
  UserStarsByLoginQueryVariables,
} from '../github/generated'

export const loadUserStarredRepositories = async (login: string) => {
  const { user } = await gh<UserStarsByLoginQuery, UserStarsByLoginQueryVariables>(
    GRAPHQL_USER_STARS_BY_LOGIN_QUERY,
    {
      login,
    },
  )

  if (!user) {
    return ''
  }

  const triples = ((user && user.starredRepositories.edges) || [])
    .filter(isNonNullable)
    .map(({ node: { id } }) => printRelationTriple(user.id, 'stars', id))
    .join('\n')

  return triples
}
