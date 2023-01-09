<script setup lang="ts">
defineProps({
	intro: {
		type: String,
		default: `视频无简介`
	}
});
</script>

<template>
	<div class="relative my-4 mx-0 text-[15px] leading-6 whitespace-pre-line text-primary">
		<span>{{ intro }}</span>
	</div>
</template>

<style lang="scss" scoped></style>
