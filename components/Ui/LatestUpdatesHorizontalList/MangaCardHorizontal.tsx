import Image from "next/image";
import React from "react";
import { Manga } from "../../../typings/manga";
import tw from "tailwind-styled-components";
import { BookOpenIcon, StarIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { motion } from "framer-motion";

function MangaCardHorizontal({ manga }: { manga: Manga }) {
	const MangaTitle: any = tw.h1`text-lg font-bold`;

	return (
		<Link href={`/titles/${manga.source}/${manga.slug}`}>
			<a href={`/titles/${manga.source}/${manga.slug}`} className="flex gap-2 max-h-20 bg-base-100 ">
				<div className="h-full max-w-[56px] min-w-[56px]">
					<Image
						src={manga.cover}
						height={100}
						width={70}
						quality={90}
						className="rounded object-cover"
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
						title={`Ch.${manga.chapters![0].number}`}
						className="flex items-center font-semibold gap-2 line-clamp-1"
					>
						<BookOpenIcon className="h-5 w-5" />
						Ch.{manga.chapters![0].number}
					</p>
				</div>
			</a>
		</Link>
	);
}

export default MangaCardHorizontal;