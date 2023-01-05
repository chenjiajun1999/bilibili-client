<script setup lang="ts"></script>

<template>
	<div class="home-banner">
		<div class="taper-line"></div>
		<img
			class="absolute top-0 w-full h-full object-cover"
			src="http://i0.hdslb.com/bfs/archive/f97330ca7905307f539b2af1f64fa2a2fdb4eaed.png"
		/>
		<div class="absolute items-end ml-16 mt-16">
			<a href="/" class="w-[180px] min-h-[60px] z-10 inline-block h-1/2 mb-2">
				<img width="162" height="78" src="http://i0.hdslb.com/bfs/archive/a69083305143434cbb6d804699597f2117fe5214.png" />
			</a>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.home-banner {
	@apply min-w-[1000px] min-h-[155px] max-h-[240px] relative overflow-hidden my-0 mx-auto z-0 h-full w-full;
	.taper-line {
		@apply h-[100px] absolute top-0 left-0 z-10 w-full pointer-events-none;

		background: linear-gradient(rgb(0 0 0 / 40%), transparent);
	}
}
</style>
