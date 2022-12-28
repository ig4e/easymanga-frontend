import Image from "next/image";
import Link from "next/link";
import React, { useRef, useState } from "react";
import { Manga } from "../../typings/manga";
import * as Tooltip from "@radix-ui/react-tooltip";

import AnilistLogo from "../../public/images/logos/anilist.png";
import MDLogo from "../../public/images/logos/mangadex.png";

import { StarIcon } from "@heroicons/react/24/outline";
import ExternalSite from "./ExternalSite";
import { AnimatePresence, motion, useInView, useScroll } from "framer-motion";
import { sourcesData } from "../../utils/sourcesData";

import NoImagePlaceHolder from "../../public/assets/no-img.png";

function MangaCard({
	manga,
	mobile,
	onClick,
	customClasses,
}: {
	manga: Manga;
	mobile: boolean;
	onClick?: any;
	customClasses?: string;
}) {
	const [coverError, setCoverError] = useState(false);

	const mangaCover = manga.dexId
		? manga.cover.replace("&referer=", ".256.jpg&referer=")
		: manga.cover;

	return (
		<Link href={`/titles/${manga.source}/${manga.slug}?tab=chapters`} className="">
			<motion.div
				animate={{ scale: 0.8, opacity: 0.9 }}
				whileInView={{ scale: 1, opacity: 1 }}
				onClick={onClick}
				className="w-full h-full grid grid-flow-col gap-2"
			>
				<div className="space-y-2">
					<Image
						src={coverError ? NoImagePlaceHolder : mangaCover}
						width={200}
						height={280}
						className={`rounded-md object-cover w-full z-10 aspect-[200/285] bg-neutral-200`}
						alt={manga.title}
						onError={() => setCoverError(true)}
					></Image>

					<h1
						title={manga.title}
						dangerouslySetInnerHTML={{
							__html: manga.title,
						}}
						className="text-left text-sm font-semibold line-clamp-2"
					></h1>
				</div>
			</motion.div>
		</Link>
	);

	// return (
	// 	<AnimatePresence>
	// 		<Tooltip.Provider delayDuration={350} skipDelayDuration={100}>
	// 			<Tooltip.Root>
	// 				<Link href={`/titles/${manga.source}/${manga.slug}`}>
	// 					<a
	// 						href={`/titles/${manga.source}/${manga.slug}`}
	// 						onClick={onClick}
	// 					>
	// 						<Wrapper>
	// 							<motion.div
	// 								animate={{ scale: 0.8 }}
	// 								whileInView={{ scale: 1 }}
	// 								className={`${
	// 									mobile
	// 										? ""
	// 										: "min-h-[180px] min-w-[130px]"
	// 								} w-full h-full max-w-full relative`}
	// 							>
	// 								<div className="bg-neutral-200/80 animate-pulse inset-0 bottom-2 absolute rounded-md"></div>
	// 								<Image
	// 									src={manga.cover}
	// 									width={130 * 2}
	// 									height={180 * 2}
	// 									className="rounded-md w-full h-full object-cover"
	// 									alt={manga.title}
	// 								></Image>
	// 							</motion.div>
	// 						</Wrapper>
	// 						<h1
	// 							title={manga.title}
	// 							dangerouslySetInnerHTML={{
	// 								__html: manga.title,
	// 							}}
	// 							className="text-left text-sm font-medium line-clamp-2"
	// 						></h1>
	// 					</a>
	// 				</Link>
	// 				{!mobile && (
	// 					<Tooltip.Portal>
	// 						<Tooltip.Content
	// 							side="left"
	// 							className="z-50 "
	// 							forceMount={true}
	// 						>
	// 							<motion.div
	// 								className="bg-root p-4 rounded-md drop-shadow-xl z-50 flex flex-col items-start gap-2"
	// 								initial={{ scale: 0.5, opacity: 0 }}
	// 								animate={{ scale: 1, opacity: 1 }}
	// 								exit={{ scale: 0.5, opacity: 0 }}
	// 								transition={{ duration: 0.15 }}
	// 							>
	// 								<div className="flex items-center gap-4 w-full justify-between">
	// 									<div className="flex gap-0.5 items-end">
	// 										<h2 className="items-end text-xl font-semibold line-clamp-1 max-w-xs">
	// 											{manga.title}
	// 										</h2>
	// 										{manga.releaseYear && (
	// 											<span className="text-xs">
	// 												({manga.releaseYear})
	// 											</span>
	// 										)}
	// 									</div>
	// 									<div className="flex items-center gap-1 select-none">
	// 										<StarIcon className="h-5 w-5 stroke-1 fill-current text-primary"></StarIcon>
	// 										<span>{manga.score || "N/A"}</span>
	// 									</div>
	// 								</div>
	// 								<div className="flex items-center gap-2">
	// 									{manga.aniId && (
	// 										<ExternalSite
	// 											title="Anilist"
	// 											href={`https://anilist.co/manga/${
	// 												manga.aniId
	// 											}/${manga.title.replaceAll(
	// 												" ",
	// 												"-",
	// 											)}`}
	// 											ImageSrc={AnilistLogo}
	// 										/>
	// 									)}

	// 									{manga.dexId && (
	// 										<ExternalSite
	// 											title="MangaDex"
	// 											href={`https://mangadex.org/title/${
	// 												manga.dexId
	// 											}/${manga.title.replaceAll(
	// 												" ",
	// 												"-",
	// 											)}`}
	// 											ImageSrc={MDLogo}
	// 										/>
	// 									)}

	// 									<ExternalSite
	// 										title={source.name}
	// 										href={`${manga.url}`}
	// 										ImageSrc={source.image!}
	// 									/>
	// 								</div>
	// 								<div className="flex items-center justify-between gap-2 w-full max-w-[470px]">
	// 									{manga.author && (
	// 										<div className="flex gap-2">
	// 											<span className="font-semibold">
	// 												Author:
	// 											</span>
	// 											<span className="line-clamp-1">
	// 												{manga.author}
	// 											</span>
	// 										</div>
	// 									)}

	// 									{manga.artist && (
	// 										<div className="flex gap-2">
	// 											<span className="font-semibold">
	// 												Artist:
	// 											</span>
	// 											<span className="line-clamp-1">
	// 												{manga.artist}
	// 											</span>
	// 										</div>
	// 									)}
	// 									{manga.status && (
	// 										<div className="flex gap-2">
	// 											<span className="font-semibold">
	// 												Status:
	// 											</span>
	// 											<span className="line-clamp-1">
	// 												{manga.status}
	// 											</span>
	// 										</div>
	// 									)}
	// 								</div>
	// 								<Tooltip.Arrow
	// 									className="fill-slate-300 drop-shadow-xl"
	// 									width={20}
	// 									height={10}
	// 								/>
	// 							</motion.div>
	// 						</Tooltip.Content>
	// 					</Tooltip.Portal>
	// 				)}
	// 			</Tooltip.Root>
	// 		</Tooltip.Provider>
	// 	</AnimatePresence>
	// );
}

export default MangaCard;
