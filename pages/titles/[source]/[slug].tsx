import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { motion } from "framer-motion";
import { Manga } from "../../../typings/manga";
import { client } from "../../../apollo-client";
import { gql } from "@apollo/client";
import { MANGA_FIELDS } from "../../../apollo/fragments";
import ShowImageModal from "../../../components/Ui/ShowImageModal";

interface MangaPageProps {
	manga: Manga;
}

const MangaPage: NextPage<MangaPageProps> = ({ manga }) => {
	return (
		<div>
			<Head>
				<title>{manga.title} Details - Easy Manga</title>
			</Head>
			<div
				className="absolute inset-x-0 top-0 bottom-2 bg-cover bg-no-repeat h-[19.5rem] bg-center -z-10"
				style={{ backgroundImage: `url("${manga.cover}")` }}
			></div>

			<div className="absolute inset-x-0 -bottom-2 top-0 bg-cover bg-no-repeat h-[20rem] backdrop-blur-sm bg-black/25  -z-10"></div>

			<div className="mt-6 ">
				<div className="flex items-start gap-8 z-40">
					<ShowImageModal imgSrc={manga.cover}>
						<div className="w-28 md:w-auto">
							<Image
								src={manga.cover}
								width={200}
								height={280}
								className="rounded-md object-cover"
							></Image>
						</div>
					</ShowImageModal>
					<div className="flex flex-col items-start gap-2 justify-between h-[17.5rem]">
						<div className="flex flex-col justify-between items-start gap-2 text-white">
							<h1 className="text-xl md:text-7xl font-[800] ">
								{manga.title}
							</h1>
							{manga.altTitles[0] && (
								<h2 className="text-xl font-semibold ">
									{manga.altTitles[0]}
								</h2>
							)}
						</div>

						<div className="text-white">
							<button className="bg-primary rounded-md px-8 py-2">
								Start Reading
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
