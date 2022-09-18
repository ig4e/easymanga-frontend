import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import MangaCardHorizontalList from "../components/Ui/MangaCardHorizontalList";

const Home: NextPage = () => {
	return (
		<div>
			<Head>
				<title>أفضل وأسهل طريقة لقرائة المانجا - Easy Manga</title>
			</Head>

			<div className="">
				<MangaCardHorizontalList
					manga={[
						{
							title: "Martial Peak",
							cover: "https://mangadex.org/covers/b1461071-bfbb-43e7-a5b6-a7ba5904649f/0ad0424f-01eb-4c42-a8e0-57e4344b03a0.jpg",
							score: 8.6,
							chapters: [
								{ name: "2694 - للرجوع قوة", number: 2694 },
							],
						},
					]}
				></MangaCardHorizontalList>
			</div>
		</div>
	);
};

export default Home;
