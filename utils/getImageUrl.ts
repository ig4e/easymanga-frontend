export function getWorkersUrl(src: string, referer?: string) {
	return `https://easymangaproxy.sekai966.workers.dev/fetch?url=${src}&referer=${
		referer ? referer : "mangadex.org"
	}`;
}
