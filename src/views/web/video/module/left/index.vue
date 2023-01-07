<script setup lang="ts">
import VideoPlayer from "./module/VideoPlayer.vue";
import VideoReport from "./module/VideoReport.vue";
import VideoToolBar from "./module/VideoToolbar.vue";
</script>

<template>
	<div class="h-[106px] pt-6 w-full">
		<VideoReport />
	</div>
	<div class="2xl:h-[452px] h-[376px] w-full">
		<VideoPlayer />
	</div>
	<div class="h-[57px] w-full">
		<VideoToolBar />
	</div>
</template>

<style lang="scss" scoped></style>
