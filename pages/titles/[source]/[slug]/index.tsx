import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
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

import { sourcesData } from "../../../../utils/sourcesData";

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

const MangaPage: NextPage<MangaPageProps> = ({ manga, anilistData }) => {
	const [width, setWidth] = useState(0);
	useEffect(() => {
		setWidth(window.innerWidth);
		window.addEventListener("resize", () => setWidth(window.innerWidth));
		return () =>
			window.removeEventListener("resize", () =>
				setWidth(window.innerWidth),
			);
	}, []);

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

	const [searchQuery, setSearchQuery] = useState("");

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

	const source = sourcesData[manga.source];

	return (
		<>
			<Navbar navClass="hidden md:block"></Navbar>

			<div>
				<Head>
					<title>{manga.title} Details - Easy Manga</title>
					<link rel="manifest" href="/manifest.json" />
					<meta name="theme-color" content="#FFFFFF" />
				</Head>

				<div>
					<div className="relative w-full h-60">
						<Image
							className="w-full -z-20"
							src={
								anilistData?.bannerImage
									? getWorkersUrl(anilistData?.bannerImage!)
									: manga.cover
							}
							layout="fill"
							objectFit="cover"
							objectPosition="center"
						></Image>
						<div
							className={`absolute bg-black/25 inset-0 ${
								anilistData?.bannerImage
									? "backdrop-blur-sm"
									: "backdrop-blur"
							}  -z-10`}
						></div>

						<div className="absolute bg-gradient-to-t from-black/70 bottom-0 left-0 right-0 h-20 -z-10"></div>
					</div>
					<div className="container z-50">
						<div className="md:flex gap-6">
							<div className="-translate-y-52 min-w-max">
								<div className="flex flex-col gap-4">
									<div>
										<div className="flex items-start gap-4 h-full max-h-[12rem] max-w-[90vw] md:max-w-full md:max-h-min overflow-hidden">
											<ShowImageModal
												imgSrc={manga.cover}
											>
												<div className="w-32 md:w-auto">
													<Image
														src={manga.cover}
														width={200}
														height={280}
														className="rounded-md object-cover"
													></Image>
												</div>
											</ShowImageModal>
											<h1 className="text-2xl font-bold text-white z-50 md:hidden">
												{manga.title}
											</h1>
										</div>
										<Link
											href={`/titles/${manga.source}/${
												manga.slug
											}/chapter?id=${
												manga?.chapters?.[
													manga?.chapters?.length - 1
												]?.slug
											}`}
										>
											<button className="p-2 bg-primary hover:bg-primary-hover active:bg-primary-active w-full rounded-md text-white text-lg font-medium transition">
												Start Reading
											</button>
										</Link>
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
												layout="fill"
												objectFit="cover"
											></Image>
											<div className="absolute rounded-md inset-0 bg-gradient-to-t from-black/80 to-black/20"></div>
											<div className="z-20 flex items-center justify-center gap-2 p-1 text-white w-full">
												<PlayCircleIcon className="h-8 w-8"></PlayCircleIcon>
												<span>Watch Trailer</span>
											</div>
										</a>
									)}

									{anilistData &&
										anilistData?.characters.edges.length >
											0 && (
											<div className="bg-base-100 border p-2 rounded-md">
												<div className="flex md:grid md:grid-flow-row md:grid-cols-2 gap-1.5">
													{anilistData?.characters.edges
														.slice(
															0,
															width <
																breakpoints[
																	"md"
																]
																? 4
																: anilistData
																		?.characters
																		.edges
																		.length,
														)
														.map((edge) => (
															<CharacterCard
																key={
																	edge?.node
																		?.id
																}
																character={edge}
															></CharacterCard>
														))}
												</div>
											</div>
										)}
								</div>
							</div>
							<div className="py-4 -translate-y-40 md:translate-y-0 w-full">
								<h1 className="text-4xl font-bold text-white -translate-y-52 hidden md:block">
									{manga.title}
								</h1>

								<div className="-translate-y-12 space-y-2">
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
													sourcesData.ANILIST.image
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
													sourcesData.MANGADEX.image
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
											<span>{manga.score || "N/A"}</span>
										</div>
									</div>
									<div className="flex items-center flex-wrap gap-2">
										{manga.genres.map((genre) => {
											return (
												<div
													key={genre}
													className="bg-base-100 border  select-none p-1 px-2 text-xs font-bold uppercase rounded"
												>
													{genre}
												</div>
											);
										})}
									</div>
									<div>
										<span>
											{manga.synopsis ||
												"لا يوجد ملخص للأن, نعتذر منكم!"}
										</span>
									</div>
								</div>
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
										<div className="flex items-center gap-4">
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
												onValueChange={(value) => {
													let [from, to] =
														value.split("-");
													setChapterRange({
														from: Number(from),
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

										<div className="grid grid-flow-row grid-cols-3 md:grid-cols-4 gap-2 w-full">
											{displayedChapters?.map(
												(chapter: Chapter) => {
													return (
														<Link
															key={chapter.slug}
															href={`/titles/${
																manga.source
															}/${
																manga.slug
															}/chapter?id=${encodeURIComponent(
																chapter.slug!,
															)}`}
														>
															<a
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
															</a>
														</Link>
													);
												},
											)}
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

/*


*/

export default MangaPage;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
	let { source, slug } = params! as { [index: string]: string };

	console.log(params);

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
			},
		};
	}

	return {
		props: {
			manga,
		},
	};
};
