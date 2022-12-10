import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import ImageLegacy from "next/legacy/image";
import Image from "next/image";

import { Manga } from "../../../../typings/manga";
import { anilistClient, client } from "../../../../apollo-client";
import { gql } from "@apollo/client";
import ShowImageModal from "../../../../components/Ui/ShowImageModal";
import ExternalSite from "../../../../components/Ui/ExternalSite";
import Fuse from "fuse.js";

import {
	CheckIcon,
	ChevronDownIcon,
	ChevronUpIcon,
	StarIcon,
} from "@heroicons/react/24/outline";
import { PlayCircleIcon } from "@heroicons/react/24/solid";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import CharacterCard from "../../../../components/Ui/CharacterCard";
import { getWorkersUrl } from "../../../../utils/getImageUrl";
import Navbar from "../../../../components/Navbar";
import * as Select from "@radix-ui/react-select";
import { Chapter } from "../../../../typings/chapter";

import { SourceData, sourcesData } from "../../../../utils/sourcesData";
import { useChapterPageStore } from "../../../../store";
import { LayoutGroup, motion } from "framer-motion";
import * as Tabs from "@radix-ui/react-tabs";

import NoImagePlaceholder from "../../../../public/assets/no-img.png";
import { useRouter } from "next/router";
import SearchBar from "../../../../components/Ui/SearchBar";

export interface Character {
	role: "MAIN" | "SUPPORTING" | "BACKGROUND";
	node: {
		name: {
			native: string;
			middle: string;
			last: string;
			full: string;
			first: string;
			alternativeSpoiler: string[];
			alternative: string[];
		};
		image: {
			large: string;
			medium: string;
		};
		id: number;
		gender: string;
		favourites: number;
		description: string;
		dateOfBirth: {
			year: number | null;
			month: number | null;
			day: number | null;
		};
		bloodType: string | null;
		age: number | null;
	};
}

interface MangaPageProps {
	manga: Manga;
	currentTab: "chapters" | "characters" | "art";
	anilistData?: {
		volumes: number | null;
		updatedAt: number;
		type: "MANGA";
		trending: number;
		trailer?: {
			thumbnail: string;
			site: string;
			id: string;
		};
		title: {
			romaji: string;
			native: string;
			english: string;
		};
		tags: {
			name: string;
			rank: number;
			id: number;
			isAdult: boolean;
			isGeneralSpoiler: boolean;
			isMediaSpoiler: boolean;
			description: string;
			category: string;
		}[];
		synonyms: string[];
		studios: {
			pageInfo: {
				total: number;
				perPage: number;
				lastPage: number;
				hasNextPage: boolean;
				currentPage: number;
			};
			nodes: any[];
		};
		status:
			| "RELEASING"
			| "FINISHED"
			| "NOT_YET_RELEASED"
			| "CANCELLED"
			| "HIATUS";
		startDate: {
			year: number;
			month: number;
			day: number;
		};
		staff: {
			pageInfo: {
				total: number;
				perPage: number;
				lastPage: number;
				hasNextPage: boolean;
				currentPage: number;
			};
			edges: {
				role: string;
				node: {
					id: number;
					image: {
						medium: string;
						large: string;
					};
					name: {
						native: string;
						middle: string;
						last: string;
						full: string;
						first: string;
						alternative: string[];
					};
				};
			}[];
		};
		source:
			| "ORIGINAL"
			| "MANGA"
			| "LIGHT_NOVEL"
			| "VISUAL_NOVEL"
			| "VIDEO_GAME"
			| "OTHER"
			| "NOVEL"
			| "DOUJINSHI"
			| "ANIME"
			| "WEB_NOVEL"
			| "LIVE_ACTION"
			| "GAME"
			| "COMIC"
			| "MULTIMEDIA_PROJECT"
			| "PICTURE_BOOK";
		siteUrl: string;
		seasonYear: number;
		season: "WINTER" | "SPRING" | "SUMMER" | "FALL";
		popularity: number;
		meanScore: number;
		isLicensed: boolean;
		isAdult: boolean;
		idMal: number;
		id: number;
		genres: string[];
		format: "MANGA" | "ONE_SHOT";
		externalLinks: {
			url: string;
			type: string;
			siteId: number;
			site: string;
			id: number;
			icon: string;
			color: string;
		}[];
		endDate: {
			year: number | null;
			month: number | null;
			day: number | null;
		};

		description: string;
		coverImage: {
			medium: string;
			large: string;
			extraLarge: string;
			color: string | null;
		};
		countryOfOrigin: string;
		chapters: number | null;
		bannerImage: string;
		averageScore: number;
		characters: {
			pageInfo: {
				total: number;
				perPage: number;
				lastPage: number;
				hasNextPage: number;
				currentPage: number;
			};
			edges: Character[];
		};
	};
}
const breakpoints = {
	sm: 640,
	md: 768,
};

