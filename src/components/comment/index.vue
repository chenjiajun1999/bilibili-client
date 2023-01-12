<script setup lang="ts">
import CommentPost from "./module/CommentPost.vue";
import CommentList from "./module/CommentList.vue";
</script>

<template>
	<div class="flex flex-col w-full">
		<CommentPost />
		<CommentList />
		<div class="mt-5 text-sm text-thirdly text-center">没有更多评论</div>
	</div>
</template>

<style lang="scss" scoped></style>
