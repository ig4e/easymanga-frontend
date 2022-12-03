import Image, { StaticImageData } from "next/image";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Quality } from "./ChapterPageSettingsMenu";

function ChapterPageLoader({
	src,
	id,
	setProgress,
	quality,
}: {
	src: string;
	id: string;
	setProgress: (pageId: string) => void;
	quality: Quality;
}) {
	const [isLoaded, setIsLoaded] = useState(false);

	const imgRef = useRef<any>(null);
	const contRef = useRef<any>(null);

	function observerCallback(entries: any) {
		const [entry] = entries;
		if (entry.isIntersecting) {
			setProgress(id);
		}
	}

	useEffect(() => {
		const observer = new IntersectionObserver(observerCallback, {});
		const currentTarget = contRef.current;
		if (currentTarget) observer.observe(currentTarget);
		return () => {
			if (currentTarget) observer.unobserve(currentTarget);
		};
	}, [isLoaded, contRef]);

	useEffect(() => {
		if (imgRef?.current?.complete) {
			setIsLoaded(true);
		}
	}, [imgRef]);

	function getReQuailtyUrl(src: string, q: Quality) {
		const qObj = { raw: 100, hd: 80, sd: 50, ld: 25, pd: 1 };
		return `/api/requality?url=${encodeURIComponent(src)}&q=${qObj[q]}`;
	}

	const imgSrc = quality === "raw" ? src : getReQuailtyUrl(src, quality);

	return (
		<div
			id={`pg-` + id}
			ref={isLoaded ? contRef : undefined}
			className={`relative w-full select-none ${
				!isLoaded ? "h-[60rem]" : ""
			}`}
		>
			{!isLoaded && (
				<>
					<div className="absolute inset-0 backdrop-blur-lg select-none bg-neutral-200/20 flex items-center h-[60rem] justify-center rouned-md animate-pulse"></div>
					<div className="absolute inset-0 backdrop-blur-lg select-none flex items-center h-[60rem] justify-center rouned-md">
						<svg
							className="animate-spin w-36 h-36"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
						>
							<circle
								className="opacity-25 text-neutral-200"
								cx="12"
								cy="12"
								r="10"
								stroke="currentColor"
								strokeWidth="4"
							></circle>
							<path
								className="opacity-75 text-primary"
								fill="currentColor"
								d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
							></path>
						</svg>
					</div>
				</>
			)}

			<img
				ref={imgRef}
				onLoad={() => setIsLoaded(true)}
				src={imgSrc}
				className={`${
					isLoaded ? "opacity-100" : "opacity-0"
				} ${src.includes("discordapp") && "h-1"} select-none w-full`}
			></img>
		</div>
	);
}

export default ChapterPageLoader;
