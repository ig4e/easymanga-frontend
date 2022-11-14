import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { motion } from "framer-motion";
import PageLayout from "../../components/Ui/PageLayout";
import { MANGA_FIELDS } from "../../apollo/fragments";
import { client } from "../../apollo-client";
import { gql } from "@apollo/client";
import { Manga } from "../../typings/manga";
import ShowImageModal from "../../components/Ui/ShowImageModal";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { ArrowDownIcon, ChevronDownIcon } from "@heroicons/react/24/outline";

interface Genre {
	id: number;
	name: string;
}

interface TitlesPageProps {
	source: string;
	list: Manga[];
	genres: Genre[];
}

const Home: NextPage<TitlesPageProps> = ({ list, source, genres }) => {
	return (
		<PageLayout>
			<div>
				<Head>
					<title>Manga List</title>
				</Head>
			</div>

			<div className="my-6 flex gap-2 flex-wrap">
				<div className="bg-base-100 py-2 px-4 flex gap-2 items-center rounded-md border">
						<span className="text-black">{source}</span>
						<ChevronDownIcon className = "h-5 w-5"></ChevronDownIcon>
				</div>
			</div>

			<div className="grid grid-flow-row grid-cols-6 gap-2">
				{list.map((manga) => {
					return (
						<div key={manga.slug} className="w-full h-auto aspect-[125/178] relative">
							<Image
								src={manga.cover}
								layout="fill"
								className="rounded-md object-cover "
							></Image>
						</div>
					);
				})}
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
				$popularManga: MangalistInput
				$genresInput: BaseInput!
			) {
				genres(genresInput: $genresInput) {
					id
					name
				}
				popularManga: mangaList(mangaListInput: $popularManga) {
					...MangaFields
				}
			}
		`,
		variables: {
			popularManga: {
				source,
				filters: {
					order: "POPULAR",
				},
			},
			genresInput: {
				source: source,
			},
		},
	});

	//console.log(data);

	return {
		props: {
			source: data.popularManga[0].source,
			list: data.popularManga,
			genres: data.genres,
		},
	};
};

export default Home;
