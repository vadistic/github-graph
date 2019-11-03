import path from 'path'
import fse from 'fs-extra'

export enum RDFBucket {
  UserStars = 'user-stars',
}

export const saveRDF = async (data: any, type: RDFBucket) => {
  const filename = type + new Date().toISOString()
  const filepath = path.join(process.cwd(), 'rdf', type, filename)

  await fse.writeFile(filepath, data)
}
