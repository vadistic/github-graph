import dotenv from 'dotenv'
import { loadUserStarredRepositories } from './load/one-user-stars'
import { saveRDF, RDFBucket } from './utils/save-rdf'

dotenv.config()

const main = async () => {
  const res = await loadUserStarredRepositories('vadistic')

  saveRDF(res, RDFBucket.UserStars)
}

main()
