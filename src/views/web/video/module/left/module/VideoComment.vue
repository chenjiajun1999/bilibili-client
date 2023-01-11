<script setup lang="ts">
defineProps({
	replyCount: {
		type: Number,
		default: 0
	}
});
const isHot = ref(true);
</script>

<template>
	<div class="mb-[22px]">
		<ul class="flex items-center m-0 p-0">
			<li class="flex items-center">
				<span class="text-xl text-primary">评论</span>
				<span class="text-tiny ml-1.5 mr-9 text-thirdly">{{ replyCount }}</span>
			</li>
			<li class="flex items-center text-tiny text-thirdly">
				<div class="cursor-pointer" :class="isHot ? 'sort-active' : 'sort-inactive'" @click="() => (isHot = true)">最热</div>
				<div class="h-[11px] my-0 mx-3 border-r-[1px] border-solid border-gray-5"></div>
				<div class="cursor-pointer" :class="!isHot ? 'sort-active' : 'sort-inactive'" @click="() => (isHot = false)">最新</div>
			</li>
		</ul>
	</div>
	<Comment />
</template>

<style lang="scss" scoped>
.sort-active {
	@apply text-primary;
}
.sort-inactive {
	&:hover {
		@apply text-link;
	}
}
</style>
