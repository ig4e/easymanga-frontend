import { ApolloClient, InMemoryCache } from "@apollo/client";

const useDevServer = false;
const useCyclicServer = true; //"https://wicked-gloves-moth.cyclic.app/graphql"
const useRenderServer = false; //"https://emanga-backend-tkty.onrender.com/graphql"

export const client = new ApolloClient({
	uri:
		process.env.NODE_ENV === "development"
			? useDevServer
				? "http://localhost:3000/graphql"
				: "https://wicked-gloves-moth.cyclic.app/graphql"
			: "https://wicked-gloves-moth.cyclic.app/graphql",
	// 	? "http://localhost:3000/graphql"
	// 	: useCyclicServer
	// 	? "https://wicked-gloves-moth.cyclic.app/graphql"
	// 	: useRenderServer
	// 	? "https://emanga-backend-tkty.onrender.com/graphql"
	// 	: "https://fr.emanga.tk/graphql"
	// : "https://wicked-gloves-moth.cyclic.app/graphql", //"https://fr.emanga.tk/graphql",
	cache: new InMemoryCache(),
});

export const anilistClient = new ApolloClient({
	uri: "https://graphql.anilist.co", //"https://api.emanga.tk/graphql",
	cache: new InMemoryCache(),
});
