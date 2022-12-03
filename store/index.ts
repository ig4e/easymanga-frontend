import create from "zustand";
import { devtools, persist } from "zustand/middleware";
import {
	ChapterNavigationMode,
	Quality,
} from "../components/Ui/ChapterPageSettingsMenu";
import { Chapter } from "../typings/chapter";

interface UserSettings {
	chapterPageQuality: Quality;
	chapterPageScale: number;
	chapterPageNavigationMode: ChapterNavigationMode;
	setChapterPageScale: (scale: number) => void;
	setChapterPageQuality: (quality: Quality) => void;
	setChapterPageNavigationMode: (mode: ChapterNavigationMode) => void;
}

export const useUserSettingsStore = create<UserSettings>()(
	devtools(
		persist(
			(set) => ({
				chapterPageQuality: "raw",
				chapterPageScale: 100,
				chapterPageNavigationMode: "scroll",

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
