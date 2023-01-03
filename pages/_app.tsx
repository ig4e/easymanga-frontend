import Router from "next/router";
import NProgress from "nprogress"; //nprogress module
import "nprogress/nprogress.css"; //styles of nprogress
import "../styles/globals.css";
import "../styles/Nprogress.css";

import type { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import { client } from "../apollo-client";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import { useUserSettingsStore } from "../store";
import { ThemeProvider } from "next-themes";
import TitlePageLoading from "../components/Loading/TitlePageLoading";
import TitlesPageLoading from "../components/Loading/TitlesPageLoading";

//Route Events.
NProgress.configure({});

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

function MyApp({ Component, pageProps }: AppProps) {
	//const theme = useUserSettingsStore((state) => state.theme);

	/*useEffect(() => {
		const body =
			typeof window !== "undefined" && document.getElementById("_body");
		if (body) {
			if (theme === "dark") return body.classList.add("dark");
			body.classList.remove("dark");
		}
	}, [theme]);*/

	const [navigationState, setNavigationState] = useState<{
		loading: boolean;
		pageType: "home" | "titles" | "title" | "chapter";
	}>({
		loading: false,
		pageType: "home",
	});

	useEffect(() => {
		//http://localhost:3000/titles/MANGAKAKALOT/chapmanganato[]manga-ax951880/chapter?id=chapmanganato%5B%5D%2Fmanga-ax951880%2Fchapter-410.1
		//http://localhost:3000/titles/MANGAKAKALOT/chapmanganato[]manga-ax951880?tab=chapters
		//http://localhost:3000/titles
		//http://localhost:3000/
		// console.log("hi?>?>??");

		Router.events.on(
			"routeChangeStart",
			(url: string, options: { shallow: boolean }) => {
				console.log(url, options);
				if (options.shallow) return;
				const [
					location = "/",
					sourceSlug,
					mangaSlug,
					chapterPageString,
				] = url.split("/").filter((str) => !!str);
				if (location === "/")
					return setNavigationState({
						loading: true,
						pageType: "home",
					});
				if (location === "titles") {
					if (sourceSlug && mangaSlug) {
						const isChapterPage = !!chapterPageString;
						if (isChapterPage)
							return setNavigationState({
								loading: true,
								pageType: "chapter",
							});
						return setNavigationState({
							loading: true,
							pageType: "title",
						});
					}
					return setNavigationState({
						loading: true,
						pageType: "titles",
					});
				}
			},
		);
		Router.events.on(
			"routeChangeComplete",
			(url: string, options: { shallow: boolean }) => {
				console.log(url, options);
				if (options.shallow) return;
				const [
					location = "/",
					sourceSlug,
					mangaSlug,
					chapterPageString,
				] = url.split("/").filter((str) => !!str);
				if (location === "/")
					return setNavigationState({
						loading: false,
						pageType: "home",
					});
				if (location === "titles") {
					if (sourceSlug && mangaSlug) {
						const isChapterPage = !!chapterPageString;
						if (isChapterPage)
							return setNavigationState({
								loading: false,
								pageType: "chapter",
							});
						return setNavigationState({
							loading: false,
							pageType: "title",
						});
					}
					return setNavigationState({
						loading: false,
						pageType: "titles",
					});
				}
			},
		);
	}, []);

	useEffect(() => {
		console.log(navigationState);
		if (typeof window !== "undefined" && navigationState.loading) {
			if (navigationState.pageType === "title")
				window.scroll({ top: 0, behavior: "smooth" });
		}
	}, [navigationState]);

	return (
		<ApolloProvider client={client}>
			<div className="font-body text-neutral">
				<ThemeProvider >
					{navigationState.loading && (
						<>
							{navigationState.pageType === "title" && (
								<TitlePageLoading />
							)}

							{navigationState.pageType === "titles" && (
								<TitlesPageLoading />
							)}
						</>
					)}
					{(!navigationState.loading ||
						navigationState.pageType === "home" ||
						navigationState.pageType === "chapter") && (
						<Component {...pageProps} />
					)}
				</ThemeProvider>
			</div>
		</ApolloProvider>
	);
}

export default MyApp;
