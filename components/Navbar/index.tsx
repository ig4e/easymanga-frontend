import Image from "next/image";
import React from "react";
import Logo from "../../public/logo.png";

function Navbar() {
	return (
		<nav className="bg-base w-full container mx-auto py-2">
			<div className="flex items-center justify-between">
				<div className="flex items-center justify-between">
					<div className="h-12 w-12">
						<Image className= "rounded-full" src={Logo} alt="Easy Manga Logo"></Image>
					</div>
				</div>
			</div>
		</nav>
	);
}

export default Navbar;
