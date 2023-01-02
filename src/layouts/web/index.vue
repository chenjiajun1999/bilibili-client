<!-- 网页端布局 -->
<script lang="ts" setup>
import Header from "./header/index.vue";
import Main from "./main/index.vue";
</script>

<template>
	<el-container class="w-full font-sans" direction="vertical">
		<Header />
		<Main />
	</el-container>
</template>

<style lang="scss" scoped></style>
