import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/solid";
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
			className="flex items-center gap-2 bg-root-100 justify-between hover:bg-neutral-200/25 p-1 md:p-1.5 rounded-md select-none group"
		>
			<div className="flex items-center gap-2">
				<div
					className={`w-4 h-4 md:w-6 md:h-6 ${
						small && "!w-5 !h-5"
					} ${ImageClassName}`}
				>
					<Image
						src={ImageSrc}
						className="rounded-md"
						title={title}
						alt={title}
					></Image>
				</div>

				<span
					className={`font-medium flex items-center gap-4 select-none group-hover:text-primary text-sm ${
						small && "!text-xs"
					}`}
				>
					{title}
				</span>
			</div>

			{!small && (
				<ArrowTopRightOnSquareIcon className="hidden md:block md:w-5 md:h-5"></ArrowTopRightOnSquareIcon>
			)}
		</Wrapper>
	);
}

export default ExternalSite;
