import path from 'path'
import fse from 'fs-extra'

export enum RDFBucket {
  UserStars = 'user-stars',
}

export const saveRDF = async (data: any, type: RDFBucket) => {
  const timestamp = new Date().toISOString()

  const filename = `${type}-${timestamp}.json`

  const filepath = path.join(process.cwd(), 'rdf', type, filename)

  await fse.writeJSON(filepath, data)
}
