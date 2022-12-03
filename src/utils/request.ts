import axios from "axios";
import { getToken } from "@/utils/cookies";
import { ElMessage } from "element-plus";

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

const errorCode = new Map([
	[401, "认证失败，无法访问系统资源"],
	[403, "当前操作没有权限"],
	[404, "访问资源不存在"],
	[0, "系统未知错误，请反馈给管理员"]
]);

// 添加请求拦截器
service.interceptors.request.use(
	config => {
		if (!config?.headers) {
			throw new Error(`Expected 'config' and 'config.headers' not to be undefined`);
		}

		config.headers["Authorization"] = "Bearer " + getToken();
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

// 添加响应拦截器
service.interceptors.response.use(
	res => {
		// 未设置状态码则默认成功状态
		const code = res.data.code || 200;
		// 获取错误信息
		const msg = errorCode.get(code) || res.data.msg || errorCode.get(0);
		// 二进制数据则直接返回
		if (res.request.responseType === "blob" || res.request.responseType === "arraybuffer") {
			return res.data;
		}
		if (code === 401) {
			ElMessage({
				message: "无效的会话，或者会话已过期，请重新登录。",
				type: "error",
				duration: 2000
			});
			return Promise.reject("无效的会话，或者会话已过期，请重新登录。");
		} else if (code === 500) {
			return Promise.reject(new Error(msg));
		} else if (code !== 200) {
			return Promise.reject("error");
		} else {
			return res.data;
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
