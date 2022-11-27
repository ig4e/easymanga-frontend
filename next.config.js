const withOffline = require("next-offline");

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

module.exports = withOffline(nextConfig);
