import axios from "axios";
import { EmojiOption } from "types/emoji";
export default function useEmoji() {
	const emojiList: Array<EmojiOption> = [
		{
			id: "face",
			name: "小黄脸"
		},
		{
			id: "hot",
			name: "热词系列一"
		},
		{
			id: "tv",
			name: "tv_小电视"
		},
		{
			id: "tvIcon",
			name: "小电视"
		},
		{
			id: "girl",
			name: "2233娘"
		}
	];

	function getUrl(value: string) {
		const BASE_PATH = "../assets/emojis/";
		return new URL(`${BASE_PATH}${value}`, import.meta.url).href;
	}

	async function loadEmojiJson() {
		emojiList.forEach(emoji => {
			let url = getUrl(`${emoji.name}/index.json`);
			axios.get(url).then(res => {
				emoji.data = res.data;
			});
		});

		console.log(emojiList);
	}
	loadEmojiJson();
}
