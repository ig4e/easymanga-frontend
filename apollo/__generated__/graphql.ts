/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any;
};

export type BaseInput = {
  source?: InputMaybe<Sources>;
};

export type Chapter = {
  __typename?: 'Chapter';
  createdAt?: Maybe<Scalars['DateTime']>;
  mangaSlug?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  nextSlug?: Maybe<Scalars['String']>;
  number: Scalars['Float'];
  otherChapters: Array<Chapter>;
  pages?: Maybe<Array<Scalars['String']>>;
  prevSlug?: Maybe<Scalars['String']>;
  slug: Scalars['String'];
  source: Sources;
  url: Scalars['String'];
};

export type ChapterUniqueInput = {
  slug: Scalars['String'];
  source?: InputMaybe<Sources>;
};

export type Genre = {
  __typename?: 'Genre';
  /** Genre id */
  id: Scalars['Int'];
  /** Genre name */
  name: Scalars['String'];
};

export type Manga = {
  __typename?: 'Manga';
  altTitles: Array<Scalars['String']>;
  aniId?: Maybe<Scalars['String']>;
  artist?: Maybe<Scalars['String']>;
  author?: Maybe<Scalars['String']>;
  chapters?: Maybe<Array<Chapter>>;
  cover: Scalars['String'];
  covers?: Maybe<Array<MangaCover>>;
  dexId?: Maybe<Scalars['String']>;
  genres: Array<Scalars['String']>;
  muId?: Maybe<Scalars['String']>;
  releaseYear?: Maybe<Scalars['Int']>;
  score?: Maybe<Scalars['Float']>;
  slug: Scalars['String'];
  source: Sources;
  status?: Maybe<Scalars['String']>;
  synopsis?: Maybe<Scalars['String']>;
  title: Scalars['String'];
  type?: Maybe<Scalars['String']>;
  url: Scalars['String'];
};

export type MangaCover = {
  __typename?: 'MangaCover';
  url: Scalars['String'];
  volume: Scalars['String'];
};

export type MangaListFilters = {
  genre?: InputMaybe<Array<Scalars['String']>>;
  order?: InputMaybe<Order>;
  status?: InputMaybe<Status>;
  type?: InputMaybe<Type>;
};

export type MangaSearchInput = {
  query: Scalars['String'];
  source?: InputMaybe<Sources>;
};

export type MangaUniqueInput = {
  slug: Scalars['String'];
  source?: InputMaybe<Sources>;
};

export type MangalistInput = {
  filters?: InputMaybe<MangaListFilters>;
  page?: InputMaybe<Scalars['Int']>;
  source?: InputMaybe<Sources>;
};

export enum Order {
  Latest = 'LATEST',
  Popular = 'POPULAR',
  Title = 'TITLE',
  Titlereverse = 'TITLEREVERSE',
  Update = 'UPDATE'
}

export type Query = {
  __typename?: 'Query';
  chapter: Chapter;
  genres: Array<Genre>;
  manga: Manga;
  mangaList: Array<Manga>;
  search: Array<Manga>;
};


export type QueryChapterArgs = {
  chapterUniqueInput: ChapterUniqueInput;
};


export type QueryGenresArgs = {
  genresInput: BaseInput;
};


export type QueryMangaArgs = {
  mangaUniqueInput: MangaUniqueInput;
};


export type QueryMangaListArgs = {
  mangaListInput?: InputMaybe<MangalistInput>;
};


export type QuerySearchArgs = {
  searchInput: MangaSearchInput;
};

export enum Sources {
  Arenascans = 'ARENASCANS',
  Ares = 'ARES',
  Ashq = 'ASHQ',
  Azora = 'AZORA',
  Galaxymanga = 'GALAXYMANGA',
  Kissmanga = 'KISSMANGA',
  Mangaae = 'MANGAAE',
  Mangakakalot = 'MANGAKAKALOT',
  Mangalek = 'MANGALEK',
  Mangaprotm = 'MANGAPROTM',
  Mangaspark = 'MANGASPARK',
  Mangaswat = 'MANGASWAT',
  Ozulscans = 'OZULSCANS',
  Stkissmanga = 'STKISSMANGA',
  Teamx = 'TEAMX'
}

export enum Status {
  Completed = 'COMPLETED',
  Hiatus = 'HIATUS',
  Ongoing = 'ONGOING'
}

export enum Type {
  Comic = 'COMIC',
  Manga = 'MANGA',
  Manhua = 'MANHUA',
  Manhwa = 'MANHWA',
  Novel = 'NOVEL'
}

export type MangaFieldsFragment = { __typename?: 'Manga', dexId?: string | null, aniId?: string | null, muId?: string | null, slug: string, url: string, cover: string, title: string, altTitles: Array<string>, genres: Array<string>, synopsis?: string | null, status?: string | null, type?: string | null, author?: string | null, artist?: string | null, releaseYear?: number | null, score?: number | null, source: Sources, chapters?: Array<{ __typename?: 'Chapter', name: string, number: number }> | null } & { ' $fragmentName'?: 'MangaFieldsFragment' };

export type HomePageQueryQueryVariables = Exact<{
  latestUpdatesInput?: InputMaybe<MangalistInput>;
  popularManga?: InputMaybe<MangalistInput>;
  recentlyAddedManga?: InputMaybe<MangalistInput>;
}>;


