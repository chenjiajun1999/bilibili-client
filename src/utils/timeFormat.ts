/* 时间格式化，秒格式化成xx:xx:xx
 */
export function secondTimeFormat(second: number) {
	let result = second;
	let h = Math.floor(result / 3600) < 10 ? "0" + Math.floor(result / 3600) : Math.floor(result / 3600);
	let m = Math.floor((result / 60) % 60) < 10 ? "0" + Math.floor((result / 60) % 60) : Math.floor((result / 60) % 60);
	let s = Math.floor(result % 60) < 10 ? "0" + Math.floor(result % 60) : Math.floor(result % 60);
	if (h == "00") return `${m}:${s}`;
	else return `${h}:${m}:${s}`;
}
