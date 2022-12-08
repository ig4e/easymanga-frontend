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
	},
	compiler: {
		styledComponents: {
			ssr: true,
		},
	},
};

module.exports = withPWA(nextConfig);
