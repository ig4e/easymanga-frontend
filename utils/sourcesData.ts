import AnilistLogo from "../public/images/logos/anilist.png";
import MDLogo from "../public/images/logos/mangadex.png";
import AresLogo from "../public/images/logos/ares.png";
import AzoraLogo from "../public/images/logos/azora.png";
import MangaSwatLogo from "../public/images/logos/mangaswat.png";
import OuzlScansLogo from "../public/images/logos/ouzlscans.png";
import FlameScansLogo from "../public/images/logos/flamescans.png";
import GalaxyMangaLogo from "../public/images/logos/galaxymanga.png";
import MangaLekLogo from "../public/images/logos/mangalek.png";
import StKissMangaLogo from "../public/images/logos/1stkiss.png";
import KissMangaLogo from "../public/images/logos/kissmanga.png";
import ArenaScansLogo from "../public/images/logos/arenascans.png";
import MangaProTmLogo from "../public/images/logos/mangaprotm.png";
import MangaSparkLogo from "../public/images/logos/mangaspark.png";
import TeamXLogo from "../public/images/logos/teamx.png";
import { StaticImageData } from "next/image";
import { Sources } from "../typings/enums";

export const sourcesData: SourcesData = {
	ARES: { name: "Ares Manga (AR)", image: AresLogo },
	GALAXYMANGA: { name: "Galaxy Manga (AR)", image: GalaxyMangaLogo },
	AZORA: { name: "Manga Azora (AR)", image: AzoraLogo },
	MANGASWAT: { name: "Manga Swat (AR)", image: MangaSwatLogo },
	OZULSCANS: { name: "Ozul Scans (AR)", image: OuzlScansLogo },
	MANGALEK: { name: "MangaLek (AR)", image: MangaLekLogo },
	MANGASPARK: { name: "Manga Spark (AR)", image: MangaSparkLogo },
	ANILIST: { name: "AniList (EN)", image: AnilistLogo },
	MANGADEX: { name: "Manga Dex (all)", image: MDLogo },
	TEAMX: { name: "Team X (AR)", image: TeamXLogo },
	STKISSMANGA: { name: "1st Kiss Manga (EN)", image: StKissMangaLogo },
	KISSMANGA: { name: "Kiss Manga (EN)", image: KissMangaLogo },
	MANGAPROTM: { name: "Manga Pro TM (AR)", image: MangaProTmLogo },
	ARENASCANS: { name: "Arena Scams (AR)", image: ArenaScansLogo },
	ASHQ: { name: "3asq (AR)", image: ArenaScansLogo },
	MANGAKAKALOT: { name: "Mangakakalot (EN)", image: ArenaScansLogo },
};


export type SourcesData = {
	[key in Sources]: SourceData;
};

export interface SourceData {
	name: string;
	image: StaticImageData;
}
