import type { GetServerSideProps, GetStaticProps, NextPage } from "next";
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
import "swiper/css/bundle";
import { Swiper, SwiperSlide } from "swiper/react";
import {
	A11y,
	EffectCube,
	FreeMode,
	Keyboard,
	Manipulation,
	Mousewheel,
	Virtual,
	Pagination,
	Navigation,
} from "swiper";
import Image from "next/image";
import {
	ArrowLeftIcon,
	ArrowRightIcon,
	BookOpenIcon,
	ChevronLeftIcon,
	ChevronRightIcon,
	StarIcon,
} from "@heroicons/react/24/outline";
import ExternalSite from "../components/Ui/ExternalSite";
import { sourcesData } from "../utils/sourcesData";
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
	const Header: any = tw.h1`text-2xl font-semibold mb-2`;

	return (
		<PageLayout>
			<div className="my-4 mb-16 md:my-12 space-y-4">
				<Head>
					<title>
						Easiest way to read manga for free! - Easy Manga
					</title>
					<meta
						property="og:title"
						content={`Easiest way to read manga for free! - Easy Manga`}
					/>
					<meta
						property="og:description"
						content={`Easiest way to read manga for free! - Easy Manga`}
					/>
				</Head>

				<div className="flex flex-col gap-2 rounded-xl">
					<Header>Popular Manga</Header>
					<Swiper
						className="select-none w-full"
						effect={"fade"}
						lazy={true}
						longSwipes={true}
						longSwipesMs={800}
						speed={500}
						freeMode={false}
						longSwipesRatio={0.2}
						slidesPerView={1}
						slideToClickedSlide={false}
						centeredSlides={true}
						autoplay={true}
						keyboard={{ enabled: true }}
						mousewheel={true}
						navigation={{
							nextEl: "#slide-next",
							prevEl: "#slide-prev",
							hiddenClass: "bg-root-100",
							disabledClass: "bg-root-100",
							lockClass: "bg-root-100",
						}}
						pagination={{
							el: ".swiper-pagination",
							type: "bullets",
						}}
						modules={[
							FreeMode,
							Keyboard,
							Mousewheel,
							A11y,
							EffectCube,
							Manipulation,
							Pagination,
							Navigation,
						]}
					>
						{popularMangaList.map((manga, index) => {
							const source = sourcesData[manga.source];
							const mangaCover = manga.dexId
								? manga.cover.replace(
										"&referer=",
										".256.jpg&referer=",
								  )
								: manga.cover;

							return (
								<SwiperSlide
									key={manga.slug}
									className="relative"
								>
									<Link
										href={`/titles/${manga.source}/${manga.slug}?tab=chapters`}
										className=""
									>
										<div className="relative w-full h-52 md:h-80">
											<Image
												className="w-full -z-20 rounded-lg  object-cover bg-center bg-neutral-200"
												src={mangaCover}
												fill={true}
												alt={manga.title}
											></Image>
											<div
												className={`absolute -inset-[1.5px] banner-bg rounded-lg z-40 backdrop-blur-xl p-4 flex items-start gap-4`}
											>
												<Image
													src={mangaCover}
													className="object-cover rounded-md shadow-lg h-full w-auto"
													width={200 / 2}
													height={280 / 2}
													alt={manga.title}
												></Image>
												<div className="flex flex-col h-full justify-between w-full">
													<div>
														<h1 className="text-lg md:text-3xl font-extrabold text-neutral z-50 flex flex-col">
															<span>
																{manga.title}
															</span>

															{manga.altTitles &&
																manga.altTitles
																	.slice(0, 4)
																	.map(
																		(
																			title,
																			index,
																		) => {
																			return (
																				<span
																					key={
																						"popular" +
																						manga.slug +
																						index
																					}
																					className={`font-normal line-clamp-2 text-sm ${
																						index !==
																							0 &&
																						"hidden md:block"
																					}`}
																				>
																					{
																						title
																					}
																				</span>
																			);
																		},
																	)}
														</h1>
													</div>

													<div className="flex gap-4 justify-between w-full">
														<div className="flex items-center flex-wrap gap-2 md:hidden">
															{manga.aniId && (
																<ExternalSite
																	small={true}
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

															{manga.dexId &&
																!manga.aniId && (
																	<ExternalSite
																		small={
																			true
																		}
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
														</div>
														<div className="hidden items-center flex-wrap gap-2 md:flex">
															{manga.aniId && (
																<ExternalSite
																	small={true}
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
																	small={true}
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
																small={true}
																title={
																	source.name
																}
																href={`${manga.url}`}
																ImageSrc={
																	source.image!
																}
															/>
														</div>
														<p
															title={`manga score ${manga.score}`}
															className="flex items-center font-semibold gap-2 line-clamp-1"
														>
															<StarIcon className="h-5 w-5 fill-current" />
															{manga.score ||
																"N/A"}
														</p>
													</div>
												</div>
											</div>
										</div>
									</Link>
								</SwiperSlide>
							);
						})}

						<div className="md:flex items-center gap-2 absolute top-4 right-4 z-40 hidden">
							<button
								id="slide-prev"
								className="bg-root hover:bg-root-100 active:bg-root-100/50 p-2 rounded-full transition disabled:opacity-50 disabled:hover:bg-root disabled:active:bg-root"
							>
								<ChevronLeftIcon className="h-6 w-6 text-neutral "></ChevronLeftIcon>
							</button>
							<button
								id="slide-next"
								className="bg-root hover:bg-root-100 active:bg-root-100/50 p-2 rounded-full transition disabled:opacity-50 disabled:hover:bg-root disabled:active:bg-root"
							>
								<ChevronRightIcon className="h-6 w-6 text-neutral"></ChevronRightIcon>
							</button>
						</div>
					</Swiper>
					<Link
						className="self-end my-2 text-sm text-neutral-200 font-medium hover:text-neutral"
						href={"/titles"}
					>
						View All
					</Link>
				</div>

				<div className="flex gap-2 flex-col">
					<Header>Latest Chapters</Header>
					<MangaCardHorizontalList
						mangaList={latestUpdatesList}
					></MangaCardHorizontalList>
					<Link
						className="self-end my-2 text-sm text-neutral-200 font-medium hover:text-neutral"
						href={"/titles"}
					>
						View All
					</Link>
				</div>

				<MangaListRow
					mangaList={recentlyAddedMangaList}
					title={"Recently Added"}
					href={"/titles?orderBy=latest"}
				></MangaListRow>
			</div>
		</PageLayout>
	);
};

export const getStaticProps: GetStaticProps = async ({}) => {
	let { source } = { source: "MANGAKAKALOT" };

	//console.log(source);

	const { data } = await client.query({
		query: gql`
			fragment MangaFields on Manga {
				dexId
				aniId
				muId
				slug
				url
				cover
				title
				altTitles
				genres
				synopsis
				status
				type
				author
				artist
				releaseYear
				score
				chapters {
					name
					number
				}
				source
			}
			query HomePageQuery(
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

		revalidate: 900,
	};
};

export default Home;
