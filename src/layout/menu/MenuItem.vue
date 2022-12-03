<script setup lang="ts">
import { Menu } from "types/menu";
import { PropType } from "vue";
import { useScreenPixel } from "@/hooks/useScreenPixel";
import { useMenu } from "@/hooks/useMenu";
const props = defineProps({
	subMenu: {
		type: Array as PropType<Menu[]>,
		default: () => []
	},
	activeKey: {
		type: String,
		default: ""
	}
});

const getActiveKey = (menu: Menu, cmenu: Menu) => {
	return props.activeKey === "" ? menu.title + "-" + cmenu.title : props.activeKey + "-" + cmenu.title;
};

const { toggleState, linkPage } = useMenu();

const handleMenuClick = (cmenu: Menu) => {
	const { sm, cmd } = useScreenPixel();
	if (sm.value || cmd.value) {
		toggleState();
	}
	linkPage(cmenu);
};
</script>

<template>
	<el-sub-menu v-for="(menu, index) of props.subMenu" :key="index" :index="menu.title!">
		<template #title>
			<el-icon><component :is="menu.icon" /></el-icon>
			<span>{{ menu.title }}</span>
		</template>
		<template v-for="(cmenu, key) of menu.children">
			<MenuItem
				v-if="cmenu.children"
				:key="'sub_ ' + key"
				:active-key="menu.title + '-' + cmenu.title"
				:sub-menu="menu.children"
			/>
			<el-menu-item v-else :key="key" :index="getActiveKey(menu, cmenu)" @click="handleMenuClick(cmenu)">{{
				cmenu.title
			}}</el-menu-item>
		</template>
	</el-sub-menu>
</template>

<style lang="scss" scoped></style>
