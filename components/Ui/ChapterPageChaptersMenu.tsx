import React, { useRef, useState } from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import {
	Bars3Icon,
	Cog6ToothIcon,
	XMarkIcon,
} from "@heroicons/react/24/outline";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import { AnimatePresence, motion } from "framer-motion";
import { Chapter } from "../../typings/chapter";
import Link from "next/link";

function ChapterPageChaptersMenu({ chapters }: { chapters: Chapter[] }) {
	const [open, setOpen] = useState(false);

	return (
		<div className="">
		
			<DropdownMenu.Root open={open} onOpenChange={setOpen}>
				<DropdownMenu.Trigger className="border border-white/60 p-2 px-4 rounded-full flex flex-row items-center gap-2 z-50">
					<Bars3Icon className="h-5 w-5"></Bars3Icon>
					<span className="text-sm">Chapters</span>
				</DropdownMenu.Trigger>

				<DropdownMenu.Portal
					className="absolute inset-0 bottom-0"
					forceMount={true}
				>
					<AnimatePresence>
						{open && (
							<DropdownMenu.Content asChild={true}>
								<motion.div
									initial={{ scale: 0 }}
									animate={{ scale: 1 }}
									exit={{ scale: 0, opacity: 0 }}
									transition={{
										type: "spring",
										duration: 0.3,
									}}
									className="relative p-4 pb-6 text-reverse rounded-t-xl drop-shadow-lg select-none bg-[#303030] z-50 w-screen max-h-[60vh] -mb-[3.31rem] md:w-auto md:h-auto md:mb-4 overflow-y-scroll"
								>
									<div className="fixed flex items-start justify-between z-50 bg-[#303030] inset-x-0 top-0 py-2 px-4">
										<DropdownMenu.Label className="text-lg font-semibold mb-3">
											Chapters
										</DropdownMenu.Label>
										<DropdownMenu.Item className="p-1.5 rounded-full hover:bg-white/10 focus:bg-white/15 active:bg-white/15">
											<XMarkIcon className="h-4 w-4 text-reverse"></XMarkIcon>
										</DropdownMenu.Item>
									</div>
									<div className="h-[56px]"></div>

									<div className="grid grid-flow-row grid-cols-3 md:grid-cols-4 gap-2 w-full">
										{chapters
											.slice(0, 100)
											?.map((chapter: Chapter) => {
												return (
													<Link
														key={chapter.slug}
														href={`/titles/${
															chapter.source
														}/${
															chapter.mangaSlug
														}/chapter?id=${encodeURIComponent(
															chapter.slug!,
														)}`}
													>
														<div className="p-2 border bg-root rounded-md flex gap-2 hover:bg-primary/10 transition text-neutral">
															<span className="text-xs">
																{chapter.number}
															</span>
															<span className="truncate line-clamp-1">
																{chapter.name}
															</span>
														</div>
													</Link>
												);
											})}
									</div>
								</motion.div>
							</DropdownMenu.Content>
						)}
					</AnimatePresence>
				</DropdownMenu.Portal>
			</DropdownMenu.Root>
		</div>
	);
}

export default ChapterPageChaptersMenu;
