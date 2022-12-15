import {
	ArrowPathRoundedSquareIcon,
	ListBulletIcon,
} from "@heroicons/react/24/outline";
import { HomeIcon } from "@heroicons/react/24/solid";
import { LayoutGroup } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import NavLink from "../Ui/NavLink";
import SearchBar from "../Ui/SearchBar";

function Navbar({
	navClass,
	mode,
}: {
	navClass?: string;
	mode?: "transparent";
}) {
	const location = useRouter();

	return (
		<>
			<div
				className={`${navClass} h-12 md:h-14 ${
					mode === "transparent" && "h-0"
				} `}
			>
				<nav
					className={`bg-base backdrop-blur-sm my-0 py-2.5 shadow md:shadow-md fixed w-screen h-12 md:h-14 z-50 ${navClass} ${
						mode === "transparent" &&
						"bg-black/20 text-white md:text-neutral md:bg-base"
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

						<div className="flex items-center space-x-2 h-full">
							<SearchBar />
						</div>
					</div>
				</nav>
			</div>

			<footer className="md:hidden">
				<div className="fixed bottom-0 z-50 shadow-inner border-t-[1px] border-t-black/25 inset-x-0 bg-base">
					<div className="flex items-center justify-between container">
						<Link
							href={"/"}
							className="flex flex-col items-center w-full py-2 select-none"
						>
							<HomeIcon
								className={`h-5 w-5 fill-current ${
									location.pathname === "/"
										? "text-primary"
										: "text-black/60"
								}`}
							></HomeIcon>
							<span className="text-xs ">Home</span>
						</Link>

						<Link
							href={"/titles"}
							className="flex flex-col items-center w-full py-2 select-none"
						>
							<ListBulletIcon
								className={`h-5 w-5 fill-current ${
									location.pathname === "/titles"
										? "text-primary"
										: "text-black/60"
								}`}
							></ListBulletIcon>
							<span className="text-xs stroke-2 ">Titles</span>
						</Link>

						<Link
							href={"/"}
							className="flex flex-col items-center w-full py-2 select-none"
						>
							<ArrowPathRoundedSquareIcon
								className={`h-5 w-5 ${
									location.pathname === "/random"
										? "text-primary"
										: "text-black/60"
								} `}
							></ArrowPathRoundedSquareIcon>
							<span className="text-xs stroke-2 ">Random</span>
						</Link>
					</div>
				</div>
			</footer>
		</>
	);
}

export default Navbar;
