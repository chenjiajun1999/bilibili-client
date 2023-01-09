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
				primary: "#18191c",
				secondly: "#61666d",
				thirdly: "#9499a0",
				fourthly: "#c9ccd0",
				link: "#00bac5"
			},
			colors: {
				custom: {
					gray: {
						lighter: "#f1f2f3",
						light: "#e3e5e7",
						DEFAULT: "#9499a0",
						dark: "#61666d"
					},
					blue: {
						DEFAULT: "#00aeec"
					},
					black: {
						dark: "#18191c",
						light: "#212121"
					}
				}
			}
		}
	},
	plugins: []
};
