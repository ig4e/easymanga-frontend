import Link from "next/link";
import React from "react";

function Footer() {
	return (
		<div className="py-2 container mx-auto mb-14">
			<div className="w-full flex justify-between items-end">
				<div className="flex flex-col">
					<span className="text-sm">© EasyManga 2022-2023</span>
					<span className="text-xs">By Ahmed Mohamed</span>
				</div>
                                <div className="flex flex-col text-sm">
				  <Link href={"/privacy"}>
				    Privacy Policy
				  </Link>
                                  <span>TOS</span>
                                </div>
			</div>
		</div>
	);
}

export default Footer;
