<!-- 历史菜单 -->
<script setup lang="ts">
import { useTab } from "@/hooks/useTab";
import { TabsPaneContext, TabPanelName } from "element-plus";
const { history, addHistoryTab, removeTab } = useTab();
const route = useRoute();
const router = useRouter();
const activeHistory = ref<string>();
watchEffect(() => {
	activeHistory.value = route.name as string;
});
watch(
	route,
	() => {
		addHistoryTab(route);
	},
	{ immediate: true }
);
const tabClick = (tab: TabsPaneContext) => {
	router.push({ name: tab.props.name as string });
};
const tabClose = (tabName: TabPanelName) => {
	removeTab(tabName as string, route);
};
</script>

<template>
	<div class="tabs">
		<div class="tabs-menu">
			<el-tabs v-model="activeHistory" type="card" @tab-click="tabClick" @tab-remove="tabClose">
				<el-tab-pane
					v-for="tab in history"
					:key="tab.title"
					:label="tab.title"
					:name="tab.route"
					:closable="!(history.length === 1 && route.name === 'dashboard')"
				>
				</el-tab-pane>
			</el-tabs>
		</div>
	</div>
</template>

<style lang="scss" scoped>
@media screen and (max-width: 768px) {
	.tabs {
		display: none;
	}
}
.tabs {
	:deep(.tabs-menu) {
		position: relative;
		width: 100%;
		.el-dropdown {
			position: absolute;
			top: 8px;
			right: 13px;
		}
		.tabs-icon {
			top: 2px;
		}
		.el-tabs__nav-wrap {
			position: absolute;
			width: calc(100% - 110px);
		}
		.el-tabs--card > .el-tabs__header {
			box-sizing: border-box;
			height: 40px;
			padding: 0 10px;
			margin: 0;
		}
		.el-tabs--card > .el-tabs__header .el-tabs__nav {
			border: none;
		}
		.el-tabs--card > .el-tabs__header .el-tabs__item {
			color: #cccccc;
			border: none;
		}
		.el-tabs--card > .el-tabs__header .el-tabs__item.is-active {
			color: black;
			border-bottom: 1px solid black;
		}
		.el-tabs__item .is-icon-close svg {
			margin-top: 0.5px;
		}
	}
}
</style>
