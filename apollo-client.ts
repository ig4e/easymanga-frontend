import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
	uri: "https://apieu.emanga.tk/", //"https://api.emanga.tk/graphql",
	cache: new InMemoryCache(),
});
