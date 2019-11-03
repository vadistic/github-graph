import { isNonNullable, Scalar } from './types'

export const quotemarkString = <T>(input: T): T =>
  (typeof input === 'string' ? `"` + input + `"` : input) as T

export const printScalarTriple = (id: string, pred: string, scalar: Scalar) =>
  `<${id}> <${pred}> ${quotemarkString(scalar)} .`

// TODO: facets
export const printRelationTriple = (id: string, pred: string, uid: string) =>
  `<${id}> <${pred}> <${uid}> .`

export const objectToRDF = (dtype: string, obj: any) => {
  const { id, ...rest } = obj as Record<string, Scalar | Array<Scalar>>

  if (!id || typeof id !== 'string') {
    throw Error(`object missing valid id\n` + JSON.stringify(obj, null, 2))
  }

  return Object.entries(rest)
    .filter(([, val]) => isNonNullable(val))
    .flatMap(([key, val]) =>
      val instanceof Array
        ? val.map(el => printScalarTriple(id, key, el))
        : printScalarTriple(id, key, val),
    )
    .concat(printScalarTriple(id, `dgraph.type`, dtype))
    .join('\n')
}

export const arrToRDF = (dtype: string, arr: any[]) =>
  arr.map((obj, i) => objectToRDF(dtype + i, obj)).join('\n\n')
