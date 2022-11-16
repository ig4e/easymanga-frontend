import React from "react";
import Navbar from "../Navbar";

function PageLayout({ children }: any) {
	return (
		<>
			<Navbar></Navbar>
			<div className="container">{children}</div>
		</>
	);
}

export default PageLayout;
