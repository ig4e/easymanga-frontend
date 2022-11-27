const sources = ["ARES", "GALAXYMANGA", "MANGASWAT", "OZULSCANS"];
const searchQuery = `   <source>Search: search(searchInput: { query: "<query>", source: <source> }) {
    ...MangaFields
    }`;

let query = "level";

const queryBody = `query Search {
${sources
		.map((source) => {
			return searchQuery
				.replace(/\<source\>/g, source)
				.replace("<query>", query);
		})
		.join("\n")}
}`;

console.log(queryBody);
