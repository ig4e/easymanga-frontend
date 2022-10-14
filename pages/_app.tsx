import Router from "next/router";
import NProgress from "nprogress"; //nprogress module
import "nprogress/nprogress.css"; //styles of nprogress
import "../styles/globals.css";
import "../styles/Nprogress.css";

import type { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import { client } from "../apollo-client";
import Navbar from "../components/Navbar";
import { AnimatePresence, motion } from "framer-motion";

//Route Events.
NProgress.configure({});

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

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
