import Router from "next/router";
import NProgress from "nprogress"; //nprogress module
import "nprogress/nprogress.css"; //styles of nprogress
import "../styles/globals.css";
import "../styles/Nprogress.css";

import type { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import { client } from "../apollo-client";
import Navbar from "../components/Navbar";
import { useEffect } from "react";
import { useUserSettingsStore } from "../store";

//Route Events.
NProgress.configure({});

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

function MyApp({ Component, pageProps }: AppProps) {
	const theme = useUserSettingsStore((state) => state.theme);

	useEffect(() => {
		const body =
			typeof window !== "undefined" && document.getElementById("_body");
		if (body) {
			if (theme === "dark") return body.classList.add("dark");
			body.classList.remove("dark");
		}
	}, [theme]);

	return (
		<ApolloProvider client={client}>
			<div className="font-body text-neutral ">
				<Component {...pageProps} />
			</div>
		</ApolloProvider>
	);
}

export default MyApp;
