import create from "zustand";
import { devtools, persist } from "zustand/middleware";
import {
	ChapterNavigationMode,
	Quality,
} from "../components/Ui/ChapterPageSettingsMenu";
import { Chapter } from "../typings/chapter";

export type SourceUnion =
	| "ARES"
	| "GALAXYMANGA"
	| "MANGALEK"
	| "MANGASPARK"
	| "AZORA"
	| "MANGASWAT"
	| "MANGAAE"
	| "OZULSCANS"
	| "TEAMX"
	| "STKISSMANGA"
	| "KISSMANGA"
	| "MANGAPROTM"
	| "ARENASCANS"
	| "ASHQ"
	| "MANGAKAKALOT";

interface UserSettings {
	currentSource: SourceUnion;
	theme: "light" | "dark";
	chapterPageQuality: Quality;
	chapterPageScale: number;
	chapterPageNavigationMode: ChapterNavigationMode;
	setCurrentSource: (newSource: SourceUnion) => void;
	setChapterPageScale: (scale: number) => void;
	setChapterPageQuality: (quality: Quality) => void;
	setChapterPageNavigationMode: (mode: ChapterNavigationMode) => void;
	setTheme: (newTheme: "light" | "dark") => void;
}

export const useUserSettingsStore = create<UserSettings>()(
	devtools(
		persist(
			(set) => ({
				currentSource: "MANGAKAKALOT",
				theme: "light",
				chapterPageQuality: "raw",
				chapterPageScale: 100,
				chapterPageNavigationMode: "scroll",

				setCurrentSource: (newSource) => {
					set(() => ({
						currentSource: newSource,
					}));
				},

				setChapterPageScale: (scale: number) => {
					set(() => ({
						chapterPageScale: scale,
					}));
				},
				setChapterPageQuality: (quality: Quality) => {
					set(() => ({
						chapterPageQuality: quality,
					}));
				},
				setChapterPageNavigationMode: (mode: ChapterNavigationMode) => {
					set(() => ({
						chapterPageNavigationMode: mode,
					}));
				},
				setTheme(newTheme) {
					set(() => ({
						theme: newTheme,
					}));
				},
			}),
			{
				name: "userSettingsStore",
			},
		),
	),
);

interface ChapterPage {
	loading: boolean;
	allChapters: Chapter[];
	currentChapter: Chapter;
	currentChapterProgress: number;
	setCurrentChapterProgress: (progress: number) => void;
	setAllChapters: (chapters: Chapter[]) => void;
	setCurrentChapter: (chapter: Chapter) => void;
	addChapter: (chapter: Chapter) => void;
	addPrevChapter: (chapter: Chapter) => void;
	setLoading: (loading: boolean) => void;
	resetState: () => void;
}

export const useChapterPageStore = create<ChapterPage>()(
	devtools((set) => ({
		loading: false,
		allChapters: [],
		currentChapter: {} as any,
		currentChapterProgress: 1,
		setCurrentChapterProgress(progress) {
			set(() => ({ currentChapterProgress: progress }));
		},
		setCurrentChapter(chapter) {
			set(() => ({ currentChapter: chapter }));
		},
		setAllChapters(chapters) {
			set(() => ({ allChapters: chapters }));
		},
		addChapter(chapter) {
			set((state) => ({
				allChapters: [
					...state.allChapters.filter((x) => x.slug !== chapter.slug),
					chapter,
				],
			}));
		},
		addPrevChapter(chapter) {
			set((state) => ({
				allChapters: [
					chapter,
					...state.allChapters.filter((x) => x.slug !== chapter.slug),
				],
			}));
		},
		setLoading(loading) {
			set(() => ({ loading }));
		},

		resetState() {
			set(() => ({
				loading: false,
				allChapters: [],
				currentChapter: {} as any,
				currentChapterProgress: 1,
			}));
		},
	})),
);
