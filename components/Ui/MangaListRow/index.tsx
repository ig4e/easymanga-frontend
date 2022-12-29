import React, { useEffect } from "react";
import { Manga } from "../../../typings/manga";
import MangaCard from "../MangaCard";
import "swiper/css/bundle";
import { Swiper, SwiperSlide } from "swiper/react";
import {
	A11y,
	EffectCube,
	FreeMode,
	Keyboard,
	Manipulation,
	Mousewheel,
	Virtual,
} from "swiper";
import Link from "next/link";
import tw from "tailwind-styled-components";
const breakpoints = {
	sm: 640,
	md: 768,
	lg: 1024,
	xl: 1280,
	"2xl": 1536,
};
function MangaListRow({
	mangaList,
	title,
	href,
}: {
	mangaList: Manga[];
	title: string;
	href: string;
}) {
	const Header: any = tw.h1`text-2xl font-semibold mb-2`;
	const [width, setWidth] = React.useState(0);
	useEffect(() => {
		setWidth(window.innerWidth);
		window.addEventListener("resize", () => setWidth(window.innerWidth));
		return () =>
			window.removeEventListener("resize", () =>
				setWidth(window.innerWidth),
			);
	}, []);

	return (
		<div className="flex flex-col gap-2">
			<Header>{title}</Header>
			<Swiper
				className="select-none w-full grid grid-flow-col grid-rows-1"
				effect={"fade"}
				lazy={true}
				longSwipes={true}
				longSwipesMs={800}
				spaceBetween={10}
				speed={500}
				freeMode={true}
				longSwipesRatio={0.2}
				slidesPerView={"auto"}
				slideToClickedSlide={false}
				keyboard={{ enabled: true }}
				mousewheel={true}
				breakpoints={{
					0: {
						slidesPerView: 2.7,
					},
					520: {
						slidesPerView: 4,
					},
					900: {
						slidesPerView: 6,
					},
					1024: {
						slidesPerView: 8.7,
					},

					1305: {
						slidesPerView: 9,
					},
					1536: {
						slidesPerView: 10,
					},
				}}
				autoHeight={true}
				modules={[
					FreeMode,
					Keyboard,
					Mousewheel,
					A11y,
					EffectCube,
					Manipulation,
				]}
			>
				{mangaList.map((manga) => (
					<SwiperSlide key={manga.slug} className="h-full">
						<MangaCard
							mobile={width < breakpoints["md"]}
							manga={manga}
						></MangaCard>
					</SwiperSlide>
				))}
			</Swiper>
			<Link
				className="self-end my-2 text-sm text-neutral-200 font-medium hover:text-neutral"
				href={href}
			>
				View All
			</Link>
		</div>
	);
}

export default MangaListRow;
