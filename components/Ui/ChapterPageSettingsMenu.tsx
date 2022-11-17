import React, { useState } from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Cog6ToothIcon } from "@heroicons/react/24/outline";
import * as ToggleGroup from "@radix-ui/react-toggle-group";

export type Quality = "raw" | "hd" | "sd" | "ld";

function ChapterPageSettingsMenu({
	quality,
	setQuality,
}: {
	quality: Quality;
	setQuality: (q: Quality) => void;
}) {
	return (
		<DropdownMenu.Root>
			<DropdownMenu.Trigger className="border border-white/60 p-2 px-4 rounded-full flex flex-row items-center gap-2">
				<Cog6ToothIcon className="h-5 w-5"></Cog6ToothIcon>
				<span className="text-sm">Settings</span>
			</DropdownMenu.Trigger>

			<DropdownMenu.Portal>
				<DropdownMenu.Content className="p-4 text-white rounded-md select-none bg-[#303030] z-50 m-3">
					<DropdownMenu.Label className="text-lg font-semibold mb-3">
						Quality
					</DropdownMenu.Label>
					<ToggleGroup.Root
						value={quality}
						onValueChange={(value: any) => value && setQuality(value)}
						className="flex gap-2 items-center"
						type="single"
						defaultValue="center"
						aria-label="Text alignment"
					>
						{["raw", "hd", "sd", "ld"].map((value) => {
							return (
								<ToggleGroup.Item
                                key={value}
									className={`uppercase rounded-md border font-semibold p-2 px-4 text-sm ${
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
						})}
					</ToggleGroup.Root>
				</DropdownMenu.Content>
			</DropdownMenu.Portal>
		</DropdownMenu.Root>
	);
}

export default ChapterPageSettingsMenu;
