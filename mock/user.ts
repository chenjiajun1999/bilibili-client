import { Random } from "mockjs";
export interface User {
	id?: number;
	acount?: string;
	password?: string;
	avatar?: string;
	name?: string;
	email?: string;
	create_time?: string;
}

let data: User[] = [];
const total = 50;
for (let i = 1; i <= total; i++) {
	data.push({
		id: i,
		acount: "acount_" + Random.string(5),
		password: Random.string(10),
		avatar: "http://images.nowcoder.com/head/" + Math.floor(Math.random() * 1000) + "t.png",
		name: "name_" + Random.string(5),
		email: "nowcoder1@sina.com",
		create_time: "2019-04-13 02:11:03"
	});
}

export default [
	{
		url: "/dev-api/user",
		method: "get",
		response: params => {
			let query = JSON.stringify(params.query);
			let [pageNum, pageSize] = [JSON.parse(query).pageNum, JSON.parse(query).pageSize];
			let subData = data.slice((pageNum - 1) * pageSize, pageNum * pageSize);

			return {
				code: 200,
				message: "请求成功",
				status: "success",
				data: subData,
				total: total
			};
		}
	}
];
