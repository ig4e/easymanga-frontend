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
		domains: ["workers.emanga.tk"],
		unoptimized: true,
	},
	compiler: {
		styledComponents: {
			ssr: true,
		},
		removeConsole: true,
	},
};

module.exports = withPWA(nextConfig);
