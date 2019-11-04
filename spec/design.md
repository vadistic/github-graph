# Design

## Match params

- **Relevance** - something like cosine simmilarity of data
- **Timestamps** - lets take update/create timestamps into account. E.g. 2 years old stars are less worth than this weeks one. And project abadoned in 2016 are less relevant than actively developed.
- **Dependencies version** - Would be great to find relevant examples for some betas and stuff. Let's somehow calculate distance from semvers.

## Model

For traversing, dataset building:

- Mainly stargazers
- Watchers
- Forks/ Forkers
- Contributors

For matching

- Users with their stars
- Users with their repositories
- Repsitories with their dependencies
- Relations betwen dependency and repository
- Timestamps
- Issue/PR/fork/release/commit/contriubutor counts
- Maybe language/ dependency type (NPM)

## Other

- Let's focus on JS/TS. I cannot possibly scrape whole github but focusing on typescript building data bubble by connected repos should be doable

- Let's use RDFs and Dgraph import/export accumulate datasets and not abuse GitHub API

- Let's smartly resolve relationship between dependency and repository. There are monorepos with many packages and packages are published under many names.
