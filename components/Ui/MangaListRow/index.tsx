import React from "react";
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

function MangaListRow({ mangaList }: { mangaList: Manga[] }) {
	return (
		<div>
			<Swiper
				className="select-none w-full"
				effect={"fade"}
				lazy={true}
				longSwipes={true}
				longSwipesMs={800}
				spaceBetween={10}
				speed={500}
				freeMode={true}
				breakpoints={{
					0: {
						longSwipesRatio: 0.2,
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
						slidesPerView: 9.5,
					},
					1536: {
						slidesPerView: 10,
					},
				}}
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
					<SwiperSlide key={manga.slug}>
						<MangaCard manga={manga}></MangaCard>
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	);
}

export default MangaListRow;
