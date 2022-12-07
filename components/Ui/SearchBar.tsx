import React, { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";
import * as Dialog from "@radix-ui/react-dialog";
import tw from "tailwind-styled-components";
import { Sources } from "../../typings/enums";
import { Manga } from "../../typings/manga";
import { gql, useLazyQuery, useQuery } from "@apollo/client";
import { MANGA_FIELDS } from "../../apollo/fragments";
import { sourcesData } from "../../utils/sourcesData";
import ExternalSite from "./ExternalSite";
import MangaCard from "./MangaCard";

function SearchBarUi({
	active,
	value,
	setQuery,
	className,
	width,
	noAnimation,
}: {
	active: boolean;
	value: string;
	className?: string;
	setQuery: any;
	width?: number | string;
	noAnimation?: boolean;
}) {
	const MAX_WIDTH = width || 320;
	const MIN_WIDTH = width || 250;
	const CURRENT_WIDTH = active ? MAX_WIDTH : MIN_WIDTH;
	return (
		<div className={`h-full ${className}`}>
			<div className="h-full relative">
				<div className="absolute inset-0 left-2 pointer-events-none z-50 flex w-full items-center">
					{active ? (
						<svg
							className="animate-spin w-6 h-5 text-neutral-200"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
						>
							<circle
								className="opacity-25"
								cx="12"
								cy="12"
								r="10"
								stroke="currentColor"
								strokeWidth="4"
							></circle>
							<path
								className="opacity-75"
								fill="currentColor"
								d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
							></path>
						</svg>
					) : (
						<MagnifyingGlassIcon className="w-6 h-5 text-neutral-200"></MagnifyingGlassIcon>
					)}
				</div>
				<motion.input
					onChange={(e) =>
						setQuery(
							e.currentTarget.value.replace(/^.|( .)/g, (str) =>
								str.toUpperCase(),
							),
						)
					}
					initial={{ width: noAnimation ? CURRENT_WIDTH : 0 }}
					animate={{ width: CURRENT_WIDTH }}
					whileFocus={{ width: MAX_WIDTH }}
					className={`bg-base-100 h-full w-full ${className} pr-2 pl-10 rounded outline-none relative placeholder:text-neutral-200 placeholder:font-normal text-neutral-100 font-medium border focus:border-primary ${
						active ? "border-primary" : ""
					}`}
					type="text"
					placeholder="Search..."
					value={value}
				/>
			</div>
		</div>
	);
}

function SearchBar() {
	const queryString = useMemo(() => {
		const sources = [
			"ARES",
			"GALAXYMANGA",
			"MANGALEK",
			"MANGASPARK",
			"AZORA",
			"MANGASWAT",
			//"MANGAAE",
			"OZULSCANS",
			"TEAMX",
			"STKISSMANGA",
			"KISSMANGA",
			"MANGAPROTM",
			"ARENASCANS",
			"ASHQ",
			"MANGAKAKALOT",
		];

		const searchQueryGraphql = `   <source>: search(searchInput: { query: $query, source: <source> }) {
		...MangaFields
		}`;

		const queryBody = `query Search($query: String!) {
			${sources
				.map((source) => {
					return searchQueryGraphql.replace(/\<source\>/g, source);
				})
				.join("\n")}
			}`;
		return gql`
			${MANGA_FIELDS}
			${queryBody}
		`;
	}, []);

	const [open, setOpen] = useState(false);

	interface SearchResult {
		source: Sources;
		results: Manga[];
	}
	const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
	const [searchQuery, setSearchQuery] = useState("");
	const [getSearchResults, { loading, error, data }] =
		useLazyQuery(queryString);

	const [typing, setTyping] = useState(false);

	const DialogTitle: any = tw(
		Dialog.Title,
	)`text-3xl font-medium my-4 flex items-center justify-between`;
	const DialogSecondaryTitle: any = tw(
		DialogTitle,
	)`text-2xl font-medium my-6 flex items-center justify-between`;
	const XIcon: any = tw(XMarkIcon)`h-5 w-5 text-neutral-100`;
	const DialogClose: any = tw(
		Dialog.Close,
	)`p-1.5 rounded-full hover:bg-neutral-100/10 focus:bg-neutral-100/15 active:bg-neutral-100/15`;

	useEffect(() => {
		setTyping(true);
		const searchTimeout = setTimeout(async () => {
			setTyping(false);
			if (!searchQuery) return;
			const { data } = await getSearchResults({
				variables: { query: searchQuery },
			});

			const sources = Object.keys(data);

			const result: SearchResult[] = sources.map((source) => {
				return {
					source: source as any as Sources,
					results: data[source] as Manga[],
				};
			});

			setSearchResults(result);
		}, 500);
		return () => clearTimeout(searchTimeout);
	}, [searchQuery]);

	return (
		<>
			<motion.div className="h-full relative">
				<Dialog.Root open={open} onOpenChange={setOpen}>
					<Dialog.Trigger className="h-full">
						<div className="hidden md:block h-full">
							<SearchBarUi
								setQuery={setSearchQuery}
								value={searchQuery}
								active={open}
							></SearchBarUi>
						</div>
						<MagnifyingGlassIcon className="w-6 h-5 stroke-2 md:hidden"></MagnifyingGlassIcon>
					</Dialog.Trigger>
					<AnimatePresence>
						{open && (
							<Dialog.Portal forceMount>
								<Dialog.Overlay asChild>
									<motion.div
										initial={{ opacity: 0 }}
										animate={{ opacity: 1 }}
										exit={{ opacity: 0 }}
										transition={{
											duration: 0.1,
										}}
										className="md:bg-neutral-100/50 fixed inset-0 flex flex-col items-center justify-start z-50"
									>
										<Dialog.Content asChild={true}>
											<motion.div
												initial={{ scale: 0 }}
												animate={{ scale: 1 }}
												exit={{ scale: 0, opacity: 0 }}
												transition={{
													type: "spring",
													duration: 0.5,
												}}
												className="bg-base pb-6 px-6 rounded max-w-7xl h-full md:h-auto w-full max-h-screen overflow-y-scroll md:mt-16 relative"
											>
												<div className="fixed inset-x-0 bg-base z-50 w-full max-w-7xl mx-auto px-6 pb-4 rounded">
													<DialogTitle>
														Search
														<DialogClose>
															<XIcon />
														</DialogClose>
													</DialogTitle>
													<SearchBarUi
														className="!h-10"
														setQuery={
															setSearchQuery
														}
														value={searchQuery}
														active={open}
														width={"100%"}
														noAnimation={true}
													/>
												</div>
												<div className="h-[124px]"></div>
												{loading ? (
													<div className="flex justify-center items-center py-6">
														<svg
															className="animate-spin w-24 h-24 text-neutral-200"
															xmlns="http://www.w3.org/2000/svg"
															fill="none"
															viewBox="0 0 24 24"
														>
															<circle
																className="opacity-25"
																cx="12"
																cy="12"
																r="10"
																stroke="currentColor"
																strokeWidth="4"
															></circle>
															<path
																className="opacity-75"
																fill="currentColor"
																d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
															></path>
														</svg>
													</div>
												) : (
													searchQuery && (
														<div>
															{searchResults.length >
																0 && (
																<DialogSecondaryTitle>
																	Manga
																</DialogSecondaryTitle>
															)}
															<div className="flex flex-col items-start gap-4">
																{searchResults.filter(
																	(x) =>
																		x
																			.results
																			.length >
																		0,
																).length > 0
																	? searchResults.map(
																			({
																				results,
																				source,
																			}) => {
																				if (
																					results.length <=
																					0
																				)
																					return null;

																				const sourceData =
																					sourcesData[
																						source
																					];

																				return (
																					<div
																						key={
																							source +
																							"-result"
																						}
																						className="flex flex-col items-start gap-4"
																					>
																						<ExternalSite
																							title={
																								sourceData.name
																							}
																							ImageSrc={
																								sourceData.image!
																							}
																							href={
																								results[0]
																									?.url ||
																								"https://aresmanga.com"
																							}
																						></ExternalSite>

																						<div className="grid grid-flow-row grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-7 xl:grid-cols-8 gap-2">
																							{results.map(
																								(
																									manga,
																								) => {
																									return (
																										<Dialog.Close
																											key={
																												source +
																												"-result-" +
																												manga.slug
																											}
																											asChild
																										>
																											<MangaCard
																												onClick={() => {
																													console.log(
																														"close please!!",
																													);
																												}}
																												key={
																													source +
																													"-result-" +
																													manga.slug
																												}
																												manga={
																													manga
																												}
																												mobile={
																													true
																												}
																											></MangaCard>
																										</Dialog.Close>
																									);
																								},
																							)}
																						</div>
																					</div>
																				);
																			},
																	  )
																	: searchQuery &&
																	  !typing && (
																			<div className="flex items-center justify-center w-full">
																				<h1 className="text-xl font-semibold">
																					No
																					Search
																					Results
																					Found
																				</h1>
																			</div>
																	  )}
															</div>
														</div>
													)
												)}
											</motion.div>
										</Dialog.Content>
									</motion.div>
								</Dialog.Overlay>
							</Dialog.Portal>
						)}
					</AnimatePresence>
				</Dialog.Root>
			</motion.div>
		</>
	);
}

export default SearchBar;
