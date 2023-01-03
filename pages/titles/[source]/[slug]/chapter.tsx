import { gql } from "@apollo/client";
import {
	ArrowUturnLeftIcon,
	Bars3Icon,
	ChevronDownIcon,
	ChevronLeftIcon,
	ChevronRightIcon,
	Cog6ToothIcon,
	MinusIcon,
	PlusIcon,
	XMarkIcon,
} from "@heroicons/react/24/outline";
import { GetServerSideProps, NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { client } from "../../../../apollo-client";
import ChapterPageLoader from "../../../../components/Ui/ChapterPageLoader";
import Logo from "../../../../public/logo.png";
import * as Slider from "@radix-ui/react-slider";
import ChapterPageSettingsMenu, {
	ChapterNavigationMode,
	Quality,
} from "../../../../components/Ui/ChapterPageSettingsMenu";
import { Chapter } from "../../../../typings/chapter";
import { useRouter } from "next/router";
import { useChapterPageStore, useUserSettingsStore } from "../../../../store";
import { AnimatePresence, motion } from "framer-motion";
import { getRandomEmoji } from "../../../../utils/getRandomEmoji";

import SmolImg from "../../../../public/images/smol.png";
import ChapterPageChaptersMenu from "../../../../components/Ui/ChapterPageChaptersMenu";
import Head from "next/head";
import CommentsDialog from "../../../../components/CommentsDialog";
import { Manga } from "../../../../typings/manga";

interface IPageProps {
	manga: { title: string; slug: string; chapters: Chapter[] };
	chapter: Chapter;
}
const breakpoints = {
	sm: 640,
	md: 768,
};
const Chapter: NextPage<IPageProps> = ({ chapter, manga }) => {
	const [width, setWidth] = useState(0);
	const [showBars, setShowBars] = useState(true);
	const [currentPageId, setCurrentPageId] = useState<string>("");
	const router = useRouter();

	const chapterPageQuality = useUserSettingsStore(
		(state) => state.chapterPageQuality,
	);
	const chapterPageScale = useUserSettingsStore(
		(state) => state.chapterPageScale,
	);
	const chapterPageNavigationMode = useUserSettingsStore(
		(state) => state.chapterPageNavigationMode,
	);
	const setChapterPageNavigationMode = useUserSettingsStore(
		(state) => state.setChapterPageNavigationMode,
	);
	const setChapterPageQuality = useUserSettingsStore(
		(state) => state.setChapterPageQuality,
	);
	const setChapterPageScale = useUserSettingsStore(
		(state) => state.setChapterPageScale,
	);

	const loading = useChapterPageStore((state) => state.loading);
	const allChapters = useChapterPageStore((state) => state.allChapters);
	const currentChapter = useChapterPageStore((state) => state.currentChapter);
	const setAllChapters = useChapterPageStore((state) => state.setAllChapters);
	const setCurrentChapter = useChapterPageStore(
		(state) => state.setCurrentChapter,
	);
	const addChapter = useChapterPageStore((state) => state.addChapter);
	const addPrevChapter = useChapterPageStore((state) => state.addPrevChapter);

	const resetState = useChapterPageStore((state) => state.resetState);
	const currentChapterProgress = useChapterPageStore(
		(state) => state.currentChapterProgress,
	);
	const setCurrentChapterProgress = useChapterPageStore(
		(state) => state.setCurrentChapterProgress,
	);

	const setLoading = useChapterPageStore((state) => state.setLoading);

	useEffect(() => {
		console.log(currentChapter.slug);
		const [chapterSlug, pageNumber] = currentPageId.split("[P]");
		if (currentChapter && chapterSlug) {
			const pageNumberNumber = Number(pageNumber);
			setCurrentChapterProgress(pageNumberNumber);

			if (
				chapterPageNavigationMode === "scroll" &&
				pageNumberNumber === currentChapter.pages?.length
			) {
				setLoading(true);
				if (currentChapter.nextSlug)
					router.push(
						`/titles/${currentChapter.source}/${
							manga.slug
						}/chapter?id=${encodeURIComponent(
							currentChapter.nextSlug,
						)}`,
						undefined,
						{ scroll: false },
					);
			} else if (
				chapterPageNavigationMode === "scroll" &&
				pageNumberNumber === 0
			) {
				setLoading(true);
				if (currentChapter.prevSlug)
					router.push(
						`/titles/${currentChapter.source}/${
							manga.slug
						}/chapter?id=${encodeURIComponent(
							currentChapter.prevSlug,
						)}`,
						undefined,
						{ scroll: false },
					);
			}

			if (chapterSlug !== currentChapter.slug) {
				const chapterData = allChapters.find(
					(x) => x.slug === chapterSlug,
				);

				if (chapterData) {
					setCurrentChapter(chapterData);
					setCurrentChapterProgress(1);
				}
			}
		}
	}, [currentPageId]);

	function setPageProgress(id: string) {
		setCurrentPageId(id);
	}

	useEffect(() => {
		setWidth(window.innerWidth);
		window.addEventListener("resize", () => setWidth(window.innerWidth));
		return () =>
			window.removeEventListener("resize", () =>
				setWidth(window.innerWidth),
			);
	}, []);

	useEffect(() => {
		resetState();
		setCurrentChapter(chapter);
	}, []);

	useEffect(() => {
		if (chapterPageNavigationMode === "scroll") {
			if (!allChapters.find((xC) => xC.slug === chapter.slug)) {
				setLoading(false);
				if (allChapters.find((x) => x.prevSlug === chapter.slug)) {
					addPrevChapter(chapter);
				} else {
					addChapter(chapter);
				}
			}
		} else {
			setCurrentChapter(chapter);
			setAllChapters([chapter]);
		}
	}, [chapter.slug]);

	return (
		<div className="bg-[#212121] text-reverse min-h-screen ">
			<Head>
				<title>
					{manga.title} Chapter {chapter.name} - Easy Manga
				</title>
				<meta property="og:title" content={manga.title} />
				<meta
					property="og:description"
					content={`${manga.title} Chapter ${chapter.name}`}
				/>
				<meta property="og:image" content={chapter?.pages?.[0]} />
			</Head>
			<div
				className={`bg-black/70 h-12 fixed top-0 inset-x-0 z-50 ${
					showBars
						? "opacity-100"
						: "-translate-y-24 pointer-events-none opacity-0"
				} transition duration-500 ease-in-out`}
			>
				<div className="flex items-center container h-full w-full">
					<Link
						href={"/"}
						className="mr-auto flex-1 md:flex justify-start hidden"
					>
						<div className="items-center space-x-2 flex">
							<div className="h-8 w-8 rounded-md">
								<Image
									className="rounded-md"
									src={"/assets/logo-128x128.png"}
									width={128}
									height={128}
									alt={"easy manga logo"}
								></Image>
							</div>
							<h1 className="font-semibold text-lg mt-1">
								Easy Manga
							</h1>
						</div>
					</Link>

					<div className="flex-1 flex justify-start md:justify-center">
						<div className="flex items-center gap-2">
							<Link
								href={`/titles/${currentChapter.source}/${manga.slug}`}
							>
								<div className="p-1 hover:bg-white/25 rounded-md">
									<ArrowUturnLeftIcon className="h-6 w-6 md:hidden"></ArrowUturnLeftIcon>
								</div>
							</Link>
							<div className="flex flex-col items-start md:flex-row md:items-center md:gap-2 text-start">
								<Link
									href={`/titles/${currentChapter.source}/${manga.slug}`}
									className="md:px-2 md:py-1 hover:bg-white/25 rounded select-none whitespace-nowrap text-ellipsis"
								>
									{manga.title}
								</Link>
								<ChevronRightIcon className="h-3 w-3 stroke-1.5 hidden md:block"></ChevronRightIcon>
								<Link
									href={`/titles/${currentChapter.source}/${
										currentChapter.mangaSlug
									}/chapter?id=${encodeURIComponent(
										currentChapter.slug!,
									)}`}
									className="text-xs text-reverse/60 md:text-reverse/60 md:text-reverse md:px-2 md:py-2 hover:bg-white/25 rounded select-none  whitespace-nowrap text-ellipsis"
								>
									{currentChapter.name}
								</Link>
							</div>
						</div>
					</div>

					<Link
						href={`/titles/${currentChapter.source}/${manga.slug}`}
						className="ml-auto flex-1 md:flex justify-end hidden"
					>
						<button className="md:px-2 md:py-1 hover:bg-white/25 rounded select-none whitespace-nowrap text-ellipsis">
							<ArrowUturnLeftIcon className="h-6 w-6 hidden md:block"></ArrowUturnLeftIcon>
						</button>
					</Link>
				</div>
			</div>

			<div
				className="fixed inset-0 z-20"
				onClick={() => setShowBars((state) => !state)}
			/>

			<div className="">
				<div
					className="mx-auto select-none"
					style={{
						maxWidth: `${
							(width < breakpoints["md"]
								? 200
								: chapterPageScale || 100) / 2
						}%`,
					}}
				>
					{
						allChapters!.map((chapter, chapterIndex) => {
							const lastChapter = allChapters.find(
								(x) => x.slug === chapter.prevSlug,
							);

							return (
								<div
									id={`${chapter.slug}[P]pages`}
									key={`${chapter.slug}[P]pages`}
									className="relative"
								>
									{chapterIndex !== 0 && (
										<div className="py-4 flex flex-col items-center justify-center gap-2">
											<div className="flex flex-col items-start gap-2">
												<span className="text-ellipsis">
													Previous:{" "}
													{lastChapter?.name}
												</span>
												<ChevronDownIcon className="w-5 h-5 self-center"></ChevronDownIcon>
												<span className="text-ellipsis">
													Next: {chapter?.name}
												</span>
											</div>
										</div>
									)}

									{chapter.pages!.map((page, index) => {
										if (!chapterPageQuality) return null;
										const pageId = `${chapter.slug}[P]${
											index + 1
										}`;
										return (
											<ChapterPageLoader
												quality={chapterPageQuality}
												key={pageId}
												src={page}
												id={pageId}
												setProgress={(id) =>
													setPageProgress(id)
												}
											></ChapterPageLoader>
										);
									})}
								</div>
							);
						}, []) as any
					}
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
			</div>

			<div
				className={`bg-black/70 fixed bottom-0 py-4 inset-x-0 z-50 ${
					showBars
						? "opacity-100"
						: "translate-y-24 pointer-events-none opacity-0"
				} transition duration-500 ease-in-out`}
			>
				<div className="flex flex-col md:flex-row md:items-center md:justify-between container h-full w-full">
					<div className="rounded-full border border-white/60 py-2 px-4 items-center gap-4 hidden md:flex">
						<button
							onClick={() =>
								setChapterPageScale(
									chapterPageScale <= 20
										? 20
										: chapterPageScale - 10,
								)
							}
						>
							<MinusIcon className="w-4 h-4 stroke-2"></MinusIcon>
						</button>

						<span className="text-sm text-reverse/60">
							{chapterPageScale}%
						</span>

						<button
							onClick={() =>
								setChapterPageScale(
									chapterPageScale >= 200
										? 200
										: chapterPageScale + 10,
								)
							}
						>
							<PlusIcon className="w-4 h-4 stroke-2"></PlusIcon>
						</button>
					</div>

					<div className="flex items-center gap-4">
						<span className="text-reverse/60 whitespace-nowrap">
							{currentChapterProgress} /{" "}
							{currentChapter.pages?.length}
						</span>
						<Slider.Root
							onValueChange={(value) => {
								const [progress] = value;
								if (document)
									document
										.getElementById(
											`pg-${currentChapter.slug}[P]` +
												progress,
										)
										?.scrollIntoView();
								setCurrentChapterProgress(progress);
							}}
							value={[currentChapterProgress]}
							className={`relative flex items-center w-full md:w-96 touch-action ${
								chapterPageNavigationMode === "scroll" && "my-4"
							}`}
							max={currentChapter.pages?.length}
							defaultValue={[1]}
							min={1}
							step={1}
							aria-label="Page"
						>
							<Slider.Track className="bg-white/40 relative flex-grow rounded h-0.5">
								<Slider.Range className="absolute h-full " />
							</Slider.Track>
							<Slider.Thumb className="block bg-primary hover:bg-primary-hover active:bg-primary-active w-2 h-4 " />
						</Slider.Root>

						{(typeof window !== "undefined"
							? chapterPageNavigationMode
							: "buttons") === "buttons" && (
							<div className="flex items-center gap-2">
								{currentChapter.prevSlug && (
									<Link
										href={`/titles/${
											currentChapter.source
										}/${
											manga.slug
										}/chapter?id=${encodeURIComponent(
											currentChapter.prevSlug!,
										)}`}
									>
										<div
											className={`flex items-center gap-2 hover:bg-white/25 rounded-md p-2`}
										>
											<ChevronLeftIcon className="h-5 w-5"></ChevronLeftIcon>
											<span className="hidden md:block">
												Previous
											</span>
										</div>
									</Link>
								)}

								{currentChapter.nextSlug && (
									<Link
										href={`/titles/${
											currentChapter.source
										}/${
											manga.slug
										}/chapter?id=${encodeURIComponent(
											currentChapter.nextSlug!,
										)}`}
									>
										<div
											className={`flex items-center gap-2 hover:bg-white/25 rounded-md p-2`}
										>
											<span className="hidden md:block">
												Next
											</span>
											<ChevronRightIcon className="h-5 w-5"></ChevronRightIcon>
										</div>
									</Link>
								)}
							</div>
						)}
					</div>

					<div className="self-center flex gap-4 items-center">
						<ChapterPageSettingsMenu
							setQuality={setChapterPageQuality}
							quality={chapterPageQuality || "raw"}
							chapterNavigationMode={
								chapterPageNavigationMode || "scroll"
							}
							setChapterNavigationMode={
								setChapterPageNavigationMode
							}
						></ChapterPageSettingsMenu>
						<CommentsDialog manga={manga as Manga} chapter={chapter}></CommentsDialog>
						{/*<ChapterPageChaptersMenu
							chapters={manga.chapters}
						></ChapterPageChaptersMenu>*/}
					</div>
				</div>
			</div>
		</div>
	);
};

export const getServerSideProps: GetServerSideProps = async ({
	params,
	query,
}) => {
	const { source, slug: mangaSlug } = params as { [index: string]: string };
	const { id } = query as { [index: string]: string };

	console.log(source, mangaSlug, id);

	/*

	*/

	const { data } = await client.query({
		query: gql`
			query Chapter($chapterUniqueInput: ChapterUniqueInput!) {
				chapter(chapterUniqueInput: $chapterUniqueInput) {
					url
					slug
					mangaSlug
					name
					number
					createdAt
					nextSlug
					prevSlug
					pages
					source
				}
			}
		`,
		variables: {
			chapterUniqueInput: {
				source: source,
				slug: id,
			},
		},
	});

	const { data: mangaData } = await client.query({
		query: gql`
			query Manga($mangaUniqueInput: MangaUniqueInput!) {
				manga(mangaUniqueInput: $mangaUniqueInput) {
					slug
					title
					chapters {
						url
						slug
						mangaSlug
						name
						number
						createdAt
						nextSlug
						prevSlug
						pages
						source
					}
				}
			}
		`,
		variables: {
			mangaUniqueInput: {
				source: source,
				slug: mangaSlug,
			},
		},
	});

	return {
		props: {
			chapter: data.chapter,
			manga: mangaData.manga,
		},
	};
};

export default Chapter;
