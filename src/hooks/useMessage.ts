import { ElementEnum } from "@/enum/elementEnum";
import { ElMessage } from "element-plus";
import "element-plus/theme-chalk/src/message.scss";

export function useMessage(type: "success" | "warning" | "info" | "error", message: string) {
	ElMessage({
		message,
		type,
		duration: 2000,
		customClass: ElementEnum.ELEMENT_MESSAGE_BOX_CLASS
	});
}
