import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Manga } from "../../typings/manga";
import * as Tooltip from "@radix-ui/react-tooltip";

import AnilistLogo from "../../public/images/logos/anilist.png";
import MDLogo from "../../public/images/logos/mangadex.png";
import AresLogo from "../../public/images/logos/ares.png";
import AzoraLogo from "../../public/images/logos/azora.png";
import MangaSwatLogo from "../../public/images/logos/mangaswat.png";
import OuzlScansLogo from "../../public/images/logos/ouzlscans.png";
import FlameScansLogo from "../../public/images/logos/flamescans.png";

import {
	ArrowTopRightOnSquareIcon,
	LinkIcon,
	StarIcon,
} from "@heroicons/react/24/outline";
import ExternalSite from "./ExternalSite";
import { AnimatePresence, motion } from "framer-motion";

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

function MangaCard({ manga }: { manga: Manga }) {
	const source = sourcesData[manga.source];

	return (
		<AnimatePresence>
			<Tooltip.Provider delayDuration={350} skipDelayDuration={100}>
				<Tooltip.Root>
					<Link href={`/titles/${manga.source}/${manga.slug}`}>
						<a href={`/titles/${manga.source}/${manga.slug}`}>
							<div className="min-h-[180px] min-w-[130px] w-full h-full">
								<Tooltip.Trigger>
									<Image
										src={manga.cover}
										width={130}
										height={180}
										className="rounded-md"
									></Image>
									<h1
										title={manga.title}
										className="text-left text-sm font-medium line-clamp-2"
									>
										{manga.title}
									</h1>
								</Tooltip.Trigger>
							</div>
						</a>
					</Link>
					<Tooltip.Portal>
						<Tooltip.Content
							side="left"
							className="z-50 "
							forceMount={true}
						>
							<motion.div
								className="bg-base p-4 rounded-md drop-shadow-xl z-50 flex flex-col items-start gap-2"
								initial={{ scale: 0.5, opacity: 0 }}
								animate={{ scale: 1, opacity: 1 }}
								exit={{ scale: 0.5, opacity: 0 }}
								transition={{ duration: 0.15 }}
							>
								<div className="flex items-center gap-4 w-full justify-between">
									<div className="flex gap-0.5 items-end">
										<h2 className="items-end text-xl font-semibold line-clamp-1 max-w-xs">
											{manga.title}
										</h2>
										{manga.releaseYear && (
											<span className="text-xs">
												({manga.releaseYear})
											</span>
										)}
									</div>
									<div className="flex items-center gap-1">
										<StarIcon className="h-5 w-5 stroke-1 fill-current text-primary"></StarIcon>
										<span>{manga.score || "N/A"}</span>
									</div>
								</div>
								<div className="flex items-center gap-2">
									{manga.aniId && (
										<ExternalSite
											title="Anilist"
											href={`https://anilist.co/manga/${
												manga.aniId
											}/${manga.title.replaceAll(
												" ",
												"-",
											)}`}
											ImageSrc={AnilistLogo}
										/>
									)}

									{manga.dexId && (
										<ExternalSite
											title="MangaDex"
											href={`https://mangadex.org/title/${
												manga.dexId
											}/${manga.title.replaceAll(
												" ",
												"-",
											)}`}
											ImageSrc={MDLogo}
										/>
									)}

									<ExternalSite
										title={source.name}
										href={`${manga.url}`}
										ImageSrc={source.image!}
									/>
								</div>
								<div className="flex items-center justify-between gap-2 w-full max-w-[470px]">
									{manga.author && (
										<div className="flex gap-2">
											<span className="font-semibold">
												Author:
											</span>
											<span className="line-clamp-1">
												{manga.author}
											</span>
										</div>
									)}

									{manga.artist && (
										<div className="flex gap-2">
											<span className="font-semibold">
												Artist:
											</span>
											<span className="line-clamp-1">
												{manga.artist}
											</span>
										</div>
									)}
									{manga.status && (
										<div className="flex gap-2">
											<span className="font-semibold">
												Status:
											</span>
											<span className="line-clamp-1">
												{manga.status}
											</span>
										</div>
									)}
								</div>
								<Tooltip.Arrow
									className="fill-slate-300 drop-shadow-xl"
									width={20}
									height={10}
								/>
							</motion.div>
						</Tooltip.Content>
					</Tooltip.Portal>
				</Tooltip.Root>
			</Tooltip.Provider>
		</AnimatePresence>
	);
}

export default MangaCard;
