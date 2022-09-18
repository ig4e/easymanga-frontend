import { Chapter } from "./chapter";

export interface Manga {
    dexId?: string;
    aniId?: string;
    muId?: string;
    slug: string;
    url: string;
    cover: string;
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
}