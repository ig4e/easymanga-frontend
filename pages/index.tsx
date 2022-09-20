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

const Cockroach = ""

const Home: NextPage<HomePageProps> = ({
	latestUpdatesList,
	popularMangaList,
	newMangaList,
}: HomePageProps) => {
	const Header: any = tw.h1`text-2xl font-medium my-4`;

	return (
		<div className="mt-12 space-y-20">
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
				<Header>Latest Updates</Header>
				<MangaListRow></MangaListRow>
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
	if (!source) source = "ARES";
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

	for (var i = 0; i < data.latestUpdates.length; i += 5) {
		latestUpdatesList.push(data.latestUpdates.slice(i, i + 5));
	}

	return {
		props: {
			latestUpdatesList: latestUpdatesList.slice(0, 4),
		},
	};
};

export default Home;
