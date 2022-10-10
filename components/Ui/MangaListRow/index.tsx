import React from "react";
import { Manga } from "../../../typings/manga";
import MangaCard from "../MangaCard";
import "swiper/css";
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
				slidesPerView={1}
				effect={"coverflow"}
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
