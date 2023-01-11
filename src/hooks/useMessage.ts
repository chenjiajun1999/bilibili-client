import { ElMessage } from "element-plus";
import "element-plus/theme-chalk/src/message.scss";
import { C } from "@/constants";

export function useMessage(type: "success" | "warning" | "info" | "error", message: string) {
	ElMessage({
		message,
		type,
		duration: 2000,
		customClass: C.ELEMENT_MESSAGE_BOX_CLASS
	});
}
