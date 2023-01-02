<!-- 导航栏 -->
<script setup lang="ts">
import { useMenu } from "@/hooks/useMenu";
import MenuItem from "./module/MenuItem.vue";
import MenuBanner from "./module/MenuBanner.vue";
const acticeIndex = ref<string>();
const route = useRoute();
const { menus, close, getCurrentMenu, toggleState } = useMenu();
watchEffect(() => {
	acticeIndex.value = getCurrentMenu(route);
});
const isCollapse = computed(() => {
	return close.value;
});
</script>

<template>
	<el-aside class="admin-menu bg-white" :class="{ close: close }">
		<div class="flex justify-center">
			<MenuBanner />
		</div>
		<el-menu :default-active="acticeIndex" :collapse="isCollapse">
			<MenuItem :sub-menu="menus" />
		</el-menu>
	</el-aside>
	<teleport to="body">
		<div v-show="!close" class="bg block md:hidden" @click="toggleState"></div>
	</teleport>
</template>

<style lang="scss" scoped>
.el-aside {
	color: var(--el-text-color-primary);
}
.el-menu {
	border-right: none;
}
.admin-menu {
	@apply w-[250px] duration-500 dark:bg-black min-h-screen h-full border-r border-solid z-50;
	&.close {
		@apply w-[70px] duration-500;
	}
}
@media screen and (max-width: 766px) {
	.admin-menu {
		@apply w-[250px] duration-500 absolute top-0 left-0 min-h-screen h-full border-r border-solid;
		&.close {
			@apply left-[-250px] duration-500;
		}
	}
	.bg {
		@apply bg-gray-600 w-screen h-screen z-20 opacity-75  absolute left-0 top-0;
	}
}
</style>
