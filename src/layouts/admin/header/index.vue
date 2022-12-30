<script lang="ts" setup>
import HeaderButtonToggleMenu from "./HeaderButtonToggleMenu.vue";
import HeaderButtonToggleScreen from "./HeaderButtonToggleScreen.vue";
import HeaderBreadCrumb from "./HeaderBreadCrumb.vue";
import HeaderAvatar from "./HeaderAvatar.vue";
</script>

<template>
	<el-header class="border-b border-solid flex justify-between text-right text-xs">
		<div class="flex align-center items-center">
			<HeaderButtonToggleMenu />
		</div>
		<div class="flex align-center items-center">
			<HeaderBreadCrumb />
		</div>
		<div class="flex items-center gap-2 justify-end h-full flex-1">
			<HeaderButtonToggleScreen />
			<HeaderAvatar />
		</div>
	</el-header>
</template>

<style lang="scss" scoped></style>
