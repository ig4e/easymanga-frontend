import {
	ComputerDesktopIcon,
	MoonIcon,
	SunIcon,
} from "@heroicons/react/24/outline";
import {
	HomeIcon,
	ArrowPathRoundedSquareIcon,
	ListBulletIcon,
} from "@heroicons/react/24/solid";
import { LayoutGroup } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useUserSettingsStore } from "../../store";
import NavLink from "../Ui/NavLink";
import SearchBar from "../Ui/SearchBar";
import { useTheme } from "next-themes";

function Navbar({
	navClass,
	mode,
}: {
	navClass?: string;
	mode?: "transparent";
}) {
	const location = useRouter();
	const { theme, forcedTheme, themes, resolvedTheme, systemTheme, setTheme } =
		useTheme();
	/*const { theme, setTheme } = useUserSettingsStore((state) => ({
		theme: state.theme,
		setTheme: state.setTheme,
	}));*/

	return (
		<>
			<div
				className={`${navClass} h-12 md:h-14 ${
					mode === "transparent" && "h-0"
				} `}
			>
				<nav
					className={`bg-root backdrop-blur-sm my-0 py-2.5 shadow md:shadow-md fixed w-screen h-12 md:h-14 z-50 ${navClass} ${
						mode === "transparent" &&
						"bg-black/20 text-reverse md:text-neutral md:bg-root"
					} rounded-b-md md:rounded-b-none`}
				>
					<div className="flex items-center justify-between container h-full w-full">
						<div className="flex items-center space-x-16">
							<Link href={"/"}>
								<div className="flex items-center space-x-2">
									<div className="md:h-8 md:w-8 w-6 h-6 rounded-md">
										<Image
											className="rounded-md"
											src={"/assets/logo-128x128.png"}
											width={128}
											height={128}
											alt={"Easy Manga"}
										></Image>
									</div>
									<h1 className="md:font-semibold uppercase">
										Easy Manga
									</h1>
								</div>
							</Link>
							<LayoutGroup id="underlineNav">
								<div className="hidden items-center space-x-6 mt-1.5 md:flex">
									<NavLink href="/" title="Home"></NavLink>
									<NavLink
										href="/titles"
										title="Titles"
									></NavLink>
								</div>
							</LayoutGroup>
						</div>

						<div className="flex items-center space-x-4 h-full">
							<SearchBar />

							<button
								onClick={() =>
									setTheme(
										theme === "light" ? "dark" : "light",
									)
								}
								className="p-1 rounded-full hover:bg-neutral-100/10 focus:bg-neutral-100/15 active:bg-neutral-100/15"
							>
								{(resolvedTheme === "system" ? (
									<ComputerDesktopIcon
										className={`${navClass} h-6 w-6 text-neutral stroke-current`}
									></ComputerDesktopIcon>
								) : (
									(theme === "light" && (
										<SunIcon
											className={`${navClass} h-6 w-6 text-neutral stroke-current`}
										></SunIcon>
									)) ||
									(theme === "dark" && (
										<MoonIcon
											className={`${navClass} h-6 w-6 text-neutral stroke-current`}
										></MoonIcon>
									))
								)) || (
									<SunIcon
										className={`${navClass} h-6 w-6 text-neutral stroke-current`}
									></SunIcon>
								)}
							</button>
						</div>
					</div>
				</nav>
			</div>

			<footer className="md:hidden">
				<div className="fixed bottom-0 z-50 shadow-inner border-t-[1px] border-t-neutral/25 inset-x-0 bg-root">
					<div className="flex items-center justify-between container">
						<Link
							href={"/"}
							className="flex flex-col items-center w-full py-2 select-none transition"
						>
							<HomeIcon
								className={`h-5 w-5 stroke-current ${
									location.pathname === "/"
										? "text-primary fill-current"
										: "text-neutral/60 fill-transparent"
								}`}
							></HomeIcon>
							<span className="text-xs ">Home</span>
						</Link>

						<Link
							href={"/titles"}
							className="flex flex-col items-center w-full py-2 select-none transition"
						>
							<ListBulletIcon
								className={`h-5 w-5 stroke-current ${
									location.pathname === "/titles"
										? "text-primary fill-current"
										: "text-neutral/60 fill-transparent"
								}`}
							></ListBulletIcon>
							<span className="text-xs stroke-2 ">Titles</span>
						</Link>

						<Link
							href={"/"}
							className="flex flex-col items-center w-full py-2 select-none transition"
						>
							<ArrowPathRoundedSquareIcon
								className={`h-5 w-5 stroke-current ${
									location.pathname === "/random"
										? "text-primary fill-current"
										: "text-neutral/60 fill-transparent"
								} `}
							></ArrowPathRoundedSquareIcon>
							<span className="text-xs stroke-2">Random</span>
						</Link>
					</div>
				</div>
			</footer>
		</>
	);
}

export default Navbar;
