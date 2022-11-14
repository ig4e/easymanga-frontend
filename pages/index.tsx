import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { Manga } from "../typings/manga";
import { gql } from "@apollo/client";
import { client } from "../apollo-client";
import { MANGA_FIELDS } from "../apollo/fragments";
import MangaCardHorizontalList from "../components/Ui/LatestUpdatesHorizontalList";
import Link from "next/link";
import MangaListRow from "../components/Ui/MangaListRow";
import tw from "tailwind-styled-components";
import PageLayout from "../components/Ui/PageLayout";

interface HomePageProps {
	latestUpdatesList: Manga[][];
	popularMangaList: Manga[];
	recentlyAddedMangaList: Manga[];
}

const Home: NextPage<HomePageProps> = ({
	latestUpdatesList,
	popularMangaList,
	recentlyAddedMangaList,
}: HomePageProps) => {
	const Header: any = tw.h1`text-2xl font-semibold mb-6`;

	return (
		<PageLayout>
			<div className="my-12 space-y-4">
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

				<MangaListRow
					mangaList={popularMangaList}
					title={"Popular Manga"}
					href={"/titles?orderBy=popular"}
				></MangaListRow>

				<MangaListRow
					mangaList={recentlyAddedMangaList}
					title={"Recently Added"}
					href={"/titles?orderBy=latest"}
				></MangaListRow>
			</div>
		</PageLayout>
	);
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
	let { source } = query;

	console.log(source);

	const { data } = await client.query({
		query: gql`
			${MANGA_FIELDS}
			query Query(
				$latestUpdatesInput: MangalistInput
				$popularManga: MangalistInput
				$recentlyAddedManga: MangalistInput
			) {
				latestUpdates: mangaList(mangaListInput: $latestUpdatesInput) {
					...MangaFields
				}
				popularManga: mangaList(mangaListInput: $popularManga) {
					...MangaFields
				}
				recentlyAddedManga: mangaList(
					mangaListInput: $recentlyAddedManga
				) {
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
					order: "POPULAR",
				},
			},
			recentlyAddedManga: {
				source,
				filters: {
					order: "LATEST",
				},
			},
		},
	});

	const latestUpdatesList: Manga[][] = [];
	const PerCol = 5;

	for (var i = 0; i < data.latestUpdates.length; i += PerCol) {
		latestUpdatesList.push(data.latestUpdates.slice(i, i + PerCol));
	}

	//console.log(data);

	return {
		props: {
			latestUpdatesList: latestUpdatesList.slice(0, 4),
			popularMangaList: data.popularManga,
			recentlyAddedMangaList: data.recentlyAddedManga,
		},
	};
};

export default Home;
