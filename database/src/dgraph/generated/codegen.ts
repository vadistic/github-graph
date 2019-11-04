/* eslint-disable */
export type Maybe<T> = T | null
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  DateTime: string
}

export type DgraphDependency = {
  __typename?: 'Dependency'
  id: Scalars['ID']
  packageName: Scalars['String']
  requirements: Scalars['String']
  type?: Maybe<DgraphDependencyType>
}

export enum DgraphDependencyType {
  Dep = 'DEP',
  Dev = 'DEV',
  Peer = 'PEER',
}

export enum DgraphLanguageType {
  TypeScript = 'TypeScript',
  JavaScript = 'JavaScript',
}

export type DgraphManifest = {
  __typename?: 'Manifest'
  id: Scalars['ID']
  xid: Scalars['String']
  filename: Scalars['String']
  dependencies: Array<DgraphDependency>
}

export type DgraphRepository = {
  __typename?: 'Repository'
  id: Scalars['ID']
  xid: Scalars['String']
  name: Scalars['String']
  owner: Scalars['String']
  user?: Maybe<DgraphUser>
  primaryLanguage?: Maybe<DgraphLanguageType>
  watchersCount: Scalars['Int']
  issuesCount: Scalars['Int']
  forksCount: Scalars['Int']
  stargazersCount: Scalars['Int']
  stargazers?: Maybe<Array<DgraphUser>>
  stargazersStatus: DgraphStatus
  manifests: Array<DgraphManifest>
  manifestsStatus: DgraphStatus
}

export type DgraphStatus = {
  __typename?: 'Status'
  id: Scalars['ID']
  type?: Maybe<DgraphStatusType>
  startedAt: Scalars['DateTime']
  completedAt: Scalars['DateTime']
  pointer?: Maybe<Scalars['String']>
}

export enum DgraphStatusType {
  Empty = 'EMPTY',
  InProgres = 'IN_PROGRES',
  Completed = 'COMPLETED',
}

export type DgraphUser = {
  __typename?: 'User'
  id: Scalars['ID']
  xid: Scalars['String']
  login: Scalars['String']
  stars?: Maybe<Array<DgraphRepository>>
  starsStatus?: Maybe<DgraphStatus>
  repositories?: Maybe<Array<DgraphRepository>>
  repositoriesStatus?: Maybe<DgraphStatus>
}
