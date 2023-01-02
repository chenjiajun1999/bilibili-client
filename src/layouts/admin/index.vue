<!-- 管理端布局 -->
<script setup lang="ts">
import Menu from "./menu/index.vue";
import Header from "./header/index.vue";
import Tabs from "./tabs/index.vue";
import Main from "./main/index.vue";
</script>

<template>
	<el-container class="h-screen w-full font-sans">
		<Menu />
		<el-container direction="vertical">
			<Header />
			<Tabs />
			<Main />
		</el-container>
	</el-container>
</template>

<style lang="scss" scoped></style>
