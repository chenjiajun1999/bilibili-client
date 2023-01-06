<script setup lang="ts">
defineProps({
	isFixed: {
		type: Boolean,
		default: false
	}
});
</script>

<template>
	<li class="entry-item">
		<a class="entry-title" href="/">
			<SvgIcon v-if="!isFixed" name="tv" class="entry-svg" />
			<SvgIcon v-else name="logo" class="entry-svg entry-logo" width="140px" height="64px" />
			<span>首页</span>
		</a>
	</li>
	<li class="entry-item">
		<a class="entry-default" href="/anime"><span>番剧</span></a>
	</li>
	<li class="entry-item">
		<a class="entry-default" href="#"><span>直播</span></a>
	</li>
	<li class="entry-item">
		<a class="entry-default" href="#"><span>游戏中心</span></a>
	</li>
	<li class="entry-item">
		<a class="entry-default" href="#"><span>会员购</span></a>
	</li>
	<li class="entry-item">
		<a class="entry-default" href="#"><span>漫画</span></a>
	</li>
	<li class="entry-item">
		<a class="entry-default" href="/admin"><span>管理</span></a>
	</li>
	<li class="entry-item">
		<a class="entry-default" href="#"><span></span></a>
	</li>
	<li class="entry-item">
		<a class="entry-title" href="#">
			<SvgIcon name="download" class="entry-svg" width="16px" height="16px" />
			<span>下载客户端</span>
		</a>
	</li>
</template>

<style lang="scss" scoped></style>
