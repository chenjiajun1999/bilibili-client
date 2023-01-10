<script setup lang="ts">
defineProps({
	agreeCount: {
		type: Number,
		default: 0
	},
	coinCount: {
		type: Number,
		default: 0
	},
	collectCount: {
		type: Number,
		default: 0
	},
	shareCount: {
		type: Number,
		default: 0
	}
});
function onClick() {}
</script>

<template>
	<div class="toolbar-container">
		<div class="toolbar-side w-[60%]">
			<span title="点赞" class="toolbar-item w-[92px] mr-2" @click="onClick()">
				<SvgIcon class="mr-2" name="agree" width="28px" height="28px" />
				{{ agreeCount }}
			</span>
			<span title="投币" class="toolbar-item w-[92px] mr-2" @click="onClick()">
				<SvgIcon class="mr-2" name="coin" width="28px" height="28px" />
				{{ coinCount }}
			</span>
			<span title="收藏" class="toolbar-item w-[92px] mr-2" @click="onClick()">
				<SvgIcon class="mr-2" name="star" width="28px" height="28px" />
				{{ collectCount }}
			</span>
			<span title="分享" class="toolbar-item w-[92px] mr-2" @click="onClick()">
				<SvgIcon class="mr-2" name="share" width="28px" height="28px" />
				{{ shareCount }}
			</span>
		</div>
		<div class="toolbar-side w-[40%] justify-end">
			<span class="toolbar-item mr-4">
				<SvgIcon class="mr-1.5" name="warn" width="20px" height="20px" />
				稿件投诉
			</span>
			<span class="toolbar-item">
				<SvgIcon name="more" width="24px" height="24px" />
			</span>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.toolbar-container {
	@apply relative flex items-center pt-4 pb-3 text-[13px] leading-7 border-b border-solid border-line-regular;
	.toolbar-side {
		@apply relative flex items-center flex-shrink-0;
		.toolbar-item {
			@apply inline-flex items-center cursor-pointer text-regular;
			&:hover {
				@apply text-active;
			}
		}
	}
}
</style>
