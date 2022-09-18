import React from "react";
import { Manga } from "../../../typings/manga";
import { layoutGenerator } from 'react-break';
import MangaCardHorizontalList from "./MangaCardHorizontalList";

const layout = layoutGenerator({
    mobile: 0,
    phablet: 550,
    tablet: 768,
    desktop: 992,
    
  });

  /*
  'sm': '640px',
  // => @media (min-width: 640px) { ... }

  'md': '768px',
  // => @media (min-width: 768px) { ... }

  'lg': '1024px',
  // => @media (min-width: 1024px) { ... }

  'xl': '1280px',
  // => @media (min-width: 1280px) { ... }

  '2xl': '1536px',
  // => @media (min-width: 1536px) { ... }
  */

function index({ mangaList }: { mangaList: Manga[][] }) {
	return (
		<div className="grid gap-x-6 2xl:grid-cols-3 lg:grid-cols-2 grid-cols-1">
			{mangaList.map((list, i) => (
				<MangaCardHorizontalList key = {i} manga={list}></MangaCardHorizontalList>
			))}
		</div>
	);
}

export default index;
