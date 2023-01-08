import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import PageLayout from "../../components/Ui/PageLayout";
import { MANGA_FIELDS } from "../../apollo/fragments";
import { client } from "../../apollo-client";
import { Manga } from "../../typings/manga";
import ShowImageModal from "../../components/Ui/ShowImageModal";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import {
	ArrowDownIcon,
	CheckIcon,
	ChevronDownIcon,
	ChevronUpIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { gql, useLazyQuery, useQuery } from "@apollo/client";
import { getRandomEmoji } from "../../utils/getRandomEmoji";
import * as Select from "@radix-ui/react-select";
import { useRouter } from "next/router";
import { sourcesData } from "../../utils/sourcesData";
import MangaCard from "../../components/Ui/MangaCard";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useTheme } from "next-themes";
import { SourceUnion, useUserSettingsStore } from "../../store";

interface Genre {
	id: number;
	name: string;
}

interface TitlesPageProps {
	source: string;
	list: Manga[];
	genres: Genre[];
}

const sources = Object.keys(sourcesData).filter(
	(x) => !["MANGADEX", "ANILIST"].includes(x),
);

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
	query MangaListQuery($mangaList: MangalistInput) {
		mangaList(mangaListInput: $mangaList) {
			...MangaFields
		}
	}
`;

const TitlesPage: NextPage<TitlesPageProps> = ({ list, source }) => {
	const { currentSource, setCurrentSource } = useUserSettingsStore();

	useEffect(() => {

	}, []);

	const [fetchMore, { loading, error, data }] = useLazyQuery(MANGA_LIST);
	const [page, setPage] = useState<number>(1);
	const [mangaList, setMangaList] = useState<Manga[]>(list);
	const lastElementRef = useRef<any>(null);
	const location = useRouter();
	const { theme } = useTheme();

	useEffect(() => {
		setPage(1);
		setMangaList(list);
	}, [list]);

	function observerCallback(entries: any) {
		const [entry] = entries;
		if (entry.isIntersecting) {
			if (!loading) {
				console.log("fetching...");
				setPage((state) => state + 1);
			}
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

	const [isSelectMenuOpen, setSelectMenuOpen] = useState(false);

	return (
		<PageLayout>
			<div className="mb-16">
				<div>
					<Head>
						<title>Manga List</title>
						<meta
							property="og:title"
							content={`${source} Manga List`}
						/>
						<meta
							property="og:description"
							content={list.map((x) => x.title).join("\n")}
						/>
						<meta
							property="og:image"
							content={"/assets/logo-1024x1024.png"}
						/>
					</Head>
				</div>

				<div className="my-6 flex gap-2 flex-wrap">
					<Select.Root
						open={isSelectMenuOpen}
						onOpenChange={(open) => {
							if (!open) {
								setTimeout(() => setSelectMenuOpen(open), 100);
							} else setSelectMenuOpen(open);
						}}
						onValueChange={(value) => {
							setCurrentSource(value as SourceUnion)
							location.push(`/titles?source=${value}`);
						}}
						defaultValue={source}
					>
						<Select.Trigger className="bg-root-100 h-10 px-4 rounded-md border border-root-100 flex gap-2 items-center whitespace-nowrap">
							<Select.Value className="" />
							<Select.Icon>
								<ChevronDownIcon className="h-5 w-5"></ChevronDownIcon>
							</Select.Icon>
						</Select.Trigger>

						<Select.Portal>
							<Select.Content className="bg-root p-2 border border-root drop-shadow-md rounded-md z-50">
								<Select.ScrollUpButton className="SelectScrollButton text-neutral">
									<ChevronUpIcon className="h-4 w-4" />
								</Select.ScrollUpButton>
								<Select.Viewport>
									<Select.Group className="space-y-2 text-neutral">
										<Select.Label />
										{sources.map((source: string) => {
											return (
												<Select.Item
													key={source}
													className="flex items-center justify-between gap-2 py-1 px-4 relative hover:bg-primary-hover bg-root-100 border border-root-100 rounded-md SelectItem"
													value={source}
												>
													<Select.ItemText>
														{
															//@ts-ignore
															sourcesData[source]
																?.name
														}
													</Select.ItemText>
													<Select.ItemIndicator className="">
														<CheckIcon className="h-4 w-4 stroke-2"></CheckIcon>
													</Select.ItemIndicator>
												</Select.Item>
											);
										})}
									</Select.Group>
								</Select.Viewport>
								<Select.ScrollDownButton className="SelectScrollButton text-reverse">
									<ChevronDownIcon className="h-4 w-4" />
								</Select.ScrollDownButton>
							</Select.Content>
						</Select.Portal>
					</Select.Root>
				</div>
				<SkeletonTheme
					baseColor={theme === "dark" ? "#222328" : "#DFDFDF"}
					highlightColor={theme === "dark" ? "#4e4f52" : "#E5E6E8"}
				>
					<div
						key={"titles-grid"}
						className={`grid grid-flow-row [grid-template-columns:repeat(auto-fill,minmax(100px,1fr));] sm:[grid-template-columns:repeat(auto-fill,minmax(160px,1fr));] md:[grid-template-columns:repeat(auto-fill,minmax(185px,1fr));] [grid-auto-rows:1fr] gap-4 content select-none ${
							isSelectMenuOpen ? "pointer-events-none" : ""
						}`}
					>
						{mangaList.map((manga, index) => {
							return (
								<MangaCard
									key={manga.slug + index}
									manga={manga}
									mobile={true}
									customClasses={``}
								></MangaCard>
								// <Link
								// 	href={`/titles/${manga.source}/${manga.slug}`}
								// 	key={manga.slug}
								// >
								// 	<a
								// 		href={`/titles/${manga.source}/${manga.slug}`}
								// 		key={manga.slug}
								// 		className="flex flex-col gap-2"
								// 	>
								// 		<div className="w-full h-auto aspect-[125/178] relative">
								// 			<div className="bg-neutral-200/80 animate-pulse inset-0 absolute rounded-md"></div>
								// 			<Image
								// 				src={manga.cover}
								// 				fill={true}
								// 				className="rounded-md object-cover "
								// 				alt={manga.title}
								// 			></Image>
								// 		</div>

								// 		<span className="font-medium line-clamp-2">
								// 			{manga.title}
								// 		</span>
								// 	</a>
								// </Link>
							);
						})}

						{loading &&
							Array.from({ length: 2 }).map((_, index) => {
								return (
									<div
										key={"newSkeletonManga-" + index}
										className="relative space-y-2"
									>
										<div className="">
											<Skeleton className="-top-1 aspect-[200/285] rounded-md" />
										</div>
										<div>
											<Skeleton
												count={1}
												width={`${
													15 + Math.random() * 80
												}%`}
											/>
										</div>
									</div>
								);
							})}
					</div>
				</SkeletonTheme>

				<div ref={lastElementRef}></div>

				<AnimatePresence>
					{loading && (
						<div className="flex justify-center my-4">
							<motion.div
								initial={{ scale: 0 }}
								animate={{ scale: 1 }}
								exit={{ scale: 0 }}
								className="flex items-center gap-4"
							>
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
							</motion.div>
						</div>
					)}
				</AnimatePresence>
			</div>
		</PageLayout>
	);
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
	let { source } = query;

	//console.log(source);

	const { data } = await client.query({
		query: MANGA_LIST,
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
		},
	};
};

export default TitlesPage;
