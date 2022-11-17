import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { motion } from "framer-motion";
import PageLayout from "../../components/Ui/PageLayout";
import { MANGA_FIELDS } from "../../apollo/fragments";
import { client } from "../../apollo-client";
import { Manga } from "../../typings/manga";
import ShowImageModal from "../../components/Ui/ShowImageModal";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { ArrowDownIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { gql, useLazyQuery, useQuery } from "@apollo/client";
import { getRandomEmoji } from "../../utils/getRandomEmoji";

interface Genre {
	id: number;
	name: string;
}

interface TitlesPageProps {
	source: string;
	list: Manga[];
	genres: Genre[];
}

const MANGA_LIST_WITH_GENRES = gql`
	${MANGA_FIELDS}
	query Query($mangaList: MangalistInput, $genresInput: BaseInput!) {
		genres(genresInput: $genresInput) {
			id
			name
		}
		mangaList(mangaListInput: $mangaList) {
			...MangaFields
		}
	}
`;

const MANGA_LIST = gql`
	${MANGA_FIELDS}
	query Query($mangaList: MangalistInput) {
		mangaList(mangaListInput: $mangaList) {
			...MangaFields
		}
	}
`;

const Home: NextPage<TitlesPageProps> = ({ list, source, genres }) => {
	const [fetchMore, { loading, error, data }] = useLazyQuery(MANGA_LIST);
	const [page, setPage] = useState<number>(1);
	const [mangaList, setMangaList] = useState<Manga[]>(list);
	const lastElementRef = useRef<any>(null);

	function observerCallback(entries: any) {
		const [entry] = entries;
		if (entry.isIntersecting) {
			console.log("fetching...");
			setPage((state) => state + 1);
		}
	}

	useEffect(() => {
		const observer = new IntersectionObserver(observerCallback, {});
		const currentTarget = lastElementRef.current;
		if (currentTarget) observer.observe(currentTarget);
		return () => {
			if (currentTarget) observer.unobserve(currentTarget);
		};
	}, [lastElementRef]);

	useEffect(() => {
		if (page === 1) return;
		fetchMore({
			variables: {
				mangaList: {
					source,
					page: page,
					filters: {
						order: "POPULAR",
					},
				},
			},
		}).then(({ data }) => {
			console.log(page);
			setMangaList((state) => [...state, ...data.mangaList]);
		});
	}, [page]);

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
					<ChevronDownIcon className="h-5 w-5"></ChevronDownIcon>
				</div>
			</div>

			<div className="grid grid-flow-row grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-4 gap-y-6 select-none">
				{mangaList.map((manga, index) => {
					return (
						<Link
							href={`/titles/${manga.source}/${manga.slug}`}
							key={manga.slug}
						>
							<a
								href={`/titles/${manga.source}/${manga.slug}`}
								key={manga.slug}
								className="flex flex-col gap-2"
							>
								<div className="w-full h-auto aspect-[125/178] relative">
									<div className="bg-neutral-200/80 animate-pulse inset-0 absolute rounded-md"></div>
									<Image
										src={manga.cover}
										layout="fill"
										className="rounded-md object-cover "
									></Image>
								</div>

								<span className="font-medium">
									{manga.title}
								</span>
							</a>
						</Link>
					);
				})}

				<div ref={lastElementRef}></div>
			</div>

			{loading && (
				<div className="flex justify-center my-6">
					<div className="flex items-center gap-4">
						<svg
							className="animate-spin w-12 h-12"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
						>
							<circle
								className="opacity-25 text-neutral-200"
								cx="12"
								cy="12"
								r="10"
								stroke="currentColor"
								strokeWidth="4"
							></circle>
							<path
								className="opacity-75 text-primary"
								fill="currentColor"
								d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
							></path>
						</svg>
						<span>{getRandomEmoji()} Loading....</span>
					</div>
				</div>
			)}
		</PageLayout>
	);
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
	let { source } = query;

	console.log(source);

	const { data } = await client.query({
		query: MANGA_LIST_WITH_GENRES,
		variables: {
			mangaList: {
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
			source: data.mangaList[0].source,
			list: data.mangaList,
			genres: data.genres,
		},
	};
};

export default Home;
