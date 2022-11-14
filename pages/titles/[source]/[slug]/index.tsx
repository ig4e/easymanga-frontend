import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { motion } from "framer-motion";
import { Manga } from "../../../../typings/manga";
import { client } from "../../../../apollo-client";
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
import { useState } from "react";

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

interface MangaPageProps {
	manga: Manga;
}

const MangaPage: NextPage<MangaPageProps> = ({ manga }) => {
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
						src={manga.cover}
						layout="fill"
						objectFit="cover"
						objectPosition="center"
					></Image>
					<div className="absolute bg-black/25 inset-0 backdrop-blur -z-10"></div>

					<div className="absolute bg-gradient-to-t from-black/70 bottom-0 left-0 right-0 h-20 -z-10"></div>
				</div>
				<div className="container z-50">
					<div className="md:flex gap-6">
						<div className="-translate-y-52 min-w-max">
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
							<button className="p-2 bg-primary hover:bg-primary-hover active:bg-primary-active w-full rounded-md text-white text-lg font-medium transition">
								Start Reading
							</button>
						</div>
						<div className="py-4 -translate-y-52 w-full">
							<h1 className="text-5xl font-bold text-white">
								{manga.title}
							</h1>

							<div className="translate-y-40 space-y-2">
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
											<div className="bg-base-100 border  select-none p-1 px-2 text-xs font-bold uppercase rounded">
												{genre}
											</div>
										);
									})}
								</div>
								<div>
									<span>{manga.synopsis || "لا يوجد ملخص للأن, نعتذر منكم!"}</span>
								</div>
							</div>
							<div className="pt-6 space-y-4 translate-y-40 w-full">
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
								<div className="grid grid-flow-row grid-cols-4 gap-2 w-full bg-base-100 p-4 rounded-md">
									{stateReverse(
										manga.chapters?.map((chapter) => {
											return (
												<a
													href={`/titles/${manga.source}/${manga.slug}/${chapter.slug}`}
													className="p-2 border bg-base rounded-md flex gap-2 hover:bg-primary/10 transition"
												>
													<span className="text-xs">
														{chapter.number}
													</span>
													<span>{chapter.name}</span>
												</a>
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

	console.log(manga);

	return {
		props: {
			manga,
		},
	};
};
