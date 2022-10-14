import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import Image, { StaticImageData } from "next/image";
import React from "react";

function ExternalSite({
	href,
	title,
	ImageSrc,
}: {
	href: string;
	title: string;
	ImageSrc: StaticImageData;
}) {
	return (
		<a
			href={href}
			className="flex items-center gap-2 hover:bg-neutral-200/25 p-1 rounded-md"
		>
			<div className="w-6 h-6">
				<Image src={ImageSrc} className="rounded-md"></Image>
			</div>
			<span className="font-medium flex items-center gap-4">
				{title}
				<ArrowTopRightOnSquareIcon className="w-4 h-4"></ArrowTopRightOnSquareIcon>
			</span>
		</a>
	);
}

export default ExternalSite;
