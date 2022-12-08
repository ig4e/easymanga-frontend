import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import Image, { StaticImageData } from "next/image";
import React from "react";

function ExternalSite({
	href,
	title,
	ImageSrc,
	ImageClassName,
	small,
}: {
	href: string;
	title: string;
	ImageSrc: StaticImageData;
	ImageClassName?: string;
	small?: boolean;
}) {
	const Wrapper = ({ children, className, href }: any) =>
		small ? (
			<div className={className}>{children}</div>
		) : (
			<a
				className={className}
				href={href}
				target="_blank"
				rel="noreferrer"
			>
				{children}
			</a>
		);
	return (
		<Wrapper
			href={href}
			className="flex items-center gap-2 hover:bg-neutral-200/25 p-1 rounded-md select-none"
		>
			<div
				className={`w-6 h-6 ${small && "!w-5 !h-5"} ${ImageClassName}`}
			>
				<Image
					src={ImageSrc}
					className="rounded-md"
					title={title}
					alt={title}
				></Image>
			</div>
			<span
				className={`font-medium flex items-center gap-4 select-none  ${
					small && "!text-xs"
				}`}
			>
				{title}
				{!small && (
					<ArrowTopRightOnSquareIcon className="w-4 h-4"></ArrowTopRightOnSquareIcon>
				)}
			</span>
		</Wrapper>
	);
}

export default ExternalSite;
