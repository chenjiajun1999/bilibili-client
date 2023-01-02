<script setup lang="ts"></script>

<template>
	<div class="home-banner">
		<div class="taper-line"></div>
		<img src="https://i0.hdslb.com/bfs/archive/839190887e48acd3960a850723f0e82e877946f0.png" />
	</div>
</template>

<style lang="scss" scoped>
.home-banner {
	@apply relative overflow-hidden my-0 mx-auto z-0;

	min-width: 1000px;
	min-height: 155px;
	max-height: 240px;
	img {
		@apply absolute top-0 left-1/2 -translate-x-1/2 h-full object-cover;
	}
	.taper-line {
		@apply absolute top-0 left-0 z-10 w-full pointer-events-none;

		height: 100px;
		background: linear-gradient(rgb(0 0 0 / 40%), transparent);
	}
}
</style>
