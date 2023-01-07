<script setup lang="ts">
defineProps({
	name: {
		type: String,
		default: "Vue3 + vite + Ts + pinia + 实战 + 源码 + electron"
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
	<h1 class="text-xl mb-1.5" style="color: var(--w-e-black-1)">{{ name }}</h1>
	<div class="relative flex h-6 text-[13px] leading-[18px] items-center" style="color: var(--w-e-gray-2)">
		<div class="flex items-center">
			<span class="inline-flex flex-shrink-0 mr-3 items-center">
				<SvgIcon class="mr-1" name="view" width="20px" height="20px" />
				{{ viewCount }}
			</span>
			<span class="inline-flex flex-shrink-0 mr-3 items-center">
				<SvgIcon class="mr-1" name="danmaku" width="20px" height="20px" />
				{{ bulletCount }}
			</span>
			<span class="inline-flex flex-shrink-0 mr-3 items-center">
				<SvgIcon class="mr-1" name="clock" width="20px" height="20px" />
				{{ time }}
			</span>
		</div>
	</div>
</template>

<style lang="scss" scoped></style>
