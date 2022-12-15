import React, { useState } from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Cog6ToothIcon, XMarkIcon } from "@heroicons/react/24/outline";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import { AnimatePresence, motion } from "framer-motion";

export type Quality = "raw" | "hd" | "sd" | "ld";
export type ChapterNavigationMode = "scroll" | "buttons";

function ChapterPageSettingsMenu({
	quality,
	chapterNavigationMode,
	setQuality,
	setChapterNavigationMode,
}: {
	quality: Quality;
	setQuality: (q: Quality) => void;
	chapterNavigationMode: ChapterNavigationMode;
	setChapterNavigationMode: (q: ChapterNavigationMode) => void;
}) {
	const [open, setOpen] = useState(false);

	return (
		<DropdownMenu.Root open={open} onOpenChange={setOpen}>
			<DropdownMenu.Trigger className="border border-white/60 p-2 px-4 rounded-full flex flex-row items-center gap-2 z-50">
				<Cog6ToothIcon className="h-5 w-5"></Cog6ToothIcon>
				<span className="text-sm">Settings</span>
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
								transition={{ type: "spring", duration: 0.3 }}
								className=" p-4 pb-6 text-reverse rounded-t-md select-none bg-[#303030] z-50 w-screen mb-[3.2rem] md:w-auto  md:h-auto md:mb-4"
							>
								<div className="flex items-start justify-between">
									<DropdownMenu.Label className="text-lg font-semibold mb-3">
										Quality
									</DropdownMenu.Label>
									<DropdownMenu.Item className="p-1.5 rounded-full hover:bg-white/10 focus:bg-white/15 active:bg-white/15">
										<XMarkIcon className="h-4 w-4 text-reverse"></XMarkIcon>
									</DropdownMenu.Item>
								</div>

								<ToggleGroup.Root
									value={quality}
									onValueChange={(value: any) =>
										value && setQuality(value)
									}
									className="flex gap-2 justify-between items-center"
									type="single"
									defaultValue="center"
									aria-label="Text alignment"
								>
									{["raw", "hd", "sd", "ld", "pd"].map(
										(value) => {
											return (
												<ToggleGroup.Item
													key={value}
													className={`uppercase rounded-md border font-semibold w-full p-2 px-4 text-sm ${
														quality === value
															? "text-primary border-primary"
															: "border-white/60"
													}  `}
													value={value}
													aria-label={value}
												>
													{value}
												</ToggleGroup.Item>
											);
										},
									)}
								</ToggleGroup.Root>
								<DropdownMenu.Label className="text-lg font-semibold my-3">
									Chapter Navigation Mode
								</DropdownMenu.Label>

								<ToggleGroup.Root
									value={chapterNavigationMode}
									onValueChange={(value: any) =>
										value && setChapterNavigationMode(value)
									}
									className="flex gap-2 justify-between items-center"
									type="single"
									defaultValue="center"
									aria-label="Text alignment"
								>
									{["scroll", "buttons"].map((value) => {
										return (
											<ToggleGroup.Item
												key={value}
												className={`uppercase rounded-md border font-semibold w-full p-2 px-4 text-sm ${
													chapterNavigationMode ===
													value
														? "text-primary border-primary"
														: "border-white/60"
												}  `}
												value={value}
												aria-label={value}
											>
												{value.replace("-", " ")}
											</ToggleGroup.Item>
										);
									})}
								</ToggleGroup.Root>
							</motion.div>
						</DropdownMenu.Content>
					)}
				</AnimatePresence>
			</DropdownMenu.Portal>
		</DropdownMenu.Root>
	);
}

export default ChapterPageSettingsMenu;
