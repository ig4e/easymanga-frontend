import React from "react";
import { Manga } from "../../../typings/manga";
import MangaCardHorizontal from "./MangaCardHorizontal";

function MangaCardHorizontalList({ manga }: { manga: Manga[] }) {
	return (
		<div className="md:bg-root-100 grid gap-4 md:p-4 rounded drop-shadow">
			{manga.map((manga) => (
				<MangaCardHorizontal key={manga.slug} manga={manga} />
			))}
		</div>
	);
}

export default MangaCardHorizontalList;
