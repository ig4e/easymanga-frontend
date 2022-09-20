import React, { useEffect } from "react";
import { Manga } from "../../../typings/manga";
import MangaCardHorizontalList from "./MangaCardHorizontalList";
import { AnimatePresence, motion } from "framer-motion";

const breakpoints = {
	sm: 640,
	md: 768,
	lg: 1024,
	xl: 1280,
	"2xl": 1536,
};

function Index({ mangaList }: { mangaList: Manga[][] }) {
	const [width, setWidth] = React.useState(0);
	useEffect(() => {
		setWidth(window.innerWidth);
		window.addEventListener("resize", () => setWidth(window.innerWidth));
	}, []);

	return (
		<div className="grid gap-x-6 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1">
			{mangaList.map((list, i) => {
				if (i === 3 && width < breakpoints["xl"]) return null;
				if (i === 2 && width < breakpoints["lg"]) return null;
				if (i === 1 && width < breakpoints["md"]) return null;
				return (
					<motion.div
						key={i}
						initial={{ scale: 0.95 }}
						animate={{ scale: 1 }}
					>
						<MangaCardHorizontalList
							manga={list}
						></MangaCardHorizontalList>
					</motion.div>
				);
			})}
		</div>
	);
}

export default Index;
