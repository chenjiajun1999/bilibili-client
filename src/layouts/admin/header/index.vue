<script lang="ts" setup>
import HeaderButtonToggleMenu from "./module/HeaderButtonToggleMenu.vue";
import HeaderButtonToggleScreen from "./module/HeaderButtonToggleScreen.vue";
import HeaderBreadCrumb from "./module/HeaderBreadCrumb.vue";
import HeaderAvatar from "./module/HeaderAvatar.vue";
</script>

<template>
	<el-header class="border-b border-solid flex justify-between text-right text-xs">
		<div class="flex items-center">
			<HeaderButtonToggleMenu />
		</div>
		<div class="flex items-center">
			<HeaderBreadCrumb />
		</div>
		<div class="flex items-center gap-2 justify-end h-full flex-1">
			<HeaderButtonToggleScreen />
			<HeaderAvatar />
		</div>
	</el-header>
</template>

<style lang="scss" scoped></style>
