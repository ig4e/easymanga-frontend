import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import * as Dialog from "@radix-ui/react-dialog";
import tw from "tailwind-styled-components";
import Image from "next/image";
import { ArrowsPointingOutIcon } from "@heroicons/react/24/outline";

function ShowImageModal({
	children,
	imgSrc,
}: {
	children: any;
	imgSrc: string;
}) {
	const [isLoaded, setIsLoaded] = useState(false);

	return (
		<motion.div className="relative">
			<AnimatePresence>
				<Dialog.Root>
					<Dialog.Trigger className="relative h-full">
						<div className="absolute inset-0 bottom-2  bg-black/25 opacity-0 transition hover:opacity-100 grid place-items-center z-40 rounded-md">
							<ArrowsPointingOutIcon className="text-white stroke-1 h-12 w-12"></ArrowsPointingOutIcon>
						</div>

						{children}
					</Dialog.Trigger>
					<Dialog.Portal>
						<Dialog.Overlay className="bg-neutral-100/50 fixed inset-0 flex flex-col items-center justify-center z-50">
							<motion.div
								initial={{ scale: 0.5 }}
								animate={{ scale: 1 }}
								exit={{ scale: 0.5 }}
								transition={{
									type: "spring",
									duration: 0.4,
								}}
								className="max-w-[95vw] md:max-w-xl w-full relative aspect-[3/4] rounded-md"
							>
								<Dialog.Content className="">
									{!isLoaded && (
										<>
											<div className="absolute inset-0 bg-neutral-200/80 animate-pulse z-50 rounded-md"></div>
											<div className="absolute inset-0 bg-neutral-100/25 backdrop-blur-lg rounded-md"></div>
										</>
									)}
									<a
										target={"_blank"}
										rel="noreferrer"
										href={imgSrc}
									>
										<Image
											quality={100}
											src={imgSrc}
											layout="fill"
											onLoad={() => setIsLoaded(true)}
											className={`${
												isLoaded
													? "opacity-100"
													: "opacity-0"
											} rounded-md`}
											alt={"manga cover"}
										></Image>
									</a>
								</Dialog.Content>
							</motion.div>
						</Dialog.Overlay>
					</Dialog.Portal>
				</Dialog.Root>
			</AnimatePresence>
		</motion.div>
	);
}

export default ShowImageModal;
