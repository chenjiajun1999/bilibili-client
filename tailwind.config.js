/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
	theme: {
		extend: {
			minWidth: {
				mobile: "350px",
				webside: "1120px"
			},
			textColor: {
				primary: "var(--b-c-text-primary)",
				secondly: "var(--b-c-text-secondly)",
				thirdly: "var(--b-c-text-thirdly)",
				fourthly: "var(--b-c-text-fourthly)",
				link: "var(--b-c-text-link)",
				notice: "var(--b-c-text-notice)",
				regular: "var(--b-c-text-regular)",
				active: "var(--b-c-text-active)"
			},
			colors: {
				"blue-0": "var(--b-c-blue-0)",
				"gray-0": "var(--b-c-gray-0)",
				"gray-1": "var(--b-c-gray-1)",
				"gray-2": "var(--b-c-gray-2)",
				"gray-3": "var(--b-c-gray-3)",
				"gray-4": "var(--b-c-gray-4)",
				"gray-5": "var(--b-c-gray-5)",
				"gray-6": "var(--b-c-gray-6)",
				"gray-7": "var(--b-c-gray-7)",
				"gray-8": "var(--b-c-gray-8)",
				"gray-9": "var(--b-c-gray-9)",
				"gray-10": "var(--b-c-gray-10)",
				"line-light": "var(--b-c-line-light)",
				"line-regular": "var(--b-c-line-regular)",
				"line-bold": "var(--b-c-line-bold)"
			}
		}
	},
	plugins: []
};
