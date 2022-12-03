<!-- 用户管理 -->
<script setup lang="ts">
import { User } from "types/User";
import { useDataTable } from "@/hooks/useDataTable";
import { setupUserAttributes } from "./design";

const userUrl = "/user";
const { userColumns } = setupUserAttributes();

const {
	ids,
	loading,
	dataSource,
	pagination,
	// modalFormRef,
	// loadData,
	handleSizeChange,
	handleCurrentChange,
	handleSelectionChange,
	handleOpenAddDialog,
	handleOpenEditDialog,
	handleDelete,
	handleBatchDelete,
	handleSearch
	// handleReset
} = useDataTable<User>(userUrl);

const isEmpty = computed(() => {
	return ids.value.length === 0;
});
</script>

<template>
	<div class="relative w-full">
		<div class="p-[8px] absolute w-full">
			<Table
				v-loading="loading"
				:table-data="dataSource"
				:show-header="true"
				:columns="userColumns"
				header-align="right"
				stripe
				style="width: 100%"
				@selection-change="handleSelectionChange"
			>
				<template #options>
					<el-button icon="refresh" circle @click="handleSearch" />
					<el-button type="primary" icon="plus" circle @click="handleOpenAddDialog" />
					<el-popconfirm title="批量删除" @confirm="handleBatchDelete()">
						<template #reference>
							<el-button :disabled="isEmpty" type="danger" icon="delete" circle />
						</template>
					</el-popconfirm>
				</template>
				<template #actions="{ scope }">
					<el-button size="small" @click="handleOpenEditDialog(scope.row)">编辑</el-button>
					<el-popconfirm title="删除" @confirm="handleDelete(scope.row.id)">
						<template #reference>
							<el-button size="small" type="danger">删除</el-button>
						</template>
					</el-popconfirm>
				</template>
			</Table>
			<div class="float-right mt-2">
				<el-pagination
					v-model:currentPage="pagination.current"
					v-model:page-size="pagination.pageSize"
					small
					:page-sizes="pagination.pageSizeOptions"
					:background="true"
					layout="sizes, prev, pager, next"
					:total="pagination.total"
					@size-change="handleSizeChange"
					@current-change="handleCurrentChange"
				/>
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped></style>
