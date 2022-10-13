import Image from "next/image";
import React from "react";
import { Manga } from "../../typings/manga";

function MangaCard({ manga }: { manga: Manga }) {
	return (
		<div className="min-h-[180px] min-w-[130px] w-full h-full">
			<Image
				src={manga.cover}
				width={130}
				height={180}
				className="rounded-md"
			></Image>
			<h1 title={manga.title} className=" text-sm font-medium line-clamp-2">
				{manga.title}
			</h1>
		</div>
	);
}

export default MangaCard;
