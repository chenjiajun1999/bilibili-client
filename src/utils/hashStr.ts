import { Md5 } from "ts-md5";

export default function (value: string, baseStr?: string) {
	if (baseStr) {
		return `${baseStr}_${Md5.hashStr(value)}`;
	}
	return Md5.hashStr(value);
}
