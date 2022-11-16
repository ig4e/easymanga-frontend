import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { motion } from "framer-motion";
import { Manga } from "../../../../typings/manga";
import { anilistClient, client } from "../../../../apollo-client";
import { gql } from "@apollo/client";
import { MANGA_FIELDS } from "../../../../apollo/fragments";
import ShowImageModal from "../../../../components/Ui/ShowImageModal";
import { getRandomEmoji } from "../../../../utils/getRandomEmoji";
import ExternalSite from "../../../../components/Ui/ExternalSite";

import AnilistLogo from "../../../../public/images/logos/anilist.png";
import MDLogo from "../../../../public/images/logos/mangadex.png";
import AresLogo from "../../../../public/images/logos/ares.png";
import AzoraLogo from "../../../../public/images/logos/azora.png";
import MangaSwatLogo from "../../../../public/images/logos/mangaswat.png";
import OuzlScansLogo from "../../../../public/images/logos/ouzlscans.png";
import FlameScansLogo from "../../../../public/images/logos/flamescans.png";
import {
	ArrowDownIcon,
	ArrowUpIcon,
	StarIcon,
} from "@heroicons/react/24/outline";
import { PlayCircleIcon } from "@heroicons/react/24/solid";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ANILIST_MEDIA_QUERY } from "../../../../apollo/queries";
import CharacterCard from "../../../../components/Ui/CharacterCard";
import { getWorkersUrl } from "../../../../utils/getImageUrl";

const sourcesData = {
	ARES: { name: "Ares Manga", image: AresLogo },
	GALAXYMANGA: { name: "Galaxy Manga", image: FlameScansLogo },
	AZORA: { name: "Manga Azora", image: AzoraLogo },
	MANGASWAT: { name: "Manga Swat", image: MangaSwatLogo },
	OZULSCANS: { name: "Ozul Scans", image: OuzlScansLogo },

	MANGAAE: { name: "Manga Ae", image: undefined },
	MANGALEK: { name: "MangaLek", image: undefined },
	MANGASPARK: { name: "Manga Spark", image: undefined },
};

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
	const source = sourcesData[manga.source];
	const [sort, setSort] = useState<"asc" | "dec">("asc");

	function stateReverse(arr: any) {
		if (sort === "asc") return arr;
		return arr.reverse();
	}

	return (
		<div>
			<Head>
				<title>{manga.title} Details - Easy Manga</title>
			</Head>

			<div>
				<div className="relative w-full h-60">
					<Image
						className="w-full -z-20"
						src={
							anilistData?.bannerImage
								? getWorkersUrl(anilistData?.bannerImage)
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
										<ShowImageModal imgSrc={manga.cover}>
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
										}/${
											manga?.chapters?.[
												manga?.chapters?.length - 1
											].slug
										}`}
									>
										<button className="p-2 bg-primary hover:bg-primary-hover active:bg-primary-active w-full rounded-md text-white text-lg font-medium transition">
											Start Reading
										</button>
									</Link>
								</div>

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

								{anilistData && anilistData?.characters.edges.length > 0 && (
									<div className="bg-base-100 border p-2 rounded-md">
										<div className="flex md:grid md:grid-flow-row md:grid-cols-2 gap-1.5">
											{anilistData?.characters.edges
												.slice(
													0,
													width < breakpoints["md"]
														? 4
														: anilistData
																?.characters
																.edges.length,
												)
												.map((edge) => (
													<CharacterCard
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
											ImageSrc={AnilistLogo}
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
											ImageSrc={MDLogo}
										/>
									)}
									<ExternalSite
										title={source.name}
										href={`${manga.url}`}
										ImageSrc={source.image!}
									/>
									<div className="flex items-center gap-1">
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
									<h3 className="text-2xl ">Chapters List</h3>
									<button
										className="p-1.5 rounded-full hover:bg-neutral-100/10 focus:bg-neutral-100/15 active:bg-neutral-100/15"
										onClick={() =>
											setSort(
												sort === "asc" ? "dec" : "asc",
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
									</button>
								</div>
								<div className="grid grid-flow-row grid-cols-3 md:grid-cols-4 gap-2 w-full bg-base-100 p-3 rounded-md">
									{stateReverse(
										manga.chapters?.map((chapter) => {
											return (
												<Link
													key={chapter.slug}
													href={`/titles/${manga.source}/${manga.slug}/${chapter.slug}`}
												>
													<a
														href={`/titles/${manga.source}/${manga.slug}/${chapter.slug}`}
														className="p-2 border bg-base rounded-md flex gap-2 hover:bg-primary/10 transition"
													>
														<span className="text-xs">
															{chapter.number}
														</span>
														<span>
															{chapter.name}
														</span>
													</a>
												</Link>
											);
										}),
									)}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
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

	if (manga.aniId)  {
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
