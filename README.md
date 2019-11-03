# github-graph

An experiment with scraping github data to n-triplets, running it in graph database (dgraph) and builing tech stack/simmilar-project recommendation engine.

## Motivation

- JS/TS Ecosystem is huge, moving fast, and there are counless cool things to find - but it takes a lot of effort to stay up to date and find relevant things
- It would be nice to find same-mindend folks, working on cool stuff and follow / collab with them on github - not just listen to twitter gurus
- Example is worth a thousand words, but sometimes short documentation hello-worlds simple does not cut it. There should be a convinient way to find open-source projects using specific tech stak

Also:

- I really like github's new Dependency Stack feature, but I want to use it deeper
- I want to battle-test Dgraph

## Specific goals

As a user I want to:

### What should I be able to find?

#### Library/ tools recommendations

I want to discover relevant tools and libraries

#### Simmilar project recommendations

I want to find projects using specific stack

#### Same-minded users recomendations

I want to find users with simmilar stargazing patterns

I want to find users using simmilar stack in their projects

### How I should be able to look?

#### By github stars/ forks

It's a hard currency in open-source world. And it's convinient. I want to provide some github username and get results based on on currently starred projects

#### By project

I want to point to a github repository and get results based on tech stack used there.

#### By (multiple) dependencies

Without a hassle of actually having project. I want to provide list of libs/ tools and get recommendations based on this.

## Design

### Match params

- **Relevance** - something like cosine simmilarity of data
- **Timestamps** - lets take update/create timestamps into account. E.g. 2 years old stars are less worth than this weeks one. And project abadoned in 2016 are less relevant than actively developed.
- **Dependencies version** - Would be great to find relevant examples for some betas and stuff. Let's somehow calculate distance from semvers.

### Model

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

### Other

- Let's focus on JS/TS. I cannot possibly scrape whole github but focusing on typescript building data bubble by connected repos should be doable

- Let's use RDFs and Dgraph import/export accumulate datasets and not abuse GitHub API

- Let's smartly resolve relationship between dependency and repository. There are monorepos with many packages and packages are published under many names.
