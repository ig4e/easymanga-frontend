/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx}",
		"./components/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		fontFamily: {
			display: ["'Inter'", "sans-serif"],
			body: ["'Inter'", "sans-serif"],
		},
		container: {
			center: true,
			screens: {
				sm: "1440px",
				md: "1440px",
				lg: "1440px",
				xl: "1440px",
				"2xl": "1440px",
			},
			padding: "1rem",
		},

		extend: {
			fontSize: {
				base: "0.95rem",
			},
			colors: {
				primary: "#32aaff",
				base: "#ffffff",
				"base-100": "#f0f1f3",
				neutral: "#242424",
				"neutral-100": "#212328",
				"neutral-200": "#777777",
			},
		},
	},
	plugins: [],
};
