import axios from "axios";
import { getToken } from "@/utils/cookies";
import { useMessage } from "@/hooks/useMessage";

// 创建axios
const service = axios.create({
	// axios中请求配置有baseURL选项，表示请求URL公共部分
	baseURL: import.meta.env.VITE_APP_BASE_API,
	// 超时
	timeout: 60000,
	headers: {
		Accept: "application/json, text/plain, */*",
		"Content-Type": "application/json",
		"X-Requested-With": "XMLHttpRequest"
	}
});

const tansParams = (params?: any) => {
	let result = "";
	for (const propName of Object.keys(params)) {
		const value = params[propName];
		let part = encodeURIComponent(propName) + "=";
		if (value !== null && typeof value !== "undefined") {
			if (typeof value === "object") {
				for (const key of Object.keys(value)) {
					if (value[key] !== null && typeof value[key] !== "undefined") {
						let params = propName + "[" + key + "]";
						let subPart = encodeURIComponent(params) + "=";
						result += subPart + encodeURIComponent(value[key]) + "&";
					}
				}
			} else {
				result += part + encodeURIComponent(value) + "&";
			}
		}
	}
	return result;
};

// 添加请求拦截器
service.interceptors.request.use(
	config => {
		if (!config?.headers) {
			throw new Error(`Expected 'config' and 'config.headers' not to be undefined`);
		}

		config.headers["Authorization"] = getToken()!;
		//get请求映射params参数
		if (config.method === "get" && config.params) {
			let url = config.url + "?" + tansParams(config.params);
			url = url.slice(0, -1);
			config.params = {};
			config.url = url;
		}

		return config;
	},
	error => {
		console.log(error);
		return Promise.reject(error);
	}
);

const errCode = [
	"B_TOKEN_ERROR",
	"B_TOKEN_NOT_EXIT",
	"B_TOKEN_INVALID",
	"B_TOKEN_EXPIRE",
	"B_TOKEN_IS_REPLACED",
	"B_TOKEN_IS_BANNED"
];
const errCodeSet = new Set(errCode);
// 添加响应拦截器
service.interceptors.response.use(
	res => {
		const success = res.data.success;
		const errCode = res.data.errCode;
		const errMessage = res.data.errMessage;
		// 二进制数据则直接返回
		if (res.request.responseType === "blob" || res.request.responseType === "arraybuffer") {
			return res.data;
		}

		if (success == true) {
			return res.data;
		} else if (errCodeSet.has(errCode)) {
			useMessage("error", "无效的会话，或者会话已过期，请重新登录。");
			return Promise.reject("无效的会话，或者会话已过期，请重新登录。");
		} else {
			return Promise.reject(new Error(errCode, errMessage));
		}
	},
	error => {
		console.log("err" + error);
		let { message } = error;
		if (message == "Network Error") {
			message = "后端接口连接异常";
		} else if (message.includes("timeout")) {
			message = "系统接口请求超时";
		} else if (message.includes("Request failed with status code")) {
			message = "系统接口" + message.substr(message.length - 3) + "异常";
		}
		return Promise.reject(error);
	}
);

export default service;
