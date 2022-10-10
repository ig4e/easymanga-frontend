import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import { client } from "../apollo-client";
import Navbar from "../components/Navbar";
import { AnimatePresence, motion } from "framer-motion";

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<ApolloProvider client={client}>
			<div className="font-body">
				<Navbar></Navbar>
				<div className="container">
					<Component {...pageProps} />
				</div>
			</div>
		</ApolloProvider>
	);
}

export default MyApp;
