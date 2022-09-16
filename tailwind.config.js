/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx}",
		"./components/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			colors: {
				primary: "#2C4CE5",
				base: "#0F1117",
				"base-100": "#212328",
				neutral: "#C1C1C2",
				"neutral-100": "#FFFFFF",
			},
		},
	},
	plugins: [],
};
