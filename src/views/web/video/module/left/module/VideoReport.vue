<script setup lang="ts">
defineProps({
	name: {
		type: String,
		default: "视频标题"
	},
	viewCount: {
		type: Number,
		default: 0
	},
	bulletCount: {
		type: Number,
		default: 0
	},
	time: {
		type: String,
		default: "2022-1-7 17:10"
	}
});
</script>

<template>
	<h1 class="text-xl mb-1.5 text-primary">{{ name }}</h1>
	<div class="relative flex h-6 text-tiny leading-[18px] items-center text-thirdly">
		<div class="flex items-center">
			<span class="inline-flex flex-shrink-0 mr-3 items-center">
				<SvgIcon class="mr-1" name="view" :width="20" :height="20" />
				{{ viewCount }}
			</span>
			<span class="inline-flex flex-shrink-0 mr-3 items-center">
				<SvgIcon class="mr-1" name="danmaku" :width="20" :height="20" />
				{{ bulletCount }}
			</span>
			<span class="inline-flex flex-shrink-0 mr-3 items-center">
				<SvgIcon class="mr-1" name="clock" :width="20" :height="20" />
				{{ time }}
			</span>
		</div>
	</div>
</template>

<style lang="scss" scoped></style>
