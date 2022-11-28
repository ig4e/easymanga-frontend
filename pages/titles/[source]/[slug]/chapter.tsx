import { gql } from "@apollo/client";
import {
	ArrowUturnLeftIcon,
	Bars3Icon,
	ChevronLeftIcon,
	ChevronRightIcon,
	Cog6ToothIcon,
	MinusIcon,
	PlusIcon,
} from "@heroicons/react/24/outline";
import { GetServerSideProps, NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { client } from "../../../../apollo-client";
import ChapterPageLoader from "../../../../components/Ui/ChapterPageLoader";
import Logo from "../../../../public/logo.png";
import * as Slider from "@radix-ui/react-slider";
import ChapterPageSettingsMenu, {
	Quality,
} from "../../../../components/Ui/ChapterPageSettingsMenu";

interface IPageProps {
	manga: { title: string, slug: string };
	chapter: {
		url: string;
		slug: string;
		mangaSlug: string;
		name: string;
		number: number;
		createdAt: Date;
		nextSlug: string;
		prevSlug: string;
		pages: string[];
		otherChapters: {
			url: string;
			slug: string;
			mangaSlug: string;
			name: string;
			number: number;
			createdAt: Date;
			nextSlug: string;
			prevSlug: string;
			pages: string[];
			source: string;
		};
		source: string;
	};
}
const breakpoints = {
	sm: 640,
	md: 768,
};
const Chapter: NextPage<IPageProps> = ({ chapter, manga }) => {
	const [progress, setProgress] = useState(1);
	const [pageScale, setPageScale] = useState(0);
	const [width, setWidth] = useState(0);
	const [quality, setQuality] = useState<"raw" | "hd" | "sd" | "ld">();
	const [showBars, setShowBars] = useState(true);

	useEffect(() => {
		setWidth(window.innerWidth);
		window.addEventListener("resize", () => setWidth(window.innerWidth));
		return () =>
			window.removeEventListener("resize", () =>
				setWidth(window.innerWidth),
			);
	}, []);

	useEffect(() => {
		if (width === 0) return;
		if (width > breakpoints["md"])
			setPageScale(Number(localStorage.getItem("userPageScale")) || 100);
	}, [width]);

	useEffect(() => {
		if (pageScale === 0) return;
		localStorage.setItem("userPageScale", String(pageScale));
	}, [pageScale]);

	useEffect(() => {
		if (width > breakpoints["md"])
			setPageScale(Number(localStorage.getItem("userPageScale")) || 100);
	}, [pageScale]);

	useEffect(() => {
		if (!quality) return;
		localStorage.setItem("userChapterQuality", quality);
	}, [quality]);

	useEffect(() => {
		setQuality(
			(localStorage.getItem("userChapterQuality") as Quality) || "raw",
		);
	}, []);

	return (
		<div className="bg-[#212121] text-white min-h-screen">
			<div
				className={`bg-black/70 h-12 fixed top-0 inset-x-0 z-50 ${
					showBars
						? "opacity-100"
						: "-translate-y-24 pointer-events-none opacity-0"
				} transition duration-500 ease-in-out`}
			>
				<div className="flex items-center justify-between container h-full w-full">
					<Link href={"/"}>
						<a
							href={"/"}
							className="items-center space-x-2 hidden md:flex"
						>
							<div className="h-8 w-8 rounded-md">
								<Image
									className="rounded-md"
									src={Logo}
								></Image>
							</div>
							<h1 className="font-semibold text-lg mt-1">
								Easy Manga
							</h1>
						</a>
					</Link>

					<div className="flex items-center gap-2">
						<Link
							href={`/titles/${chapter.source}/${manga.slug}`}
						>
							<div className="p-1 hover:bg-white/25 rounded-md">
								<ArrowUturnLeftIcon className="h-6 w-6 md:hidden"></ArrowUturnLeftIcon>
							</div>
						</Link>
						<div className="flex flex-col items-start md:flex-row md:items-center md:gap-2 text-start">
							<Link
								href={`/titles/${chapter.source}/${manga.slug}`}
							>
								<button className="md:px-2 md:py-1 hover:bg-white/25 rounded-md select-none overflow-hidden whitespace-nowrap text-ellipsis">
									{manga.title}
								</button>
							</Link>
							<ChevronRightIcon className="h-3 w-3 stroke-1.5 hidden md:block"></ChevronRightIcon>
							<Link
								href={`/titles/${chapter.source}/${
									chapter.mangaSlug
								}/chapter?id=${encodeURIComponent(
									chapter.slug!,
								)}`}
							>
								<button className="text-xs text-white/60 md:text-white/60 md:text-base md:px-2 md:py-2 hover:bg-white/25 rounded-md select-none overflow-hidden whitespace-nowrap text-ellipsis">
									{chapter.name}
								</button>
							</Link>
						</div>
					</div>

					<ArrowUturnLeftIcon className="h-6 w-6 hidden md:block"></ArrowUturnLeftIcon>
				</div>
			</div>

			<div
				className="fixed inset-0  z-20"
				onClick={() => setShowBars((state) => !state)}
			/>

			<div className="">
				<div
					className="mx-auto select-none"
					style={{
						maxWidth: `${
							(width < breakpoints["md"]
								? 200
								: pageScale || 100) / 2
						}%`,
					}}
				>
					{chapter.pages.map((page, index) => {
						if (!quality) return null;
						return (
							<ChapterPageLoader
								quality={quality}
								key={page}
								src={page}
								number={index + 1}
								setProgress={(number) => setProgress(number)}
							></ChapterPageLoader>
						);
					})}
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
								setPageScale((scale) =>
									scale <= 50 ? 50 : scale - 10,
								)
							}
						>
							<MinusIcon className="w-4 h-4 stroke-2"></MinusIcon>
						</button>

						<span className="text-sm text-white/60">
							{pageScale}%
						</span>

						<button
							onClick={() =>
								setPageScale((scale) =>
									scale >= 200 ? 200 : scale + 10,
								)
							}
						>
							<PlusIcon className="w-4 h-4 stroke-2"></PlusIcon>
						</button>
					</div>

					<div className="flex items-center gap-4">
						<span className="text-white/60 whitespace-nowrap">
							{progress} / {chapter.pages.length}
						</span>
						<Slider.Root
							onValueChange={(value) => {
								const [progress] = value;
								if (document)
									document
										.getElementById(`pg-` + progress)
										?.scrollIntoView();
								setProgress(progress);
							}}
							value={[progress]}
							className="relative flex items-center w-full md:w-96 touch-action"
							max={chapter.pages.length}
							defaultValue={[1]}
							min={1}
							step={1}
							aria-label="Volume"
						>
							<Slider.Track className="bg-white/40 relative flex-grow rounded h-0.5">
								<Slider.Range className="absolute h-full " />
							</Slider.Track>
							<Slider.Thumb className="block bg-primary hover:bg-primary-hover active:bg-primary-active w-2 h-4 " />
						</Slider.Root>

						<div className="flex items-center gap-2">
							{chapter.prevSlug && (
								<Link
									href={`/titles/${chapter.source}/${
										chapter.mangaSlug
									}/chapter?id=${encodeURIComponent(
										chapter.prevSlug!,
									)}`}
								>
									<a
										className={`flex items-center gap-2 hover:bg-white/25 rounded-md p-2`}
										href={`/titles/${chapter.source}/${
											chapter.mangaSlug
										}/chapter?id=${encodeURIComponent(
											chapter.prevSlug,
										)}`}
									>
										<ChevronLeftIcon className="h-5 w-5"></ChevronLeftIcon>
										<span className="hidden md:block">
											Previous
										</span>
									</a>
								</Link>
							)}

							{chapter.nextSlug && (
								<Link
									href={`/titles/${chapter.source}/${
										chapter.mangaSlug
									}/chapter?id=${encodeURIComponent(
										chapter.nextSlug!,
									)}`}
								>
									<a
										className="flex items-center gap-2 hover:bg-white/25 rounded-md p-2 disabled:opacity-50"
										href={`/titles/${chapter.source}/${
											chapter.mangaSlug
										}/chapter?id=${encodeURIComponent(
											chapter.prevSlug!,
										)}`}
									>
										<span className="hidden md:block">
											Next
										</span>
										<ChevronRightIcon className="h-5 w-5"></ChevronRightIcon>
									</a>
								</Link>
							)}
						</div>
					</div>

					<div className="self-center">
						<ChapterPageSettingsMenu
							setQuality={setQuality}
							quality={quality || "raw"}
						></ChapterPageSettingsMenu>
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

	const { data } = await client.query({
		query: gql`
			query Chapter(
				$chapterUniqueInput: ChapterUniqueInput!
				$mangaUniqueInput: MangaUniqueInput!
			) {
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
					otherChapters {
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
					source
				}
				manga(mangaUniqueInput: $mangaUniqueInput) {
					slug
					title
				}
			}
		`,
		variables: {
			chapterUniqueInput: {
				source: source,
				slug: id,
			},
			mangaUniqueInput: {
				source: source,
				slug: mangaSlug,
			},
		},
	});

	return {
		props: {
			chapter: data.chapter,
			manga: data.manga,
		},
	};
};

export default Chapter;
