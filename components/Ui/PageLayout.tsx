import React from "react";
import Footer from "../Footer";
import Navbar from "../Navbar";

function PageLayout({ children }: any) {
	return (
		<>
			<Navbar></Navbar>
			<div className="container">{children}</div>
			<Footer></Footer>
		</>
	);
}

export default PageLayout;
