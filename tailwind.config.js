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
				/*
--color-primary: 50, 170, 255;
		--color-primary-hover: 20, 157, 255;
		--color-primary-active: 0, 143, 245;
		--color-root: 255, 255, 255;
		--color-root-100: 240, 241, 243;
		--color-neutral: 36, 36, 36;
		--color-neutral-100: 33, 35, 40;
		--color-neutral-200: 119, 119, 119;
		--color-reverse: 255, 255, 255;
		--color-reverse-100: 240, 241, 243;
				*/

				primary: "rgb(var(--color-primary) / <alpha-value>)",
				"primary-hover":
					"rgb(var(--color-primary-hover) / <alpha-value>)",
				"primary-active":
					"rgb(var(--color-primary-active) / <alpha-value>)",
				root: "rgb(var(--color-root) / <alpha-value>)",
				"root-100": "rgb(var(--color-root-100) / <alpha-value>)",
				neutral: "rgb(var(--color-neutral) / <alpha-value>)",
				"neutral-100": "rgb(var(--color-neutral-100) / <alpha-value>)",
				"neutral-200": "rgb(var(--color-neutral-200) / <alpha-value>)",
				reverse: "rgb(var(--color-reverse-100) / <alpha-value>)",
				"reverse-100": "rgb(var(--color-reverse) / <alpha-value>)",
				"em-background": "rgb(var(--em-background) / <alpha-value>)",
				"em-background-translucent":
					"rgb(var(--em-background-translucent) / <alpha-value>)",

				//dark mode
				// primary: "#32aaff",
				// "primary-hover": "#149DFF",
				// "primary-active": "#008FF5",
				// root: "#121318",
				// "root-100": "#222328",
				// neutral: "#deefef",
				// "neutral-100": "#f4f8f0",
				// "neutral-200": "#b6b6b6",
				// reverse: "#ffffff",
				// "reverse-100": "#f0f1f3",

				//white mode
				// primary: "#32aaff",
				// "primary-hover": "#149DFF",
				// "primary-active": "#008FF5",
				// root: "#ffffff",
				// "root-100": "#f0f1f3",
				// neutral: "#242424",
				// "neutral-100": "#212328",
				// "neutral-200": "#777777",
				// reverse: "#ffffff",
				// "reverse-100": "#f0f1f3",
			},
		},
	},
	plugins: [],
};
