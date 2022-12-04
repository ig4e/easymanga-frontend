const withPWA = require("next-pwa");

/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	images: {
		domains: ["workers.emanga.tk"],
	},
	compiler: {
		styledComponents: {
			ssr: true,
		},
	},
};

module.exports = withPWA({
	...nextConfig,
	pwa: {
		dest: "public",
		register: true,
		skipWaiting: true,
	},
	disable: process.env.NODE_ENV === "development",
});
