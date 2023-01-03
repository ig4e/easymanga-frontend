import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import * as Dialog from "@radix-ui/react-dialog";
import {
	ChatBubbleBottomCenterTextIcon,
	XMarkIcon,
} from "@heroicons/react/24/outline";
import { DiscussionEmbed } from "disqus-react";
import { Manga } from "../typings/manga";
import { Chapter } from "../typings/chapter";

function CommentsDialog({
	manga,
	chapter,
}: {
	manga: Manga;
	chapter: Chapter;
}) {
	const [open, setOpen] = useState(false);
	return (
		<Dialog.Root open={open} onOpenChange={setOpen}>
			<Dialog.Trigger className="border border-white/60 p-2 px-4 rounded-full flex flex-row items-center gap-2 z-50">
				<ChatBubbleBottomCenterTextIcon className="h-5 w-5"></ChatBubbleBottomCenterTextIcon>
				<span className="text-sm">Comments</span>
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
									reducedMotion: "user",
									duration: 0.1,
								}}
								className="md:bg-root-100/50 fixed inset-0 flex flex-col items-center justify-start z-50"
							>
								<Dialog.Content asChild={true}>
									<motion.div
										initial={{ scale: 0.8 }}
										animate={{ scale: 1 }}
										exit={{ scale: 0, opacity: 0 }}
										transition={{
											type: "spring",
											duration: 0.5,
										}}
										className="bg-root pb-6 px-6 rounded max-w-7xl h-full md:h-auto w-full max-h-screen overflow-y-scroll md:mb-10 md:mt-[3.8rem] relative"
									>
										<div className="fixed inset-x-0 bg-root z-50 w-full max-w-7xl mx-auto px-6 pb-4 rounded text-reverse">
											<h1 className="text-3xl font-medium my-4 flex items-center justify-between">
												<span className="text-neutral">
													Comments
												</span>
												<Dialog.Close className="p-1.5 rounded-full hover:bg-neutral-100/10 focus:bg-neutral-100/15 active:bg-neutral-100/15">
													<XMarkIcon className="h-5 w-5 text-neutral-100" />
												</Dialog.Close>
											</h1>
										</div>
										<div className="h-[84px]"></div>

										<div
											className={`container text-primary pt-2 rounded-md CommentsSection`}
											style={{ colorScheme: "light" }}
											data-theme="light"
										>
											<DiscussionEmbed
												config={{
													url: `https://emanga.tk/titles/${
														manga.source
													}/${
														manga.slug
													}/chapter?id=${encodeURIComponent(
														chapter.slug!,
													)}`,
													identifier: `${manga.source}/${manga.slug}/${chapter.slug}`,
													title: `${manga.title} ${chapter.name}'s Comments`,
													language: "EN",
												}}
												shortname={`easy-manga`}
											></DiscussionEmbed>
										</div>
									</motion.div>
								</Dialog.Content>
							</motion.div>
						</Dialog.Overlay>
					</Dialog.Portal>
				)}
			</AnimatePresence>
		</Dialog.Root>
	);
}

export default CommentsDialog;
