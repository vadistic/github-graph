import { DgraphClient, Mutation, Request } from 'dgraph-js'
import {
  githubClient,
  GRAPHQL_USER_STARS_BY_LOGIN_QUERY,
  GithubUserStarsByLoginQuery,
  GithubUserStarsByLoginQueryVariables,
} from '../github'
import { isNonNullable, saveRDF, RDFBucket } from '../utils'

export const getUserStarsStatus = async (client: DgraphClient, login: string) => {
  const req = new Request()
  const txn = client.newTxn()

  const query = `
    user(func: eq(User.login, "${login}")) {
      uid
      User.xid
      User.starsStatus
    }
  `

  req.setQuery(`query { ${query} }`)
  req.setCommitNow(true)

  const res = await txn.doRequest(req)
  await txn.discard()

  const user = (res.getJson() as any).user

  return (user && user['User.startsStatus']) || {}
}

export const loadUserStars = async (client: DgraphClient, login: string) => {
  const prevStatus = await getUserStarsStatus(client, login)

  const { pointer } = prevStatus

  const { user } = await githubClient<
    GithubUserStarsByLoginQuery,
    GithubUserStarsByLoginQueryVariables
  >(GRAPHQL_USER_STARS_BY_LOGIN_QUERY, {
    login,
    after: pointer,
  })

  if (!user) {
    return ''
  }

  const txn = client.newTxn()
  const req = new Request()
  const mu = new Mutation()

  const userVariables = [
    `user as var(func: eq(User.xid, "${user.id}")) { User.starsStatus as status }`,
  ]

  const starVariables = ((user && user.starredRepositories.edges) || [])
    .filter(isNonNullable)
    .map(({ node: { id } }, i) => [`repo${i} as var(func: eq(Repository.xid, "${id}"))`])

  const userNquads = [`uid(user) <User.xid> "${user.id}" .`, `uid(user) <dgraph.type> "User" .`]

  const starNquads = ((user && user.starredRepositories.edges) || [])
    .filter(isNonNullable)
    .flatMap(({ node: { id } }, i) => [
      `uid(repo${i}) <Repository.xid> "${id}" .`,
      `uid(repo${i}) <dgraph.type> "Repository" .`,
      `uid(user) <User.stars> uid(repo${i}) .`,
    ])

  const variables = [...userVariables, ...starVariables].join('\n')
  const nquads = [...userNquads, ...starNquads].join('\n')

  mu.setSetNquads(nquads)

  req.setQuery(`query { ${variables} }`)
  req.setMutationsList([mu])
  req.setCommitNow(true)

  await txn.doRequest(req)
  await txn.discard()

  saveRDF({ variables, nquads }, RDFBucket.UserStars)

  return { variables, nquads }
}
