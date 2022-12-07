import { Chapter } from "./chapter";
import { Sources } from "./enums";

export interface Manga {
	dexId?: string;
	aniId?: string;
	muId?: string;
	slug: string;
	url: string;
	cover: string;
	covers?: MangaCover[];
	title: string;
	altTitles: string[];
	genres: string[];
	synopsis?: string;
	status?: string;
	type?: string;
	author?: string;
	artist?: string;
	releaseYear?: number;
	score?: number;
	chapters?: Chapter[];
	source: Sources;
}


interface MangaCover {
    url: string;
    volume: string;
}