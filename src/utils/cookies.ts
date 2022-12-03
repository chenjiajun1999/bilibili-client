import { C } from "@/constants";
import Cookies from "js-cookie";

// 获取token字段
export function getToken() {
	// 此处与TOKEN_KEY相同，此写法解决初始化时Cookies中不存在TOKEN_KEY报错
	return sessionStorage.getItem(C.TOKEN_KEY);
}

// 设置token以及过期时间（cookies、sessionStorage各一份）
// 后端需要将用户信息和token以及过期时间都返回给前端，过期时间主要用于刷新token
export function setToken(dataString: string) {
	sessionStorage.setItem(C.TOKEN_KEY, dataString);
}

// 删除token
export function removeToken(successCallback?: () => any) {
	Cookies.remove(C.TOKEN_KEY);
	sessionStorage.removeItem(C.TOKEN_KEY);
	successCallback && successCallback();
}
