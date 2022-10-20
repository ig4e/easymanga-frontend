import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { motion } from "framer-motion";
import { Manga } from "../../../typings/manga";
import { client } from "../../../apollo-client";
import { gql } from "@apollo/client";
import { MANGA_FIELDS } from "../../../apollo/fragments";
import ShowImageModal from "../../../components/Ui/ShowImageModal";
import { getRandomEmoji } from "../../../utils/getRandomEmoji";
import ExternalSite from "../../../components/Ui/ExternalSite";

import AnilistLogo from "../../../public/images/logos/anilist.png";
import MDLogo from "../../../public/images/logos/mangadex.png";
import AresLogo from "../../../public/images/logos/ares.png";
import AzoraLogo from "../../../public/images/logos/azora.png";
import MangaSwatLogo from "../../../public/images/logos/mangaswat.png";
import OuzlScansLogo from "../../../public/images/logos/ouzlscans.png";
import FlameScansLogo from "../../../public/images/logos/flamescans.png";

const sourcesData = {
	ARES: { name: "Ares Manga", image: AresLogo },
	FLAMESCANS: { name: "Ar Flame Scans", image: FlameScansLogo },
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

	return (
		<div>
			<Head>
				<title>{manga.title} Details - Easy Manga</title>
			</Head>

			<div className="">
				<div className="absolute inset-x-0  top-0 bg-cover bg-no-repeat h-[16rem] md:h-[22rem] -z-10">
					<Image
						src={manga.cover}
						layout="fill"
						className="rounded-md object-cover inset-0 h-full -z-10"
					></Image>
					<div className="absolute inset-x-0  top-0 bg-cover bg-no-repeat h-full backdrop-blur bg-black/25"></div>
				</div>

				<div className="mt-6 md:mt-14">
					<div className="grid grid-flow-col-dense grid-rows-2 grid-cols-2 z-40">
						<div className="col-span-1 row-span-2 w-52">
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
						</div>

						<div className="flex flex-col items-start gap-2 justify-between h-[17.5rem] z-50 col-span-5">
							<div className="flex flex-col justify-between items-start gap-2 text-white">
								<h1 className="text-xl md:text-7xl font-[800] ">
									{manga.title}
								</h1>
								{manga.altTitles[0] && (
									<h2 className="md:text-xl md:font-semibold ">
										{manga.altTitles[0]}
									</h2>
								)}
							</div>
						</div>

						<div>
							<button className="px-8 py-2 text-lg bg-primary text-white">
								Start Reading ({manga.source})
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default MangaPage;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
	let { source, slug } = params! as { [index: string]: string };

	console.log(params);

	const { data } = await client.query({
		query: gql`
			${MANGA_FIELDS}
			query Manga($mangaUniqueInput: MangaUniqueInput!) {
				manga(mangaUniqueInput: $mangaUniqueInput) {
					...MangaFields
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