const MangaPage: NextPage<MangaPageProps> = ({
	manga,
	anilistData,
	currentTab: nextCurrentTab,
}) => {
	const router = useRouter();
	const { resetState } = useChapterPageStore();
	const [coverError, setCoverError] = useState(false);
	const [currentTab, setCurrentTab] = useState<
		"chapters" | "characters" | "art"
	>(nextCurrentTab);

	useEffect(() => {
		if (["chapters", "characters", "art"].includes(currentTab)) {
			if (!router.asPath.includes(`tab=${currentTab}`)) {
				if (router.asPath.includes("tab")) {
					router.push(
						router.pathname,
						router.asPath.replace(/tab\=(.+)/, `tab=${currentTab}`),
						{ shallow: true },
					);
				} else {
					router.push(
						router.pathname,
						router.asPath + `?tab=${currentTab}`,
						{ shallow: true },
					);
				}
			}
		} else {
			setCurrentTab("chapters");
		}
	}, [currentTab]);

	const chapterRageData = useMemo(() => {
		let lastValue = 0;

		const ratio = (manga.chapters?.length || 100) / 100;
		const range = Math.ceil(ratio);

		return Array.from({
			length: range > 0 ? range : 1,
		}).map(() => ({ from: lastValue, to: (lastValue += 100) }));
	}, [manga]);

	const [chapterRange, setChapterRange] = useState({
		from: chapterRageData[chapterRageData.length - 1]?.from || 0,
		to: chapterRageData[chapterRageData.length - 1]?.to || 100,
	});

	const [displayedChapters, setDisplayedChapters] = useState<Chapter[]>(
		[...manga.chapters!]
			.reverse()
			.slice(chapterRange.from, chapterRange.to)
			.reverse(),
	);

	useEffect(() => {
		setDisplayedChapters(
			[...manga.chapters!]
				.reverse()
				.slice(chapterRange.from, chapterRange.to)
				.reverse(),
		);
	}, [manga]);

	const [searchQuery, setSearchQuery] = useState("");
	const [chapterRangeSelectOpen, setChapterRangeSelectOpen] = useState(false);

	useEffect(() => {
		let searchDelay: any;
		if (!searchQuery) {
		} else {
			const chapterFuse = new Fuse(manga.chapters!, {
				keys: ["number", "name"],
			});
			const result = chapterFuse.search(searchQuery).map((x) => x.item);
			searchDelay = setTimeout(() => {
				setDisplayedChapters(result.slice(0, 250));
			}, 500);
		}

		return () => {
			clearTimeout(searchDelay);
		};
	}, [searchQuery]);

	useEffect(() => {
		if (!searchQuery) {
			const reversedChapters = [...manga.chapters!].reverse();
			setDisplayedChapters(
				reversedChapters!
					.slice(chapterRange.from, chapterRange.to)
					.reverse(),
			);
		}
	}, [searchQuery, chapterRange]);

	const source: SourceData = sourcesData[manga.source];

	return (
		<>
			<Navbar navClass="" mode="transparent"></Navbar>
			<Tabs.Root
				value={currentTab}
				onValueChange={(value: any) => setCurrentTab(value)}
			>
				<div>
					<Head>
						<title>{manga.title} Details - Easy Manga</title>
						<meta property="og:title" content={manga.title} />
						<meta
							property="og:description"
							content={manga.synopsis}
						/>
						<meta
							property="og:image"
							content={anilistData?.bannerImage || manga.cover}
						/>
					</Head>

					<div>
						<div className="relative w-full h-[16.8rem]">
							<Image
								className="w-full -z-20"
								src={
									anilistData?.bannerImage
										? getWorkersUrl(
												anilistData?.bannerImage!,
										  )
										: manga.cover
								}
								fill={true}
								objectFit="cover"
								objectPosition={"center"}
								alt={manga.title}
							></Image>
							<div
								className={`absolute bg-black/25 inset-0 ${
									anilistData?.bannerImage
										? "backdrop-blur-[2px]"
										: "backdrop-blur"
								}  -z-10`}
							></div>

							<div className="absolute bg-gradient-to-t from-black/70 bottom-0 left-0 right-0 h-20 -z-10"></div>
						</div>
						<div className="container z-50">
							<div className="md:flex gap-6 ">
								<div className="w-full max-w-[90.99vw] md:max-w-[200px]">
									<div className="-translate-y-52 md:-translate-y-60 min-w-max overflow-y-scroll scrollbar-hide">
										<div className="flex flex-col gap-4 ">
											<div>
												<div className="flex items-start gap-4 h-full max-h-[12rem] max-w-[90vw] md:max-w-full md:max-h-min overflow-hidden">
													<ShowImageModal
														imgSrc={manga.cover}
													>
														<motion.div
															layoutId="mangaCoverTrans"
															className="w-32 md:w-auto"
														>
															<Image
																onError={() =>
																	setCoverError(
																		true,
																	)
																}
																src={
																	coverError
																		? NoImagePlaceholder
																		: manga.cover
																}
																width={200}
																height={280}
																className="rounded-md object-cover"
																alt={
																	manga.title
																}
															></Image>
														</motion.div>
													</ShowImageModal>
													<h1 className="text-lg md:text-2xl font-bold text-white z-50 flex flex-col md:hidden">
														<span>
															{manga.title}
														</span>

														{anilistData && (
															<>
																<span className="font-normal text-sm">
																	{
																		anilistData
																			.title
																			.romaji
																	}
																</span>
																<span className="font-normal text-sm">
																	{
																		anilistData
																			.title
																			.native
																	}
																</span>
															</>
														)}
													</h1>
												</div>
											</div>

											<div className="flex items-center gap-2 w-full ">
												<Link
													href={`/titles/${
														manga.source
													}/${
														manga.slug
													}/chapter?id=${
														manga?.chapters?.[
															manga?.chapters
																?.length - 1
														]?.slug
													}`}
													className="p-2 text-center bg-primary hover:bg-primary-hover active:bg-primary-active w-full rounded-md text-white text-lg font-medium transition"
												>
													Start Reading
												</Link>
												<SearchBar
													noBar={true}
													initalSearchQuery={
														manga.title
													}
												></SearchBar>
											</div>

											{anilistData?.trailer?.id && (
												<a
													href={
														`https://www.youtube.com/watch?v=` +
														anilistData?.trailer?.id
													}
													rel="noreferrer"
													target="_blank"
													className="border flex rounded-md relative select-none "
												>
													<Image
														src={manga.cover}
														className="rounded-md absolute"
														fill={true}
														objectFit="cover"
														alt={manga.title}
													></Image>
													<div className="absolute rounded-md inset-0 bg-gradient-to-t from-black/80 to-black/20"></div>
													<div className="z-20 flex items-center justify-center gap-2 p-1 text-white w-full">
														<PlayCircleIcon className="h-8 w-8"></PlayCircleIcon>
														<span>
															Watch Trailer
														</span>
													</div>
												</a>
											)}

											{anilistData && (
												<div className="bg-base-100 border p-2 rounded-md flex flex-col md:flex-col-reverse max-w-[90.99vw] md:max-w-[200px] ">
													{anilistData && (
														<div className="flex items-start gap-6 overflow-scroll scrollbar-hide md:flex-col md:gap-2">
															{[
																{
																	title: "Title (English)",
																	value: `${
																		anilistData
																			.title
																			.english ||
																		manga.title
																	}`,
																},
																{
																	title: "Title (Romaji)",
																	value: `${
																		anilistData
																			.title
																			.romaji ||
																		manga.title
																	}`,
																},
																{
																	title: "Title (Native)",
																	value: `${
																		anilistData
																			.title
																			.native ||
																		manga.title
																	}`,
																},
																{
																	title: "Format",
																	value: `${anilistData.format} (${anilistData.countryOfOrigin})`,
																},
																{
																	title: "Status",
																	value: `${
																		anilistData.status ||
																		"RELEASING"
																	}`,
																},
																{
																	title: "Start Year",
																	value: `${
																		anilistData
																			.startDate
																			.year ||
																		2022
																	}`,
																},
																{
																	title: "Average Score",
																	value: `${
																		anilistData.averageScore /
																		10
																	}`,
																},
																{
																	title: "Source",
																	value: `${
																		anilistData.source ||
																		"ORIGINAL"
																	}`,
																},
																{
																	title: "Title Synonyms",
																	value: `${[
																		...(anilistData.synonyms ||
																			[]),
																		manga.title,
																	]}`,
																},
															].map(
																({
																	title,
																	value,
																}) => {
																	return (
																		<div
																			key={
																				title
																			}
																			className="flex flex-col w-full whitespace-nowrap md:whitespace-normal"
																		>
																			<span>
																				{
																					title
																				}
																			</span>
																			<span className="text-sm text-neutral-200 line-clamp-1">
																				{
																					value
																				}
																			</span>
																		</div>
																	);
																},
															)}
														</div>
													)}
												</div>
											)}
										</div>
									</div>
								</div>
								<div className="py-4 -translate-y-40 md:translate-y-0 w-full">
									<h1 className="text-5xl font-black text-white -translate-y-52 h-12 md:-translate-y-64 hidden md:block relative">
										<span className="absolute flex flex-col">
											<span>{manga.title}</span>
											{anilistData && (
												<>
													<span className="font-normal text-lg">
														{
															anilistData.title
																.romaji
														}
													</span>
													<span className="font-normal text-lg">
														{
															anilistData.title
																.native
														}
													</span>
												</>
											)}
										</span>
									</h1>

									<div className="-translate-y-12 space-y-2 ">
										<Tabs.List className="bg-base-100 p-2 rounded-md w-full md:w-fit flex items-center gap-2 mb-3">
											{[
												{
													title: "Chapters",
													value: "chapters",
													render: true,
												},
												{
													title: "Characters",
													value: "characters",
													render:
														(anilistData?.characters
															.edges?.length ||
															0) > 0,
												},
												{
													title: "Art",
													value: "art",
													render: !!manga.dexId,
												},
											]
												.filter((x) => x.render)
												.map(({ title, value }) => {
													return (
														<Tabs.Trigger
															key={title}
															value={value}
															className={`p-1 px-4 rounded-md transition w-full ${
																value ===
																currentTab
																	? "bg-primary text-white"
																	: "bg-base"
															}`}
														>
															{title}
														</Tabs.Trigger>
													);
												})}
										</Tabs.List>

										{currentTab === "chapters" && (
											<>
												<div className="flex items-center flex-wrap gap-2">
													{manga.aniId && (
														<ExternalSite
															title="Anilist"
															href={`https://anilist.co/manga/${
																manga.aniId
															}/${manga.title.replaceAll(
																" ",
																"-",
															)}`}
															ImageSrc={
																sourcesData
																	.ANILIST
																	.image
															}
														/>
													)}

													{manga.dexId && (
														<ExternalSite
															title="MangaDex"
															href={`https://mangadex.org/title/${
																manga.dexId
															}/${manga.title.replaceAll(
																" ",
																"-",
															)}`}
															ImageSrc={
																sourcesData
																	.MANGADEX
																	.image
															}
														/>
													)}
													<ExternalSite
														title={source.name}
														href={`${manga.url}`}
														ImageSrc={source.image!}
													/>
													<div className="flex items-center gap-1 select-none">
														<StarIcon className="h-6 w-6 stroke-1 fill-current text-primary"></StarIcon>
														<span>
															{manga.score ||
																"N/A"}
														</span>
													</div>
												</div>
												<div className="flex items-center flex-wrap gap-2">
													{manga.genres.map(
														(genre) => {
															return (
																<div
																	key={genre}
																	className="bg-base-100 border  select-none p-1 px-2 text-xs font-bold uppercase rounded"
																>
																	{genre}
																</div>
															);
														},
													)}
												</div>
												<div>
													<span>
														{manga.synopsis ||
															"لا يوجد ملخص للأن , نعتذر منكم!"}
													</span>
												</div>
											</>
										)}
									</div>
									<div></div>
									<Tabs.Content
										value="art"
										className="-translate-y-12"
									>
										<h3 className="text-2xl mb-4">
											Manga Covers
										</h3>
										<div className="grid grid-flow-row grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-4 gap-y-6 select-none">
											{manga.covers?.map((cover) => {
												return (
													<div key={cover.url}>
														<ShowImageModal
															imgSrc={cover.url}
														>
															<motion.div
																animate={{
																	scale: 0.8,
																	opacity: 0.9,
																}}
																whileInView={{
																	scale: 1,
																	opacity: 1,
																}}
																className="md:w-auto relative"
															>
																<ImageLegacy
																	src={
																		cover.url +
																		".256.jpg"
																	}
																	width={200}
																	height={280}
																	className="rounded-md object-cover bg-neutral-200"
																	alt={
																		manga.title +
																		cover.volume
																	}
																></ImageLegacy>
															</motion.div>
														</ShowImageModal>
														<span>
															Volume{" "}
															{cover.volume}
														</span>
													</div>
												);
											})}
										</div>
									</Tabs.Content>
									<Tabs.Content
										value="characters"
										className="-translate-y-12"
									>
										<h3 className="text-2xl mb-4">
											Manga Characters
										</h3>
										<div className="grid grid-flow-row grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-4 gap-y-6 select-none">
											{anilistData?.characters.edges?.map(
												({ node, role }) => {
													return (
														<div
															className="w-full"
															key={
																node.image.large
															}
														>
															<ShowImageModal
																imgSrc={
																	`https://workers.emanga.tk/fetch?url=` +
																	node.image
																		.large
																}
															>
																<motion.div
																	animate={{
																		scale: 0.8,
																		opacity: 0.9,
																	}}
																	whileInView={{
																		scale: 1,
																		opacity: 1,
																	}}
																	className="md:w-auto relative"
																>
																	<span className="bg-base p-1 px-2 absolute z-20 rounded-md bottom-3 left-2 text-sm ">
																		{role
																			.replace(
																				/./g,
																				(
																					str,
																				) =>
																					str.toLocaleLowerCase(),
																			)
																			.replace(
																				/./,
																				(
																					str,
																				) =>
																					str.toLocaleUpperCase(),
																			)}
																	</span>

																	<ImageLegacy
																		src={
																			`https://workers.emanga.tk/fetch?url=` +
																			node
																				.image
																				.large
																		}
																		width={
																			200
																		}
																		height={
																			280
																		}
																		className="rounded-md object-cover bg-neutral-200"
																		alt={
																			manga.title +
																			node
																				.name
																				.full
																		}
																	></ImageLegacy>
																</motion.div>
															</ShowImageModal>
															<a
																href={`https://anilist.co/character/${node.id}/${node.name.full}`}
																target="_blank"
																rel="noreferrer"
																className="hover:text-primary"
															>
																<span>
																	{
																		node
																			.name
																			.full
																	}
																</span>
															</a>
														</div>
													);
												},
											)}
										</div>
									</Tabs.Content>
									<Tabs.Content value="chapters">
										<div className="pt-6 space-y-4 -translate-y-12 w-full">
											<div className="flex justify-between items-center">
												<h3 className="text-2xl ">
													Chapters List
												</h3>
												{/*<button
											className="p-1.5 rounded-full hover:bg-neutral-100/10 focus:bg-neutral-100/15 active:bg-neutral-100/15"
											onClick={() =>
												setSort(
													sort === "asc"
														? "dec"
														: "asc",
												)
											}
										>
											<ArrowUpIcon
												className={`h-5 w-5 transition ease-in-out ${
													sort === "asc"
														? "rotate-0"
														: "rotate-180"
												}`}
											></ArrowUpIcon>
											</button>*/}
											</div>
											<div className="bg-base-100 p-3 rounded-md space-y-4">
												<div className="flex items-center gap-2 md:gap-4">
													<input
														className={`bg-base h-10 w-full pr-2 pl-4 rounded outline-none relative placeholder:text-neutral-200 placeholder:font-normal text-neutral-100 font-medium border focus:border-primary `}
														type="text"
														placeholder="Chapter Number..."
														onChange={(e) =>
															setSearchQuery(
																e.target.value,
															)
														}
													/>

													<Select.Root
														open={
															chapterRangeSelectOpen
														}
														onOpenChange={(
															open,
														) => {
															if (open) {
																setChapterRangeSelectOpen(
																	open,
																);
															} else {
																setTimeout(
																	() =>
																		setChapterRangeSelectOpen(
																			open,
																		),
																	100,
																);
															}
														}}
														onValueChange={(
															value,
														) => {
															let [from, to] =
																value.split(
																	"-",
																);
															setChapterRange({
																from: Number(
																	from,
																),
																to: Number(to),
															});
														}}
														defaultValue={`${
															chapterRageData[
																chapterRageData.length -
																	1
															].from
														}-${
															chapterRageData[
																chapterRageData.length -
																	1
															].to
														}`}
													>
														<Select.Trigger className="bg-base h-10 px-4 rounded-md border flex gap-2 items-center whitespace-nowrap">
															<Select.Value className="" />
															<Select.Icon>
																<ChevronDownIcon className="h-5 w-5"></ChevronDownIcon>
															</Select.Icon>
														</Select.Trigger>

														<Select.Portal>
															<Select.Content className="bg-base p-2 border drop-shadow-md rounded-md z-50">
																<Select.ScrollUpButton className="SelectScrollButton">
																	<ChevronUpIcon className="h-4 w-4" />
																</Select.ScrollUpButton>
																<Select.Viewport>
																	<Select.Group className="space-y-2">
																		<Select.Label />
																		{chapterRageData.map(
																			({
																				from,
																				to,
																			}) => {
																				return (
																					<Select.Item
																						key={`${from}-${to}`}
																						className="SelectItem flex items-center gap-2 py-1 px-4 relative hover:bg-primary/25 bg-base-100 border rounded-md"
																						value={`${from}-${to}`}
																					>
																						<Select.ItemText>
																							{`${from}-${to}`}
																						</Select.ItemText>
																						<Select.ItemIndicator className="">
																							<CheckIcon className="h-4 w-4 stroke-2"></CheckIcon>
																						</Select.ItemIndicator>
																					</Select.Item>
																				);
																			},
																		)}
																	</Select.Group>
																</Select.Viewport>
																<Select.ScrollDownButton className="SelectScrollButton">
																	<ChevronDownIcon className="h-4 w-4" />
																</Select.ScrollDownButton>
															</Select.Content>
														</Select.Portal>
													</Select.Root>
												</div>

												<div
													className={`grid grid-flow-row grid-cols-3 md:grid-cols-4 gap-2 w-full ${
														chapterRangeSelectOpen &&
														"select-none"
													}`}
												>
													{displayedChapters?.map(
														(chapter: Chapter) => {
															return (
																<Link
																	key={
																		chapter.slug
																	}
																	href={`/titles/${
																		manga.source
																	}/${
																		manga.slug
																	}/chapter?id=${encodeURIComponent(
																		chapter.slug!,
																	)}`}
																	className="p-2 border bg-base rounded-md flex gap-2 hover:bg-primary/10 transition"
																>
																	<span className="text-xs">
																		{
																			chapter.number
																		}
																	</span>
																	<span className="truncate line-clamp-1">
																		{
																			chapter.name
																		}
																	</span>
																</Link>
															);
														},
													)}
												</div>
											</div>
										</div>
									</Tabs.Content>
								</div>
							</div>
						</div>
					</div>
				</div>
			</Tabs.Root>
		</>
	);
};

