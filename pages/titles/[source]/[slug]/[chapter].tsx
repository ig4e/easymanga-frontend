import { gql } from "@apollo/client";
import {
	ArrowUturnLeftIcon,
	ChevronLeftIcon,
	ChevronRightIcon,
	Cog6ToothIcon,
	MinusIcon,
	PlusIcon,
} from "@heroicons/react/24/outline";
import { GetServerSideProps, NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { client } from "../../../../apollo-client";
import ChapterPageLoader from "../../../../components/Ui/ChapterPageLoader";
import PageLayout from "../../../../components/Ui/PageLayout";
import Logo from "../../../../public/logo.png";
import * as Slider from "@radix-ui/react-slider";

interface IPageProps {
	manga: { title: string };
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

const Chapter: NextPage<IPageProps> = ({ chapter, manga }) => {
	const [progress, setProgress] = useState(0);

	return (
		<div className="bg-[#212121] text-white">
			<div className="bg-black/70 h-12 fixed top-0 inset-x-0 z-50">
				<div className="flex items-center justify-between container h-full w-full">
					<Link href={"/"}>
						<a href={"/"} className="flex items-center space-x-2">
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

					<div className="flex items-center gap-2 self-center">
						<Link
							href={`/titles/${chapter.source}/${chapter.mangaSlug}`}
						>
							{manga.title}
						</Link>
						<ChevronRightIcon className="h-3 w-3 stroke-1.5"></ChevronRightIcon>
						<Link
							href={`/titles/${chapter.source}/${chapter.mangaSlug}/${chapter.slug}`}
						>
							{chapter.name}
						</Link>
					</div>

					<ArrowUturnLeftIcon className="h-5 w-5"></ArrowUturnLeftIcon>
				</div>
			</div>

			<button className="fixed inset-0  z-20"></button>

			<div className="container">
				<div className="max-w-4xl mx-auto select-none">
					{chapter.pages.map((page) => (
						<ChapterPageLoader src={page}></ChapterPageLoader>
					))}
				</div>
			</div>

			<div className="bg-black/70 h-14 fixed bottom-0 inset-x-0 z-50">
				<div className="flex items-center justify-between container h-full w-full">
					<div className="rounded-full border border-white/60 py-2 px-4 flex items-center gap-4">
						<MinusIcon className="w-4 h-4 stroke-2"></MinusIcon>
						<span className="text-sm text-white/60">100%</span>
						<PlusIcon className="w-4 h-4 stroke-2"></PlusIcon>
					</div>

					<div className="flex items-center gap-4">
						<span className="text-white/60">
							{progress} / {chapter.pages.length}
						</span>
						<Slider.Root
							onValueChange={(value) => setProgress(value[0])}
							value={[progress]}
							className="relative flex items-center w-96"
							defaultValue={[0]}
							max={chapter.pages.length}
							step={1}
							aria-label="Volume"
						>
							<Slider.Track className="bg-white/40 relative flex-grow rounded h-0.5">
								<Slider.Range className="absolute h-full " />
							</Slider.Track>
							<Slider.Thumb className="block bg-primary hover:bg-primary-hover active:bg-primary-active w-2 h-4 " />
						</Slider.Root>
						<div className="flex items-center gap-2">
							<button className="flex items-center gap-2 hover:bg-white/25 rounded-md p-2">
								<ChevronLeftIcon className="h-5 w-5"></ChevronLeftIcon>
								<span>Previous</span>
							</button>
							<button className="flex items-center gap-2 hover:bg-white/25 rounded-md p-2">
								<span>Next</span>
								<ChevronRightIcon className="h-5 w-5"></ChevronRightIcon>
							</button>
						</div>
					</div>

					<div>
						<button className="border border-white/60 p-2 px-4 rounded-full flex items-center gap-2">
							<Cog6ToothIcon className="h-5 w-5"></Cog6ToothIcon>
							<span>Settings</span>
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
	const { source, slug, chapter } = params as { [index: string]: string };

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
					title
				}
			}
		`,
		variables: {
			chapterUniqueInput: {
				source: source,
				slug: chapter,
			},
			mangaUniqueInput: {
				source: source,
				slug: slug,
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
