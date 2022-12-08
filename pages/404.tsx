import Image from "next/image";
import React from "react";
import PageLayout from "../components/Ui/PageLayout";
import Logo128x128 from "../public/assets/logo-128x128.png";

function NotFoundError() {
	return (
		<PageLayout>
			<div className="grid place-items-center w-full h-[90vh]">
				<div className="flex flex-col items-center gap-2">
					<Image src={Logo128x128}></Image>
					<div className="text-center">
						<h1 className="text-5xl font-black">404</h1>
						<h1 className="text-xl">Page Not Found</h1>
					</div>
				</div>
			</div>
		</PageLayout>
	);
}

export default NotFoundError;
