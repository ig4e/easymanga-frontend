import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import MangaCardHorizontal from "../components/Ui/MangaCardHorizontal";

const Home: NextPage = () => {
	return (
		<div>
			<Head>
				<title>أفضل وأسهل طريقة لقرائة المانجا - Easy Manga</title>
			</Head>

			<div className = "bg-black">
				<MangaCardHorizontal></MangaCardHorizontal>
			</div>
		</div>
	);
};

export default Home;
