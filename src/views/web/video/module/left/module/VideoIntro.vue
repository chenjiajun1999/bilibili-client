<script setup lang="ts">
defineProps({
	intro: {
		type: String,
		default: `视频无简介`
	}
});
</script>

<template>
	<div class="relative my-4 mx-0 text-[15px] leading-6 whitespace-pre-line" style="color: var(--b-c-dark-black)">
		<span>{{ intro }}</span>
	</div>
</template>

<style lang="scss" scoped></style>
