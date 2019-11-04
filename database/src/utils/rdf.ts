import { Scalar } from './types'

export const triple = (prefix?: string) => {
  const one = {
    blank: (alias: string) => two(`_:${alias} `),
    node: (uid: string) => two(`<${uid}> `),
    upsert: (alias: string) => two(`uid(${alias}) `),
  }

  const two = (prev: string) => ({
    pred: (pred: string) => three(prev + (prefix ? `<${prefix}.${pred}>` : `<${pred}> `)),
    type: (name: string) => prev + `<dgraph.type> "${name}" .`,
  })

  const three = (prev: string) => ({
    scalar: (value: Scalar) => prev + (typeof value === 'string' ? `"${value}"` : value) + ` .`,
    node: (uid: string) => prev + `<${uid}> .`,
    blank: (alias: string) => prev + `_:${alias} .`,
  })

  return one
}

export const graphqlToRDF = (obj: any) => {
  if (obj === null || typeof obj !== 'object') {
    throw Error(`needs to be an object`)
  }

  const { id, __typename, ...rest } = obj

  if (!id) {
    throw Error(`id field missing`)
  }

  if (!__typename) {
    throw Error(`__typename field missing`)
  }

  const blank = triple(__typename).blank(id)

  const xid = blank.pred('xid').scalar(id)
  const type = blank.type(__typename)

  const fields = Object.entries(rest).map(([key, val]) => blank.pred(key).scalar(val as Scalar))

  return [type, xid, fields].join('\n')
}
