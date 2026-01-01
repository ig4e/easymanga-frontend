import { ApolloClient, InMemoryCache } from "@apollo/client";

const useDevServer = false;
const useCyclicServer = true; //"https://wicked-gloves-moth.cyclic.app/graphql"
const useRenderServer = false; //"https://emanga-backend-tkty.onrender.com/graphql"

export const client = new ApolloClient({
	uri: "https://ooock4ogckssg0sw88wokssw.albosaty.dev/graphql"
	cache: new InMemoryCache(),
});

export const anilistClient = new ApolloClient({
	uri: "https://graphql.anilist.co", //"https://api.emanga.tk/graphql",
	cache: new InMemoryCache(),
});
