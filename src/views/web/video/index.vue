<!-- 视频播放 -->
<script setup lang="ts">
import VideoLeftContainer from "./module/left/index.vue";
import VideoRightContainer from "./module/right/index.vue";
</script>

<template>
	<div class="relative flex w-full h-full pt-16 justify-center">
		<div class="flex flex-col items-start flex-shrink-0 2xl:w-[803px] w-[668px]">
			<VideoLeftContainer />
		</div>
		<div class="flex flex-col items-start flex-shrink-0 w-[350px] ml-[30px]">
			<VideoRightContainer />
		</div>
	</div>
</template>

<style lang="scss" scoped></style>
