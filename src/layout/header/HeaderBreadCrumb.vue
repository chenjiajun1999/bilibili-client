<script setup lang="ts">
import { ArrowRight } from "@element-plus/icons-vue";
import { useMenu } from "@/hooks/useMenu";
const route = useRoute();
const currentBread = ref<string>("");
const breadArr = ref<string[]>([]);
const { getCurrentMenu } = useMenu();
watchEffect(() => {
	currentBread.value = getCurrentMenu(route) as unknown as string;
	breadArr.value = currentBread.value?.split("-");
});
</script>

<template>
	<div class="breadcrumb">
		<el-breadcrumb :separator-icon="ArrowRight">
			<el-breadcrumb-item v-for="(bread, index) in breadArr" :key="index">{{ bread }}</el-breadcrumb-item>
		</el-breadcrumb>
	</div>
</template>

<style lang="scss" scoped>
@media screen and (max-width: 768px) {
	.breadcrumb {
		display: none;
	}
}
</style>
