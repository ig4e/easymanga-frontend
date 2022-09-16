import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
	uri: "https://api.emanga.tk/graphql",
	cache: new InMemoryCache(),
});
