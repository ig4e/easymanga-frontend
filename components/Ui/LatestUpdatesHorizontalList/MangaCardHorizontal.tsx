import Image from "next/image";
import React from "react";
import { Manga } from "../../../typings/manga";
import tw from "tailwind-styled-components";
import { BookOpenIcon, StarIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { motion } from "framer-motion";

function MangaCardHorizontal({ manga }: { manga: Manga }) {
	const MangaTitle: any = tw.h1`text-lg font-bold`;
	const mangaCover = manga.dexId
		? manga.cover.replace("&referer=", ".256.jpg&referer=")
		: manga.cover;

	return (
		<Link href={`/titles/${manga.source}/${manga.slug}?tab=chapters`}>
			<div className="flex gap-2 max-h-20 md:bg-root-100 ">
				<div className="w-[56px] h-[80px] relative">
					<Image
						className="min-w-[56px] min-h-[80px] w-[56px] h-[80px] rounded object-cover z-10 bg-neutral-200"
						src={mangaCover}
						height={80}
						width={56}
						alt={manga.title}
					></Image>
				</div>
				<div className="flex flex-col justify-evenly">
					<MangaTitle
						title={manga.title}
						className="break-all line-clamp-1"
					>
						{manga.title}
					</MangaTitle>
					<p
						title={`manga score ${manga.score}`}
						className="flex items-center font-semibold gap-2 line-clamp-1"
					>
						<StarIcon className="h-5 w-5" />
						{manga.score || "N/A"}
					</p>
					<p
						title={`Ch.${manga.chapters?.[0]?.number || "N/A"}`}
						className="flex items-center font-semibold gap-2 line-clamp-1"
					>
						<BookOpenIcon className="h-5 w-5" />
						Ch.{manga.chapters?.[0]?.number || "N/A"}
					</p>
				</div>
			</div>
		</Link>
	);
}

export default MangaCardHorizontal;
