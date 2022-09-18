import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import tw from "tailwind-styled-components";
import { Manga } from "../typings/manga";
import { gql } from "@apollo/client";
import { client } from "../apollo-client";

import MangaCardHorizontalList from "../components/Ui/LatestUpdatesHorizontalList";
import Link from "next/link";

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
	const Header: any = tw.h1`text-3xl font-medium my-4`;

	return (
		<div className="mt-12 space-y-20">
			<Head>
				<title>أفضل وأسهل طريقة لقرائة المانجا - Easy Manga</title>
			</Head>

			<div>
				<div className="flex flex-col">
					<Header>Latest Updates</Header>
					<MangaCardHorizontalList
						mangaList={latestUpdatesList}
					></MangaCardHorizontalList>
					<Link href="">
						<a className="self-end my-2 text-sm text-neutral-200 font-medium hover:text-neutral">
							View All
						</a>
					</Link>
				</div>
			</div>
		</div>
	);
};

export const getServerSideProps: GetServerSideProps = async () => {
	const { data } = await client.query({
		query: gql`
			query Query($mangaListInput: MangalistInput) {
				latestUpdates: mangaList(mangaListInput: $mangaListInput) {
					aniId
					dexId
					muId
					slug
					cover
					url
					altTitles
					title
					genres
					status
					synopsis
					author
					type
					releaseYear
					artist
					score
					chapters {
						name
						number
					}
				}
			}
		`,
		variables: {
			mangaListInput: {
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
			latestUpdatesList: latestUpdatesList.slice(0, 3),
		},
	};
};

export default Home;
