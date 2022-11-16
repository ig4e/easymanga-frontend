import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

function ChapterPageLoader({ src }: { src: string }) {
	const [isLoaded, setIsLoaded] = useState(false);
	const imgRef: any = useRef();

	useEffect(() => {
		setIsLoaded(imgRef.current.complete);
		console.log("img: ", imgRef.current.complete);
	}, [imgRef]);

	return (
		<div className="relative w-full select-none">
			{!isLoaded && (
				<>
					<div className="absolute inset-0 bg-neutral-200/80 animate-pulse z-20 select-none"></div>
					<div className="absolute inset-0 bg-neutral-100/25 backdrop-blur-lg select-none "></div>
				</>
			)}
			<img
				ref={imgRef}
				src={src}
				onLoad={() => setIsLoaded(true)}
				className={`${isLoaded ? "opacity-100" : "opacity-0"} select-none w-full`}
			></img>
		</div>
	);
}

export default ChapterPageLoader;
