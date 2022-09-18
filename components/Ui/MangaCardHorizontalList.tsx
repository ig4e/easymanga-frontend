import React from "react";
import MangaCardHorizontal from "./MangaCardHorizontal";

function MangaCardHorizontalList({
	manga,
}: {
	manga: {
		cover: string;
		title: string;
		score: number;
		chapters: { name: string; number: number }[];
	}[];
}) {
	return (
		<div className="bg-base-100 mt-24 max-w-xs p-4">
			{manga.map((manga) => (
				<MangaCardHorizontal manga={manga} />
			))}
		</div>
	);
}

export default MangaCardHorizontalList;
