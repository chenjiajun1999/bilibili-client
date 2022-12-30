<!-- 视频 -->
<script setup lang="ts">
import Player from "@/components/player/index.vue";
const videoSrc = ref("https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8");
</script>

<template>
	<div class="relative w-full">
		<div class="p-[8px] absolute w-3/4">
			<Player :src="videoSrc"></Player>
		</div>
	</div>
</template>

<style lang="scss" scoped></style>
