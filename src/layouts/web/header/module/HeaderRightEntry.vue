<script setup lang="ts">
import HeaderRightEntryAvatar from "./HeaderRightEntryAvatar.vue";
import HeaderRightEntryUpload from "./HeaderRightEntryUpload.vue";
</script>

<template>
	<li class="entry-item">
		<a class="entry-outside" href="/login">
			<HeaderRightEntryAvatar />
		</a>
	</li>
	<li class="entry-item">
		<a class="entry-outside" href="#">
			<SvgIcon name="vip" class="entry-icon" width="20px" height="20px" />
			<span>大会员</span>
		</a>
	</li>
	<li class="entry-item">
		<a class="entry-outside" href="#">
			<SvgIcon name="message" class="entry-icon" width="20px" height="20px" />
			<span>消息</span>
		</a>
	</li>
	<li class="entry-item">
		<a class="entry-outside" href="#">
			<SvgIcon name="tide" class="entry-icon" width="20px" height="21px" />
			<span>动态</span>
		</a>
	</li>
	<li class="entry-item">
		<a class="entry-outside" href="#">
			<SvgIcon name="collect" class="entry-icon" width="20px" height="21px" />
			<span>收藏</span>
		</a>
	</li>
	<li class="entry-item">
		<a class="entry-outside" href="#">
			<SvgIcon name="history" class="entry-icon" width="20px" height="21px" />
			<span>历史</span>
		</a>
	</li>
	<li class="entry-item">
		<a class="entry-outside" href="#">
			<SvgIcon name="create" class="entry-icon" width="20px" height="21px" />
			<span>创作中心</span>
		</a>
	</li>
	<li class="entry-item">
		<a class="entry-title" href="#">
			<HeaderRightEntryUpload />
		</a>
	</li>
</template>

<style lang="scss" scoped></style>
