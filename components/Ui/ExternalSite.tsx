import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import Image, { StaticImageData } from "next/image";
import React from "react";

function ExternalSite({
	href,
	title,
	ImageSrc,
	ImageClassName,
}: {
	href: string;
	title: string;
	ImageSrc: StaticImageData;
	ImageClassName?: string;
}) {
	return (
		<a
			href={href}
			target="_blank"
			rel="noreferrer"
			className="flex items-center gap-2 hover:bg-neutral-200/25 p-1 rounded-md select-none"
		>
			<div className={`w-6 h-6 ${ImageClassName}`}>
				<Image src={ImageSrc} className="rounded-md" title={title}></Image>
			</div>
			<span className="font-medium flex items-center gap-4 select-none">
				{title}
				<ArrowTopRightOnSquareIcon className="w-4 h-4"></ArrowTopRightOnSquareIcon>
			</span>
		</a>
	);
}

export default ExternalSite;
