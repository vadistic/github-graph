import { GraphQLClient } from 'graphql-request'

export const GITHUB_API_ENDPOINT = `https://api.github.com/graphql`
export const GITHUB_API_TOKEN = process.env.GITHUB_API_TOKEN

const RETRY_LIMIT = 5

const client = new GraphQLClient(GITHUB_API_ENDPOINT, {
  headers: {
    Authorization: `bearer ${GITHUB_API_TOKEN}`,
    Accept: `application/vnd.github.hawkgirl-preview+json`,
  },
})

export const githubClient = async <Query, Variables>(
  query: string,
  variables: Variables,
): Promise<Query> => {
  let retry = 0

  const fetch = async <Query>(): Promise<Query> => {
    const { data, errors } = await client.rawRequest(query, variables)

    if (errors && retry >= RETRY_LIMIT) {
      throw Error(`GraphQLErrors: \n${errors.map(err => err.message).join('\n - ')}`)
    }

    if (errors && retry < RETRY_LIMIT) {
      retry += 1
      return fetch()
    }

    return data
  }

  return fetch()
}
