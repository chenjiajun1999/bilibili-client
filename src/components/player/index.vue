<script setup lang="ts">
import Danmaku from "@nplayer/danmaku";
import { usePlayer } from "./usePlayer";
import { BulletOption } from "types/bullet";
import "./index.scss";
const props = defineProps({
	src: {
		type: String,
		default: null
	},
	bullets: {
		type: Array<BulletOption>,
		default: [{ time: 1, text: "弹幕～" }]
	}
});
const { mirrorSwitch, quantitySelector, speedSelector, playStatePlugin, danmakuPlugin, volumePlugin, themePlugin } = usePlayer();
</script>

<template>
	<div class="relative w-full h-full">
		<n-player
			crossOrigin="anonymous"
			:options="{
				themeColor: 'rgba(35,173,229, 1)',
				progressBg: 'rgba(35,173,229, 1)',
				volumeProgressBg: 'rgba(35,173,229, 1)',
				posterEnable: false,
				plugins: [
					new Danmaku({ autoInsert: true, items: props.bullets }),
					playStatePlugin,
					danmakuPlugin,
					volumePlugin,
					themePlugin
				],
				controls: [
					[
						'play',
						'time',
						'spacer',
						'airplay',
						new quantitySelector(src),
						speedSelector,
						'volume',
						'settings',
						'web-fullscreen',
						'fullscreen'
					],
					['progress']
				],
				settings: [mirrorSwitch],
				bpControls: {
					650: [['play', 'progress', 'time', 'web-fullscreen', 'fullscreen'], [], []]
				}
			}"
		/>
	</div>
</template>
<style lang="scss" scoped></style>
