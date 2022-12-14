<!-- 视频 -->
<script setup lang="ts">
import Player from "@/components/player/index.vue";
const videoSrc = ref("https://yleen.cc/files/videos/摇曳露营01.mp4");
const cover = ref("https://yleen.cc/files/images/摇曳露营cover1.jpg"); // 可选，封面图的链接
</script>

<template>
	<Player :src="videoSrc" :cover="cover" width="1080" height="100%"></Player>
</template>

<style lang="scss" scoped></style>
