import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Manga } from "../../typings/manga";
import * as Tooltip from "@radix-ui/react-tooltip";

import AnilistLogo from "../../public/images/logos/anilist.png";
import MDLogo from "../../public/images/logos/mangadex.png";

import { StarIcon } from "@heroicons/react/24/outline";
import ExternalSite from "./ExternalSite";
import { AnimatePresence, motion } from "framer-motion";
import { sourcesData } from "../../utils/sourcesData";

function MangaCard({ manga, mobile }: { manga: Manga; mobile: boolean }) {
	const source = sourcesData[manga.source];
	const Wrapper = ({ children }: any) =>
		mobile ? (
			<div>{children}</div>
		) : (
			<Tooltip.Trigger>{children}</Tooltip.Trigger>
		);

	return (
		<AnimatePresence>
			<Tooltip.Provider delayDuration={350} skipDelayDuration={100}>
				<Tooltip.Root>
					<Link href={`/titles/${manga.source}/${manga.slug}`}>
						<a href={`/titles/${manga.source}/${manga.slug}`}>
							<Wrapper>
								<div
									className={`${
										mobile
											? ""
											: "min-h-[180px] min-w-[130px]"
									} w-full h-full relative`}
								>
									<div className="bg-neutral-200/80 animate-pulse inset-0 bottom-2 absolute rounded-md"></div>
									<Image
										src={manga.cover}
										width={130 * 2}
										height={180 * 2}
										className="rounded-md w-full h-full object-cover"
									></Image>
								</div>
							</Wrapper>
							<h1
								title={manga.title}
								className="text-left text-sm font-medium line-clamp-2"
							>
								{manga.title}
							</h1>
						</a>
					</Link>
					{!mobile && (
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
										<div className="flex items-center gap-1 select-none">
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
					)}
				</Tooltip.Root>
			</Tooltip.Provider>
		</AnimatePresence>
	);
}

export default MangaCard;
