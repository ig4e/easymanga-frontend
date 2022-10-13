import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import tw from "tailwind-styled-components";
import { Manga } from "../typings/manga";
import { gql } from "@apollo/client";
import { client } from "../apollo-client";
import { MANGA_FIELDS } from "../apollo/fragments";
import MangaCardHorizontalList from "../components/Ui/LatestUpdatesHorizontalList";
import Link from "next/link";
import MangaListRow from "../components/Ui/MangaListRow";

interface HomePageProps {
	latestUpdatesList: Manga[][];
	popularMangaList: Manga[];
	newMangaList: Manga[];
}

const Home: NextPage<HomePageProps> = ({
	latestUpdatesList,
	popularMangaList,
	newMangaList,
}: HomePageProps) => {
	const Header: any = tw.h1`text-3xl font-medium mb-6`;

	return (
		<div className="mt-12 space-y-10">
			<Head>
				<title>أفضل وأسهل طريقة لقرائة المانجا - Easy Manga</title>
			</Head>

			<div className="flex flex-col">
				<Header>Latest Updates</Header>
				<MangaCardHorizontalList
					mangaList={latestUpdatesList}
				></MangaCardHorizontalList>
				<Link href="/titles/">
					<a className="self-end my-2 text-sm text-neutral-200 font-medium hover:text-neutral">
						View All
					</a>
				</Link>
			</div>
			<div className="flex flex-col">
				<Header>Popular Manga</Header>
				<MangaListRow mangaList={popularMangaList}></MangaListRow>
				<Link href="/titles/">
					<a className="self-end my-2 text-sm text-neutral-200 font-medium hover:text-neutral">
						View All
					</a>
				</Link>
			</div>
		</div>
	);
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
	let { source } = query;
	if (!source) source = "MANGASWAT";
	const { data } = await client.query({
		query: gql`
			${MANGA_FIELDS}
			query Query(
				$latestUpdatesInput: MangalistInput
				$popularManga: MangalistInput
			) {
				latestUpdates: mangaList(mangaListInput: $latestUpdatesInput) {
					...MangaFields
				}
				popularManga: mangaList(mangaListInput: $popularManga) {
					...MangaFields
				}
			}
		`,
		variables: {
			latestUpdatesInput: {
				source,
				filters: {
					order: "UPDATE",
				},
			},
			popularManga: {
				source,
				filters: {
					order: "UPDATE",
				},
			},
		},
	});

	const latestUpdatesList: Manga[][] = [];
	const PerCol = 6

	for (var i = 0; i < data.latestUpdates.length; i += PerCol) {
		latestUpdatesList.push(data.latestUpdates.slice(i, i + PerCol));
	}

	//console.log(data);

	return {
		props: {
			latestUpdatesList: latestUpdatesList.slice(0, 4),
			popularMangaList: data.popularManga,
		},
	};
};

export default Home;
