import React from "react";
import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import ImageLegacy from "next/legacy/image";
import Image from "next/image";

import { Manga } from "../../typings/manga";
import { anilistClient, client } from "../../apollo-client";
import { gql } from "@apollo/client";
import ShowImageModal from "../Ui/ShowImageModal";
import ExternalSite from "../Ui/ExternalSite";
import Fuse from "fuse.js";

import {
	CheckIcon,
	ChevronDownIcon,
	ChevronUpIcon,
	StarIcon,
} from "@heroicons/react/24/outline";
import { PlayCircleIcon } from "@heroicons/react/24/solid";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import CharacterCard from "../Ui/CharacterCard";
import { getWorkersUrl } from "../../utils/getImageUrl";
import Navbar from "../Navbar";
import * as Select from "@radix-ui/react-select";
import { Chapter } from "../../typings/chapter";

import { SourceData, sourcesData } from "../../utils/sourcesData";
import { useChapterPageStore } from "../../store";
import { LayoutGroup, motion } from "framer-motion";
import * as Tabs from "@radix-ui/react-tabs";

import NoImagePlaceholder from "../../../../public/assets/no-img.png";
import { useRouter } from "next/router";
import SearchBar from "../Ui/SearchBar";

import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useTheme } from "next-themes";

function TitlePageLoading() {
	const { theme, forcedTheme, themes, resolvedTheme, systemTheme, setTheme } =
		useTheme();
	return (
		<SkeletonTheme
			baseColor={theme === "dark" ? "#222328" : "#DFDFDF"}
			highlightColor={theme === "dark" ? "#4e4f52" : "#E5E6E8"}
		>
			<>
				<Navbar
					navClass="!text-white md:!text-neutral"
					mode="transparent"
				></Navbar>
				<Tabs.Root value={"chapters"}>
					<div>
						<Head>
							<title>Manga Details - Easy Manga</title>
						</Head>

						<div>
							<div className="relative w-full h-[17.8rem] md:h-[18.8rem] bg-gradient-to-tr from-root to-root-100 -z-10">

								<div className="absolute bg-gradient-to-t from-black/70 bottom-0 left-0 right-0 h-20 -z-10"></div>
							</div>
							<div className="container z-50">
								<div className="md:flex gap-6 ">
									<div className="w-full max-w-[90.99vw] md:max-w-[200px] z-20 ">
										<div className="-translate-y-56 md:-translate-y-60 min-w-max overflow-y-scroll scrollbar-hide z-20 ">
											<div className="flex flex-col gap-4 ">
												<div className="flex items-start gap-4 h-full max-h-[12rem] max-w-[90vw] md:max-w-full z-20 md:max-h-min overflow-hidden">
													<motion.div
														layoutId="mangaCoverTrans"
														className="w-32 md:w-[200px] min-w-[128px]"
													>
														<Skeleton className="h-full w-full aspect-[200/285] rounded-md" />
													</motion.div>
													<div className="w-full md:hidden">
														<h1 className="text-lg md:text-2xl font-bold text-reverse z-50 flex flex-col md:hidden w-1/2">
															<Skeleton
																count={1}
																height={26}
															/>
														</h1>
														<div className="space-y-2 mt-2 w-[80%]">
															<Skeleton
																count={1}
																height={16}
															/>
															<Skeleton
																count={1}
																height={16}
															/>
														</div>
													</div>
												</div>

												<div className="flex items-center gap-2 w-full ">
													<button
														disabled={true}
														className="disabled:bg-primary-active p-2 text-center bg-primary hover:bg-primary-hover active:bg-primary-active w-full rounded-md text-reverse text-lg font-medium transition"
													>
														Start Reading
													</button>
												</div>

												<div className="border border-root flex rounded-md relative select-none bg-root-100">
													<div className="absolute rounded-md inset-0 bg-gradient-to-t from-black/60 to-black/20"></div>
													<div className="z-20 flex items-center justify-center gap-2 p-1 text-reverse w-full">
														<PlayCircleIcon className="h-8 w-8"></PlayCircleIcon>
														<span>
															Watch Trailer
														</span>
													</div>
												</div>
											</div>
										</div>
									</div>
									<div className="py-4 -translate-y-40 md:translate-y-0 w-full">
										<div className="hidden md:block">
											<Skeleton
												className="text-5xl font-black text-reverse -translate-y-52 h-12 md:-translate-y-64 mt-1.5 hidden md:block relative"
												height={26}
												width={"30%"}
											/>

											<Skeleton
												className="text-5xl font-black text-reverse -translate-y-52 h-12 md:-translate-y-64 mt-1.5 hidden md:block relative"
												count={2}
												height={18}
												width={"50%"}
											/>
										</div>

										<div className="-translate-y-12 space-y-2 ">
											<Tabs.List className="bg-root-100 p-2 rounded-md w-full md:w-fit flex items-center gap-2 mb-3">
												{[
													{
														title: "Chapters",
														value: "chapters",
														render: true,
													},
													{
														title: "Characters",
														value: "characters",
														render: true,
													},
													{
														title: "Art",
														value: "art",
														render: true,
													},
												]
													.filter((x) => x.render)
													.map(
														(
															{ title, value },
															index,
														) => {
															return (
																<Tabs.Trigger
																	key={title}
																	value={
																		value
																	}
																	className={`p-1 px-4 rounded-md transition w-full ${
																		index ===
																		0
																			? "bg-primary text-reverse"
																			: "bg-root"
																	}`}
																>
																	{title}
																</Tabs.Trigger>
															);
														},
													)}
											</Tabs.List>

											<div className="flex items-center flex-wrap gap-2">
												<div className="flex items-center gap-2 select-none">
													<StarIcon className="h-6 w-6 stroke-1 fill-current text-primary"></StarIcon>
													<div className="w-16">
														<Skeleton
															count={1}
															height={18}
														/>
													</div>
												</div>
											</div>
											<div className="flex items-center flex-wrap gap-2 ">
												{["0G", "1G", "2G", "3G"].map(
													(genre) => {
														return (
															<div
																key={genre}
																className="w-16"
															>
																<Skeleton
																	className="w-full"
																	key={genre}
																	count={1}
																	height={26}
																/>
															</div>
														);
													},
												)}
											</div>
											<div>
												<Skeleton
													className="w-full"
													count={4}
													height={18}
												/>
											</div>
										</div>

										<Tabs.Content value="chapters">
											<div className="pt-6 space-y-4 -translate-y-12 w-full">
												<div className="flex justify-between items-center">
													<h3 className="text-2xl">
														Chapters List
													</h3>
												</div>
												<div>
													<Skeleton
														height={280}
													></Skeleton>
												</div>
											</div>
										</Tabs.Content>
									</div>
								</div>
							</div>
						</div>
					</div>
				</Tabs.Root>
			</>
		</SkeletonTheme>
	);
}

export default TitlePageLoading;
