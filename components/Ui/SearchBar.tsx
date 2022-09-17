import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import * as Dialog from "@radix-ui/react-dialog";

function SearchBarUi({
	active,
	value,
	setQuery,
	className,
	width,
}: {
	active: boolean;
	value: string;
	className?: string;
	setQuery: any;
	width?: number;
}) {
	const MAX_WIDTH = width || 350;
	const MIN_WIDTH = width || 250;
	return (
		<div className={`h-full ${className}`}>
			<div className="h-full relative">
				<motion.input
					onChange={(e) =>
						setQuery(
							e.currentTarget.value.replace(/^.|( .)/g, (str) =>
								str.toUpperCase(),
							),
						)
					}
					initial={{ width: 0 }}
					animate={{ width: active ? MAX_WIDTH : MIN_WIDTH }}
					whileFocus={{ width: MAX_WIDTH }}
					className={`bg-base h-full w-full pr-2 pl-10 rounded outline-none relative placeholder:text-neutral-200 placeholder:font-normal text-neutral-100 font-medium focus:border focus:border-primary ${
						active ? "border-primary border" : ""
					}`}
					type="text"
					placeholder="Search..."
					value={value}
				></motion.input>
				<button className="absolute inset-0 left-2 pointer-events-none">
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
				</button>
			</div>
		</div>
	);
}

function SearchBar() {
	const [query, setQuery] = useState("");
	const [open, setOpen] = useState(false);
	useEffect(() => {
		console.log(query, open);
		const searchTimeout = setTimeout(() => setOpen(true), 250);
		return () => clearTimeout(searchTimeout);
	}, [query]);

	const DialogTitleStyles = `text-2xl font-medium my-4`;

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
						<Dialog.Overlay className="bg-neutral-100/50 fixed inset-0 grid  place-content-center">
							<Dialog.Content className="bg-base pb-6 px-6 rounded">
								<Dialog.Title className={DialogTitleStyles}>
									Search
								</Dialog.Title>
								<SearchBarUi
									className="h-12"
									setQuery={setQuery}
									value={query}
									active={open}
									width={1260}
								></SearchBarUi>
								<Dialog.Title className={`${DialogTitleStyles} my-6`}>
									Manga
								</Dialog.Title>
							</Dialog.Content>
						</Dialog.Overlay>
					</Dialog.Portal>
				</Dialog.Root>
			</motion.div>
		</>
	);
}

export default SearchBar;
