import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import { client } from "../apollo-client";
import Navbar from "../components/Navbar";

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<ApolloProvider client={client}>
			<div className="font-body">
				<Navbar></Navbar>
				<Component {...pageProps} />
			</div>
		</ApolloProvider>
	);
}

export default MyApp;