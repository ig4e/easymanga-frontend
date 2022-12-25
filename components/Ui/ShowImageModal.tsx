import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import * as Dialog from "@radix-ui/react-dialog";
import tw from "tailwind-styled-components";
import Image from "next/image";
import { ArrowsPointingOutIcon } from "@heroicons/react/24/outline";

function ShowImageModal({
	children,
	imgSrc,
	layoutId,
}: {
	children: any;
	imgSrc: string;
	layoutId?: string;
}) {
	const [isLoaded, setIsLoaded] = useState(false);
	const [isOpen, setIsOpen] = useState(false);
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		const delay = setTimeout(() => setIsVisible(isOpen), 0);

		return () => clearTimeout(delay);
	}, [isOpen]);

	return (
		<div className="relative">
			<Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
				<Dialog.Trigger className="relative h-full">
					<div className="absolute inset-0 bg-black/25 opacity-0 transition hover:opacity-100 grid place-items-center z-40 rounded-md">
						<ArrowsPointingOutIcon className="text-reverse stroke-1 h-12 w-12"></ArrowsPointingOutIcon>
					</div>

					<AnimatePresence>{children}</AnimatePresence>
				</Dialog.Trigger>
				<Dialog.Portal forceMount={true}>
					<AnimatePresence>
						{isOpen && (
							<>
								<Dialog.Overlay forceMount={true} asChild>
									<motion.div
										initial={{ opacity: 0 }}
										animate={{ opacity: 1 }}
										exit={{ opacity: 0 }}
										transition={{
											duration: 0.1,
										}}
										className="fixed inset-0 bg-root-100/50 z-40"
									></motion.div>
								</Dialog.Overlay>

								<div className="fixed inset-0 grid place-items-center z-50">
									<Dialog.Content className="max-w-[92.5vw] md:max-w-xl w-full relative aspect-[3/4] rounded-md">
										
										<motion.div>
											<a
												target={"_blank"}
												rel="noreferrer"
												href={imgSrc}
											>
												{isVisible && (
													<motion.img
														layoutId={layoutId}
														onLoad={() =>
															setIsLoaded(true)
														}
														src={imgSrc}
														height={285}
														width={200}
														className="rounded-md object-cover h-full w-full aspect-[200/285] bg-neutral-200"
														alt={""}
													></motion.img>
												)}
											</a>
										</motion.div>
									</Dialog.Content>
								</div>
							</>
						)}
					</AnimatePresence>
				</Dialog.Portal>
			</Dialog.Root>
		</div>
	);
}

export default ShowImageModal;
