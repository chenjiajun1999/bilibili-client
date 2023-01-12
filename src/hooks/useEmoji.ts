import axios from "axios";
import { EmojiOption } from "types/emoji";
export default function useEmoji() {
	const emojiMap = ref<Map<string, string>>(new Map());
	const emojiList = ref<Array<EmojiOption>>([
		{
			id: "face",
			name: "小黄脸",
			data: new Map(),
			isLarge: false
		},
		{
			id: "hot",
			name: "热词系列一",
			data: new Map(),
			isLarge: true
		},
		{
			id: "tv",
			name: "tv_小电视",
			data: new Map(),
			isLarge: false
		},
		{
			id: "tvIcon",
			name: "小电视",
			data: new Map(),
			isLarge: true
		},
		{
			id: "girl",
			name: "2233娘",
			data: new Map(),
			isLarge: true
		}
	]);

	function getUrl(value: string) {
		const BASE_PATH = "../assets/emojis/";
		return new URL(`${BASE_PATH}${value}`, import.meta.url).href;
	}

	onMounted(() => {
		emojiList.value.forEach(emoji => {
			let url = getUrl(`${emoji.id}/index.json`);
			axios.get(url).then(res => {
				let data = new Map(Object.entries(res.data));
				data.forEach((value, key) => {
					emoji.data.set(key, getUrl(`${emoji.id}/${value}`));
					emojiMap.value.set(key, getUrl(`${emoji.id}/${value}`));
				});
			});
		});
	});

	return { emojiList, emojiMap };
}
