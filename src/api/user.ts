import request from "@/utils/request";

export function getUserList() {
	return request({
		url: "/users",
		method: "get"
	});
}

export function getRSAPublicKey() {
	return request({
		url: "/rsa-pks",
		method: "get"
	});
}

export function getUserInfo() {
	return request({
		url: "/user-infos",
		method: "get"
	});
}
