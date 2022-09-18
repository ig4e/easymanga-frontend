import { gql } from "@apollo/client";

export const MANGA_FIELDS = gql`
	fragment MangaFields on Manga {
		dexId
		aniId
		muId
		slug
		url
		cover
		title
		altTitles
		genres
		synopsis
		status
		type
		author
		artist
		releaseYear
		score
		chapters {
			name
			number
		}
		source
	}
`;