export type HomePageQueryQuery = { __typename?: 'Query', latestUpdates: Array<(
    { __typename?: 'Manga' }
    & { ' $fragmentRefs'?: { 'MangaFieldsFragment': MangaFieldsFragment } }
  )>, popularManga: Array<(
    { __typename?: 'Manga' }
    & { ' $fragmentRefs'?: { 'MangaFieldsFragment': MangaFieldsFragment } }
  )>, recentlyAddedManga: Array<(
    { __typename?: 'Manga' }
    & { ' $fragmentRefs'?: { 'MangaFieldsFragment': MangaFieldsFragment } }
  )> };

export type MangaQueryVariables = Exact<{
  mangaUniqueInput: MangaUniqueInput;
}>;


export type MangaQuery = { __typename?: 'Query', manga: { __typename?: 'Manga', url: string, type?: string | null, title: string, synopsis?: string | null, status?: string | null, source: Sources, slug: string, score?: number | null, releaseYear?: number | null, muId?: string | null, genres: Array<string>, dexId?: string | null, cover: string, author?: string | null, artist?: string | null, aniId?: string | null, altTitles: Array<string>, covers?: Array<{ __typename?: 'MangaCover', url: string, volume: string }> | null, chapters?: Array<{ __typename?: 'Chapter', url: string, source: Sources, slug: string, number: number, name: string, mangaSlug?: string | null }> | null } };

export type QueryQueryVariables = Exact<{
  mangaList?: InputMaybe<MangalistInput>;
  genresInput: BaseInput;
}>;


export type QueryQuery = { __typename?: 'Query', genres: Array<{ __typename?: 'Genre', id: number, name: string }>, mangaList: Array<(
    { __typename?: 'Manga' }
    & { ' $fragmentRefs'?: { 'MangaFieldsFragment': MangaFieldsFragment } }
  )> };

export type MangaListQueryQueryVariables = Exact<{
  mangaList?: InputMaybe<MangalistInput>;
}>;


export type MangaListQueryQuery = { __typename?: 'Query', mangaList: Array<(
    { __typename?: 'Manga' }
    & { ' $fragmentRefs'?: { 'MangaFieldsFragment': MangaFieldsFragment } }
  )> };

export const MangaFieldsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MangaFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Manga"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"dexId"}},{"kind":"Field","name":{"kind":"Name","value":"aniId"}},{"kind":"Field","name":{"kind":"Name","value":"muId"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"cover"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"altTitles"}},{"kind":"Field","name":{"kind":"Name","value":"genres"}},{"kind":"Field","name":{"kind":"Name","value":"synopsis"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"author"}},{"kind":"Field","name":{"kind":"Name","value":"artist"}},{"kind":"Field","name":{"kind":"Name","value":"releaseYear"}},{"kind":"Field","name":{"kind":"Name","value":"score"}},{"kind":"Field","name":{"kind":"Name","value":"chapters"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"number"}}]}},{"kind":"Field","name":{"kind":"Name","value":"source"}}]}}]} as unknown as DocumentNode<MangaFieldsFragment, unknown>;
export const HomePageQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"HomePageQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"latestUpdatesInput"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"MangalistInput"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"popularManga"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"MangalistInput"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"recentlyAddedManga"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"MangalistInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"latestUpdates"},"name":{"kind":"Name","value":"mangaList"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"mangaListInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"latestUpdatesInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MangaFields"}}]}},{"kind":"Field","alias":{"kind":"Name","value":"popularManga"},"name":{"kind":"Name","value":"mangaList"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"mangaListInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"popularManga"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MangaFields"}}]}},{"kind":"Field","alias":{"kind":"Name","value":"recentlyAddedManga"},"name":{"kind":"Name","value":"mangaList"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"mangaListInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"recentlyAddedManga"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MangaFields"}}]}}]}},...MangaFieldsFragmentDoc.definitions]} as unknown as DocumentNode<HomePageQueryQuery, HomePageQueryQueryVariables>;
export const MangaDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Manga"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"mangaUniqueInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"MangaUniqueInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"manga"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"mangaUniqueInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"mangaUniqueInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"synopsis"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"source"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"score"}},{"kind":"Field","name":{"kind":"Name","value":"releaseYear"}},{"kind":"Field","name":{"kind":"Name","value":"muId"}},{"kind":"Field","name":{"kind":"Name","value":"genres"}},{"kind":"Field","name":{"kind":"Name","value":"dexId"}},{"kind":"Field","name":{"kind":"Name","value":"cover"}},{"kind":"Field","name":{"kind":"Name","value":"covers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"volume"}}]}},{"kind":"Field","name":{"kind":"Name","value":"chapters"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"source"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"number"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"mangaSlug"}}]}},{"kind":"Field","name":{"kind":"Name","value":"author"}},{"kind":"Field","name":{"kind":"Name","value":"artist"}},{"kind":"Field","name":{"kind":"Name","value":"aniId"}},{"kind":"Field","name":{"kind":"Name","value":"altTitles"}}]}}]}}]} as unknown as DocumentNode<MangaQuery, MangaQueryVariables>;
export const QueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Query"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"mangaList"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"MangalistInput"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"genresInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"BaseInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"genres"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"genresInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"genresInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"mangaList"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"mangaListInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"mangaList"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MangaFields"}}]}}]}},...MangaFieldsFragmentDoc.definitions]} as unknown as DocumentNode<QueryQuery, QueryQueryVariables>;
export const MangaListQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"MangaListQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"mangaList"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"MangalistInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"mangaList"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"mangaListInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"mangaList"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MangaFields"}}]}}]}},...MangaFieldsFragmentDoc.definitions]} as unknown as DocumentNode<MangaListQueryQuery, MangaListQueryQueryVariables>;