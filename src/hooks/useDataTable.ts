import request from "@/utils/request";
import { AjaxResult } from "types/AjaxResult";

class DataTableFactory<T, U> {
	dataSource = ref<T[]>([]);
	loading = ref<boolean>(false);
	ids = ref<number[]>([]);
	queryParam = ref<U>();
	url = ref<string>("");
	modalFormRef = ref<any>();
	drawerFormRef = ref<any>();
	pagination = reactive({
		current: 1,
		total: 0,
		pageSize: 10,
		pageSizeOptions: [5, 10, 20, 50, 100]
	});

	constructor(url: string) {
		this.url.value = url;
	}
}

/**
 * 接受一个 restful 接口 "/:object"，提供基础的增删改查方法
 * @param url restful 接口 "/:object"
 * @returns 方法合集
 */

export function useDataTable<T, U = any>(url: string) {
	const factory = new DataTableFactory<T, U>(url);

	const { dataSource, pagination, loading, queryParam, ids, modalFormRef, drawerFormRef } = toRefs(reactive(factory));

	const getQueryParams = () => {
		return {
			pageNum: pagination.value.current,
			pageSize: pagination.value.pageSize,
			...queryParam.value
		} as unknown as U;
	};

	const loadData = async <T>(firstPage = false) => {
		if (firstPage) {
			pagination.value.current = 1;
		}
		const params = getQueryParams();
		loading.value = true;
		return await request({
			url: url,
			method: "get",
			params: params
		}).then(res => {
			dataSource.value = res.data;
			pagination.value.total = (res as unknown as AjaxResult<T>).total!;
			loading.value = false;
		});
	};

	const handleOpenAddDialog = () => {
		modalFormRef.value.edit({});
		modalFormRef.value.title = "添加";
	};

	const handleSearch = (values: any) => {
		queryParam.value = values;
		loadData(true);
	};

	const handleReset = () => {
		queryParam.value = {} as any;
		loadData(true);
	};

	const handleOpenEditDialog = <T>(record: T, title = "编辑") => {
		modalFormRef.value.edit(record);
		modalFormRef.value.title = title;
	};

	/**
	 * 新增表单提交
	 * @param params 表单内容
	 * @returns 响应信息
	 */
	const handleAdd = async (params: T) => {
		return await request({
			url: url,
			method: "post",
			data: params
		});
	};

	/**
	 * 编辑表单提交
	 * @param params 表单内容
	 * @returns 响应信息
	 */
	const handleEdit = async (params: T) => {
		return await request({
			url: url,
			method: "put",
			data: params
		});
	};

	/**
	 * 删除单个数据
	 * @param id id
	 * @returns 响应信息
	 */
	const handleDelete = async (id: number) => {
		await request({
			url: url + "/" + id,
			method: "delete"
		}).then(() => {
			loadData(true);
		});
	};

	/**
	 * 批量删除
	 * @returns 响应内容
	 */
	const handleBatchDelete = async () => {
		await request({
			url: url,
			method: "delete"
		}).then(() => {
			loadData(true);
		});
	};

	/**
	 * 打开新增弹窗
	 */
	const handleOpenAddDialogDrawer = () => {
		drawerFormRef.value.add();
		drawerFormRef.value.title = "新增";
	};

	/**
	 * 打开编辑弹窗
	 * @param record 表单内容
	 * @param title 标题
	 */
	const handleOpenEditDialogDrawer = <T>(record: T, title = "编辑") => {
		drawerFormRef.value.edit(record);
		drawerFormRef.value.title = title;
	};

	const handleSizeChange = (val: number) => {
		pagination.value.pageSize = val;
		loadData();
	};

	const handleCurrentChange = (val: number) => {
		pagination.value.current = val;
		loadData();
	};

	const handleSelectionChange = (val: T[]) => {
		ids.value = unref(val).map((item: any) => item.id);
	};

	onMounted(async () => {
		await loadData(true);
	});

	return {
		loadData,
		handleOpenAddDialog,
		handleOpenEditDialog,
		handleReset,
		handleAdd,
		handleEdit,
		handleDelete,
		handleBatchDelete,
		handleSearch,
		handleOpenAddDialogDrawer,
		handleOpenEditDialogDrawer,
		handleSizeChange,
		handleCurrentChange,
		handleSelectionChange,
		dataSource,
		ids,
		pagination,
		modalFormRef,
		loading
	};
}
