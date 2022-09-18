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
				sm: "1240px",
				md: "1240px",
				lg: "1240px",
				xl: "1240px",
				"2xl": "1240px",
			},
			padding: "1rem",
		},
	
		extend: {
			fontSize: {
				'base': '0.95rem',
			},
			colors: {
				primary: "#32aaff",
				base: "#ffffff",
				"base-100": "#f0f1f3",
				neutral: "#242424",
				"neutral-100": "#212328",
				"neutral-200": "#363940",

			},
		},
	},
	plugins: [],
};
