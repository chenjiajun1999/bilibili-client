<script setup lang="ts">
import HeaderAvatar from "./module/HeaderAvatar.vue";
import HeaderUpload from "./module/HeaderUpload.vue";
</script>

<template>
	<li class="entry-item">
		<a class="entry-outside" href="/login">
			<HeaderAvatar />
		</a>
	</li>
	<li class="entry-item">
		<a class="entry-outside" href="#">
			<SvgIcon name="vip" class="entry-icon" :width="20" :height="20" />
			<span>大会员</span>
		</a>
	</li>
	<li class="entry-item">
		<a class="entry-outside" href="#">
			<SvgIcon name="message" class="entry-icon" :width="20" :height="20" />
			<span>消息</span>
		</a>
	</li>
	<li class="entry-item">
		<a class="entry-outside" href="#">
			<SvgIcon name="tide" class="entry-icon" :width="20" :height="21" />
			<span>动态</span>
		</a>
	</li>
	<li class="entry-item">
		<a class="entry-outside" href="#">
			<SvgIcon name="collect" class="entry-icon" :width="20" :height="21" />
			<span>收藏</span>
		</a>
	</li>
	<li class="entry-item">
		<a class="entry-outside" href="#">
			<SvgIcon name="history" class="entry-icon" :width="20" :height="21" />
			<span>历史</span>
		</a>
	</li>
	<li class="entry-item">
		<a class="entry-outside" href="#">
			<SvgIcon name="create" class="entry-icon" :width="20" :height="21" />
			<span>创作中心</span>
		</a>
	</li>
	<li class="entry-item">
		<a class="entry-title" href="#">
			<HeaderUpload />
		</a>
	</li>
</template>

<style lang="scss" scoped></style>
