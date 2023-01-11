import { ElMessageBox } from "element-plus";
import { C } from "@/constants";

export function useDialog(msg: string, successCallback: (params?: any) => any, errCallback?: (err: any) => any) {
	ElMessageBox.confirm(msg, undefined, {
		customStyle: {
			width: C.ELEMENT_MESSAGE_BOX_SIZE
		}
	})
		.then(() => {
			successCallback();
		})
		.catch((err: Error) => {
			errCallback && errCallback(err);
		});
}
