const withPWA = require("next-pwa")({
	dest: "public",
	register: true,
	skipWaiting: true,
	disable: process.env.NODE_ENV === "development",
});

/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		domains: ["workers.emanga.tk", "emanga-img-ext1.mo.cloudinary.net"],
		unoptimized: true,
	},
	compiler: {
		styledComponents: {
			ssr: true,
		},
		//removeConsole: true,
	},
};

module.exports = withPWA(nextConfig);
