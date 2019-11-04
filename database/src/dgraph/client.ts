import * as dgraph from 'dgraph-js'
import grpc from 'grpc'

export const createDgraphClientStub = (): dgraph.DgraphClientStub => {
  return new dgraph.DgraphClientStub(
    `${process.env.DGRAPH_HOST}:9080`,
    grpc.credentials.createInsecure(),
  )
}

export const createDgraphClient = (clientStub: dgraph.DgraphClientStub) => {
  return new dgraph.DgraphClient(clientStub)
}
