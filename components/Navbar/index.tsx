import Image from "next/image";
import Link from "next/link";
import React from "react";
import Logo from "../../public/logo.png";
import NavLink from "../Ui/NavLink";
import SearchBar from "../Ui/SearchBar";

function Navbar() {
	return (
		<div className="h-14">
			<nav className="bg-base backdrop-blur-md my-0 py-2.5 shadow-md fixed w-screen h-14 z-40">
				<div className="flex items-center justify-between container h-full w-full">
					<div className="flex items-center space-x-16">
						<Link href={"/"}>
							<a
								href={"/"}
								className="flex items-center space-x-2"
							>
								<div className="h-8 w-8 rounded-md">
									<Image
										className="rounded-md"
										src={Logo}
									></Image>
								</div>
								<h1 className="font-semibold text-lg mt-1">
									Easy Manga
								</h1>
							</a>
						</Link>
						<div className="hidden items-center space-x-6 mt-1.5 md:flex">
							<NavLink href="/" title="Home"></NavLink>
							<NavLink href="/titles" title="Titles"></NavLink>
						</div>
					</div>

					<div className="flex items-center space-x-2 h-full">
						<SearchBar />
					</div>
				</div>
			</nav>
		</div>
	);
}

export default Navbar;
