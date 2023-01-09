<script setup lang="ts">
const tagList = ref(["视频无标签", "视频无标签", "视频无标签", "视频无标签签签签签", "作画", "MAD AMV", "视频无标签"]);
</script>

<template>
	<div class="relative pb-1.5 mx-0 mt-1.5 mb-5 border-solid border-b border-custom-gray-light">
		<FoldTag :tagList="tagList" />
	</div>
</template>

<style lang="scss" scoped></style>
