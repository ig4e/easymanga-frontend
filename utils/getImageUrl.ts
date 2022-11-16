export function getWorkersUrl(src: string, referer?: string) {
	return `https://workers.emanga.tk/fetch?url=${src}&referer=${
		referer ? referer : "mangadex.org"
	}`;
}