/*


*/

export default MangaPage;

export const getServerSideProps: GetServerSideProps = async ({
	params,
	query,
}) => {
	let { source, slug } = params! as { [index: string]: string };
	let { tab } = query! as { [index: string]: string };

	const { data } = await client.query({
		query: gql`
			query Manga($mangaUniqueInput: MangaUniqueInput!) {
				manga(mangaUniqueInput: $mangaUniqueInput) {
					url
					type
					title
					synopsis
					status
					source
					slug
					score
					releaseYear
					muId
					genres
					dexId
					cover
					covers {
						url
						volume
					}
					chapters {
						url
						source
						slug
						number
						name
						mangaSlug
					}
					author
					artist
					aniId
					altTitles
				}
			}
		`,
		variables: {
			mangaUniqueInput: {
				source,
				slug,
			},
		},
	});

	const { manga } = data;

	if (manga.aniId) {
		const { data: anilistData } = await anilistClient.query({
			query: gql`
				query Media($mediaId: Int, $type: MediaType, $search: String) {
					Media(id: $mediaId, type: $type, search: $search) {
						volumes
						updatedAt
						type
						trending
						trailer {
							thumbnail
							site
							id
						}
						title {
							romaji
							native
							english
						}
						tags {
							name
							rank
							id
							isAdult
							isGeneralSpoiler
							isMediaSpoiler
							description
							category
						}
						synonyms
						studios {
							pageInfo {
								total
								perPage
								lastPage
								hasNextPage
								currentPage
							}
							nodes {
								siteUrl
								name
								id
							}
						}
						status
						startDate {
							year
							month
							day
						}
						staff {
							pageInfo {
								total
								perPage
								lastPage
								hasNextPage
								currentPage
							}
							edges {
								role
								node {
									id
									image {
										medium
										large
									}
									name {
										native
										middle
										last
										full
										first
										alternative
									}
								}
							}
						}
						source
						siteUrl
						seasonYear
						season
						popularity
						meanScore
						isLicensed
						isAdult
						idMal
						id
						genres
						format
						externalLinks {
							url
							type
							siteId
							site
							id
							icon
							color
						}
						endDate {
							year
							month
							day
						}
						episodes
						duration
						description
						coverImage {
							medium
							large
							extraLarge
							color
						}
						countryOfOrigin
						chapters
						bannerImage
						averageScore
						characters {
							pageInfo {
								total
								perPage
								lastPage
								hasNextPage
								currentPage
							}
							edges {
								role
								node {
									name {
										native
										middle
										last
										full
										first
										alternativeSpoiler
										alternative
									}
									image {
										large
										medium
									}
									id
									gender
									favourites
									description
									dateOfBirth {
										year
										month
										day
									}
									bloodType
									age
								}
							}
						}
					}
				}
			`,
			variables: {
				//search: manga.title,
				mediaId: manga.aniId ? manga.aniId : undefined,
				type: "MANGA",
			},
		});

		//console.log(anilistData.Media)

		return {
			props: {
				anilistData: anilistData.Media,
				manga,
				currentTab: ["chapters", "characters", "art"].includes(tab)
					? tab
					: "chapters",
			},
		};
	}

	return {
		props: {
			manga,
		},
	};
};
