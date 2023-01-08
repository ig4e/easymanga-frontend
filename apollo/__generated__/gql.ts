/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel-plugin for production.
 */
const documents = {
    "\n\t\t\tfragment MangaFields on Manga {\n\t\t\t\tdexId\n\t\t\t\taniId\n\t\t\t\tmuId\n\t\t\t\tslug\n\t\t\t\turl\n\t\t\t\tcover\n\t\t\t\ttitle\n\t\t\t\taltTitles\n\t\t\t\tgenres\n\t\t\t\tsynopsis\n\t\t\t\tstatus\n\t\t\t\ttype\n\t\t\t\tauthor\n\t\t\t\tartist\n\t\t\t\treleaseYear\n\t\t\t\tscore\n\t\t\t\tchapters {\n\t\t\t\t\tname\n\t\t\t\t\tnumber\n\t\t\t\t}\n\t\t\t\tsource\n\t\t\t}\n\t\t\tquery HomePageQuery(\n\t\t\t\t$latestUpdatesInput: MangalistInput\n\t\t\t\t$popularManga: MangalistInput\n\t\t\t\t$recentlyAddedManga: MangalistInput\n\t\t\t) {\n\t\t\t\tlatestUpdates: mangaList(mangaListInput: $latestUpdatesInput) {\n\t\t\t\t\t...MangaFields\n\t\t\t\t}\n\t\t\t\tpopularManga: mangaList(mangaListInput: $popularManga) {\n\t\t\t\t\t...MangaFields\n\t\t\t\t}\n\t\t\t\trecentlyAddedManga: mangaList(\n\t\t\t\t\tmangaListInput: $recentlyAddedManga\n\t\t\t\t) {\n\t\t\t\t\t...MangaFields\n\t\t\t\t}\n\t\t\t}\n\t\t": types.MangaFieldsFragmentDoc,
    "\n\t\t\tquery Manga($mangaUniqueInput: MangaUniqueInput!) {\n\t\t\t\tmanga(mangaUniqueInput: $mangaUniqueInput) {\n\t\t\t\t\turl\n\t\t\t\t\ttype\n\t\t\t\t\ttitle\n\t\t\t\t\tsynopsis\n\t\t\t\t\tstatus\n\t\t\t\t\tsource\n\t\t\t\t\tslug\n\t\t\t\t\tscore\n\t\t\t\t\treleaseYear\n\t\t\t\t\tmuId\n\t\t\t\t\tgenres\n\t\t\t\t\tdexId\n\t\t\t\t\tcover\n\t\t\t\t\tcovers {\n\t\t\t\t\t\turl\n\t\t\t\t\t\tvolume\n\t\t\t\t\t}\n\t\t\t\t\tchapters {\n\t\t\t\t\t\turl\n\t\t\t\t\t\tsource\n\t\t\t\t\t\tslug\n\t\t\t\t\t\tnumber\n\t\t\t\t\t\tname\n\t\t\t\t\t\tmangaSlug\n\t\t\t\t\t}\n\t\t\t\t\tauthor\n\t\t\t\t\tartist\n\t\t\t\t\taniId\n\t\t\t\t\taltTitles\n\t\t\t\t}\n\t\t\t}\n\t\t": types.MangaDocument,
    "\n\t\n\tquery Query($mangaList: MangalistInput, $genresInput: BaseInput!) {\n\t\tgenres(genresInput: $genresInput) {\n\t\t\tid\n\t\t\tname\n\t\t}\n\t\tmangaList(mangaListInput: $mangaList) {\n\t\t\t...MangaFields\n\t\t}\n\t}\n": types.QueryDocument,
    "\n\t\n\tquery MangaListQuery($mangaList: MangalistInput) {\n\t\tmangaList(mangaListInput: $mangaList) {\n\t\t\t...MangaFields\n\t\t}\n\t}\n": types.MangaListQueryDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
**/
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\t\t\tfragment MangaFields on Manga {\n\t\t\t\tdexId\n\t\t\t\taniId\n\t\t\t\tmuId\n\t\t\t\tslug\n\t\t\t\turl\n\t\t\t\tcover\n\t\t\t\ttitle\n\t\t\t\taltTitles\n\t\t\t\tgenres\n\t\t\t\tsynopsis\n\t\t\t\tstatus\n\t\t\t\ttype\n\t\t\t\tauthor\n\t\t\t\tartist\n\t\t\t\treleaseYear\n\t\t\t\tscore\n\t\t\t\tchapters {\n\t\t\t\t\tname\n\t\t\t\t\tnumber\n\t\t\t\t}\n\t\t\t\tsource\n\t\t\t}\n\t\t\tquery HomePageQuery(\n\t\t\t\t$latestUpdatesInput: MangalistInput\n\t\t\t\t$popularManga: MangalistInput\n\t\t\t\t$recentlyAddedManga: MangalistInput\n\t\t\t) {\n\t\t\t\tlatestUpdates: mangaList(mangaListInput: $latestUpdatesInput) {\n\t\t\t\t\t...MangaFields\n\t\t\t\t}\n\t\t\t\tpopularManga: mangaList(mangaListInput: $popularManga) {\n\t\t\t\t\t...MangaFields\n\t\t\t\t}\n\t\t\t\trecentlyAddedManga: mangaList(\n\t\t\t\t\tmangaListInput: $recentlyAddedManga\n\t\t\t\t) {\n\t\t\t\t\t...MangaFields\n\t\t\t\t}\n\t\t\t}\n\t\t"): (typeof documents)["\n\t\t\tfragment MangaFields on Manga {\n\t\t\t\tdexId\n\t\t\t\taniId\n\t\t\t\tmuId\n\t\t\t\tslug\n\t\t\t\turl\n\t\t\t\tcover\n\t\t\t\ttitle\n\t\t\t\taltTitles\n\t\t\t\tgenres\n\t\t\t\tsynopsis\n\t\t\t\tstatus\n\t\t\t\ttype\n\t\t\t\tauthor\n\t\t\t\tartist\n\t\t\t\treleaseYear\n\t\t\t\tscore\n\t\t\t\tchapters {\n\t\t\t\t\tname\n\t\t\t\t\tnumber\n\t\t\t\t}\n\t\t\t\tsource\n\t\t\t}\n\t\t\tquery HomePageQuery(\n\t\t\t\t$latestUpdatesInput: MangalistInput\n\t\t\t\t$popularManga: MangalistInput\n\t\t\t\t$recentlyAddedManga: MangalistInput\n\t\t\t) {\n\t\t\t\tlatestUpdates: mangaList(mangaListInput: $latestUpdatesInput) {\n\t\t\t\t\t...MangaFields\n\t\t\t\t}\n\t\t\t\tpopularManga: mangaList(mangaListInput: $popularManga) {\n\t\t\t\t\t...MangaFields\n\t\t\t\t}\n\t\t\t\trecentlyAddedManga: mangaList(\n\t\t\t\t\tmangaListInput: $recentlyAddedManga\n\t\t\t\t) {\n\t\t\t\t\t...MangaFields\n\t\t\t\t}\n\t\t\t}\n\t\t"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\t\t\tquery Manga($mangaUniqueInput: MangaUniqueInput!) {\n\t\t\t\tmanga(mangaUniqueInput: $mangaUniqueInput) {\n\t\t\t\t\turl\n\t\t\t\t\ttype\n\t\t\t\t\ttitle\n\t\t\t\t\tsynopsis\n\t\t\t\t\tstatus\n\t\t\t\t\tsource\n\t\t\t\t\tslug\n\t\t\t\t\tscore\n\t\t\t\t\treleaseYear\n\t\t\t\t\tmuId\n\t\t\t\t\tgenres\n\t\t\t\t\tdexId\n\t\t\t\t\tcover\n\t\t\t\t\tcovers {\n\t\t\t\t\t\turl\n\t\t\t\t\t\tvolume\n\t\t\t\t\t}\n\t\t\t\t\tchapters {\n\t\t\t\t\t\turl\n\t\t\t\t\t\tsource\n\t\t\t\t\t\tslug\n\t\t\t\t\t\tnumber\n\t\t\t\t\t\tname\n\t\t\t\t\t\tmangaSlug\n\t\t\t\t\t}\n\t\t\t\t\tauthor\n\t\t\t\t\tartist\n\t\t\t\t\taniId\n\t\t\t\t\taltTitles\n\t\t\t\t}\n\t\t\t}\n\t\t"): (typeof documents)["\n\t\t\tquery Manga($mangaUniqueInput: MangaUniqueInput!) {\n\t\t\t\tmanga(mangaUniqueInput: $mangaUniqueInput) {\n\t\t\t\t\turl\n\t\t\t\t\ttype\n\t\t\t\t\ttitle\n\t\t\t\t\tsynopsis\n\t\t\t\t\tstatus\n\t\t\t\t\tsource\n\t\t\t\t\tslug\n\t\t\t\t\tscore\n\t\t\t\t\treleaseYear\n\t\t\t\t\tmuId\n\t\t\t\t\tgenres\n\t\t\t\t\tdexId\n\t\t\t\t\tcover\n\t\t\t\t\tcovers {\n\t\t\t\t\t\turl\n\t\t\t\t\t\tvolume\n\t\t\t\t\t}\n\t\t\t\t\tchapters {\n\t\t\t\t\t\turl\n\t\t\t\t\t\tsource\n\t\t\t\t\t\tslug\n\t\t\t\t\t\tnumber\n\t\t\t\t\t\tname\n\t\t\t\t\t\tmangaSlug\n\t\t\t\t\t}\n\t\t\t\t\tauthor\n\t\t\t\t\tartist\n\t\t\t\t\taniId\n\t\t\t\t\taltTitles\n\t\t\t\t}\n\t\t\t}\n\t\t"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\t\n\tquery Query($mangaList: MangalistInput, $genresInput: BaseInput!) {\n\t\tgenres(genresInput: $genresInput) {\n\t\t\tid\n\t\t\tname\n\t\t}\n\t\tmangaList(mangaListInput: $mangaList) {\n\t\t\t...MangaFields\n\t\t}\n\t}\n"): (typeof documents)["\n\t\n\tquery Query($mangaList: MangalistInput, $genresInput: BaseInput!) {\n\t\tgenres(genresInput: $genresInput) {\n\t\t\tid\n\t\t\tname\n\t\t}\n\t\tmangaList(mangaListInput: $mangaList) {\n\t\t\t...MangaFields\n\t\t}\n\t}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\t\n\tquery MangaListQuery($mangaList: MangalistInput) {\n\t\tmangaList(mangaListInput: $mangaList) {\n\t\t\t...MangaFields\n\t\t}\n\t}\n"): (typeof documents)["\n\t\n\tquery MangaListQuery($mangaList: MangalistInput) {\n\t\tmangaList(mangaListInput: $mangaList) {\n\t\t\t...MangaFields\n\t\t}\n\t}\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;