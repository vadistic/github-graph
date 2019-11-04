import dotenv from 'dotenv'
import { loadUserStars } from './load/one-user-stars'
import { createDgraphClientStub, createDgraphClient } from './dgraph'

dotenv.config()

const main = async () => {
  const dgraphStub = createDgraphClientStub()
  const client = createDgraphClient(dgraphStub)

  await loadUserStars(client, 'vadistic')

  dgraphStub.close()
}

main()
