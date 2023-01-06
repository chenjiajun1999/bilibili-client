<!-- 视频 -->
<script setup lang="ts">
const videoSrc = ref("https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8");
</script>

<template>
	<Player :src="videoSrc"></Player>
</template>

<style lang="scss" scoped></style>
