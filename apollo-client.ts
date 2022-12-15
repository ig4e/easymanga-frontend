import { ApolloClient, InMemoryCache } from "@apollo/client";

const useDevServer = false;
const useCyclicServer = true;

export const client = new ApolloClient({
	uri:
		process.env.NODE_ENV === "development"
			? useDevServer
				? "http://localhost:3000/graphql" 
				: useCyclicServer ? "https://wicked-gloves-moth.cyclic.app" : "https://fr.emanga.tk/graphql"
			: "https://fr.emanga.tk/graphql", //"https://api.emanga.tk/graphql",
	cache: new InMemoryCache(),
});

export const anilistClient = new ApolloClient({
	uri: "https://graphql.anilist.co", //"https://api.emanga.tk/graphql",
	cache: new InMemoryCache(),
});
