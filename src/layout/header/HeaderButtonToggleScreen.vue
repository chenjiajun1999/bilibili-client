<script setup lang="ts">
import { useFullscreen } from "@vueuse/core";
const { toggle, isFullscreen } = useFullscreen();
</script>

<template>
	<i-mdi-fullscreen v-show="!isFullscreen" class="fullscreen" style="font-size: 1.6em" @click="() => toggle()" />
	<i-mdi-fullscreen-exit v-show="isFullscreen" class="fullscreen" style="font-size: 1.6em" @click="() => toggle()" />
</template>

<style lang="scss" scoped>
.fullscreen {
	@apply cursor-pointer text-gray-500 mx-1 hover:text-gray-800 duration-500;
}

@media screen and (max-width: 768px) {
	.fullscreen {
		display: none;
	}
}
</style>
