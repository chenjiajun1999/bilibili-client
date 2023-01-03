/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
	theme: {
		extend: {
			minWidth: {
				mobile: "350px",
				webside: "1120px"
			}
		}
	},
	plugins: []
};
