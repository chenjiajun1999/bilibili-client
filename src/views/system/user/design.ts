import { CTableColumn } from "types/Table";
import { User } from "types/User";

export const setupUserAttributes = () => {
	const userColumns = computed<CTableColumn<User>[]>(() => {
		return [
			{
				type: "selection",
				show: true,
				width: "55"
			},
			{
				prop: "id",
				show: true,
				label: "ID",
				width: "55"
			},
			{
				prop: "name",
				show: true,
				label: "名称",
				width: "270"
			},
			{
				prop: "acount",
				show: true,
				label: "账号",
				width: "270"
			},
			{
				prop: "password",
				show: true,
				label: "密码",
				width: "270"
			},
			{
				prop: "email",
				show: true,
				label: "邮箱",
				width: "270"
			},
			{
				prop: "create_time",
				show: true,
				label: "创建时间",
				showOverflowTooltip: true
			},
			{
				prop: "actions",
				show: true,
				label: "操作",
				fixed: "right",
				scoped: "actions",
				width: "150"
			}
		];
	});
	return {
		userColumns
	};
};
