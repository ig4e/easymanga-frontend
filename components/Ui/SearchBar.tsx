import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";
import * as Dialog from "@radix-ui/react-dialog";
import tw from "tailwind-styled-components";

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
					className={`bg-base-100 h-full w-full pr-2 pl-10 rounded outline-none relative placeholder:text-neutral-200 placeholder:font-normal text-neutral-100 font-medium border focus:border-primary ${
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
	const [query, setQuery] = useState("");
	const [open, setOpen] = useState(false);

	useEffect(() => {
		const searchTimeout = setTimeout(() => {
			//setOpen(!!query);
			console.log(`Stopped typing`);
		}, 500);
		return () => clearTimeout(searchTimeout);
	}, [query]);

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

	return (
		<>
			<motion.div className="h-full relative">
				<Dialog.Root open={open} onOpenChange={setOpen}>
					<Dialog.Trigger className="h-full">
						<SearchBarUi
							setQuery={setQuery}
							value={query}
							active={open}
						></SearchBarUi>
					</Dialog.Trigger>
					<Dialog.Portal>
						<AnimatePresence>
							<Dialog.Overlay className="bg-neutral-100/50 fixed inset-0 flex flex-col items-center justify-center z-50">
								<motion.div
									initial={{ scale: 0.5 }}
									animate={{ scale: 1 }}
									exit={{ scale: 0.5 }}
									className="bg-base pb-6 px-6 rounded max-w-7xl w-full"
								>
									<Dialog.Content>
										<DialogTitle>
											Search
											<DialogClose>
												<XIcon />
											</DialogClose>
										</DialogTitle>
										<SearchBarUi
											className="h-12"
											setQuery={setQuery}
											value={query}
											active={open}
											width={"100%"}
											noAnimation={true}
										/>

										<DialogSecondaryTitle>
											Manga
										</DialogSecondaryTitle>
									</Dialog.Content>
								</motion.div>
							</Dialog.Overlay>
						</AnimatePresence>
					</Dialog.Portal>
				</Dialog.Root>
			</motion.div>
		</>
	);
}

export default SearchBar;
