<script setup lang="ts">
import { Anime } from "types/anime";
import { Md5 } from "ts-md5";
import useImageMainColor from "@/hooks/useImageMainColor";
const props = defineProps({
	animeList: {
		type: Array<Anime>,
		default: []
	},
	animeTime: {
		type: Number,
		default: 250
	},
	intervalTime: {
		type: Number,
		default: 3000
	}
});
const nowIndex = ref(0);
const swiperDom = ref<HTMLDivElement>();
const mainDom = ref<HTMLDivElement>();
const spotDom = ref<HTMLUListElement>();
const btnDom = ref<HTMLButtonElement>();
const iconDom = ref<HTMLDivElement>();
const moveWidth = ref(0);
const oldMoveWidth = ref<number>();
const spotShowNum = ref(7);
const animeRenderList = ref<Array<Anime>>([props.animeList[props.animeList.length - 1], ...props.animeList, props.animeList[0]]);
const btnColor = ref<string>();
let totalTime = props.animeTime + props.intervalTime;
let timer: NodeJS.Timer;
let observer: ResizeObserver;
let colorMap = new Map<String, String>();

function isSpotItemShow(index: number) {
	if (props.animeList.length <= spotShowNum.value) {
		return true;
	}
	let left = Math.max(nowIndex.value - spotShowNum.value + 1, 0);
	return index >= left && index < left + spotShowNum.value;
}

function onPlayButtonMoveover() {
	iconDom.value!.style.transform = "scale(1.2, 1.2)";
	clearInterval(timer);
}
function onPlayButtonMoveout() {
	iconDom.value!.style.transform = "scale(1, 1)";
	timer = setInterval(nextSlider, totalTime);
}

function getButtonKey(id: number) {
	return Md5.hashStr("BUTTON_ACTIVATE_" + id.toString());
}

function setActiveSpot() {
	for (let i = 0; i < props.animeList.length; i++) {
		const itemDom = document.getElementsByClassName("spot-item")[i] as HTMLLIElement;
		if (i === Math.abs(nowIndex.value)) {
			// 激活
			itemDom.style.transform = "scale(1.2, 1.2)";
			itemDom.style.borderWidth = "4.5px";
			const key = getButtonKey(i);
			if (!colorMap.has(key)) {
				const imgDom = itemDom.childNodes[0].childNodes[0] as HTMLImageElement;
				useImageMainColor(imgDom, 0.8).then(res => {
					colorMap.set(key, res);
					btnColor.value = colorMap.get(key) as string;
				});
			}
			btnColor.value = (colorMap.has(key) ? colorMap.get(key) : null) as string;
		} else {
			// 未激活
			itemDom.style.transform = "scale(1, 1)";
			itemDom.style.borderWidth = "4px";
		}
	}
}
function nextSlider() {
	if (props.animeList.length === 1) return;
	nowIndex.value++;
	mainDom.value!.style.transition = `left ${props.animeTime / 1000}s`;
	mainDom.value!.style.left = `${parseInt(mainDom.value!.style.left) - moveWidth.value}px`;
	if (nowIndex.value === props.animeList.length) {
		nowIndex.value = 0;
		setActiveSpot();
		setTimeout(function () {
			mainDom.value!.style.transitionProperty = "none";
			mainDom.value!.style.left = `${-moveWidth.value}px`;
		}, props.animeTime);
	} else {
		setActiveSpot();
	}
}

function eventBind() {
	// 监听 swiperDom 的宽度并初始化 moveWidth
	observer = new ResizeObserver(() => {
		moveWidth.value = swiperDom.value!.offsetWidth;
		spotShowNum.value = moveWidth.value >= 1366 ? 7 : 6;
		if (typeof oldMoveWidth.value === "undefined") {
			mainDom.value!.style.left = `${-moveWidth.value}px`;
			oldMoveWidth.value = moveWidth.value;
			return;
		}
		clearInterval(timer);
		mainDom.value!.style.transition = "";
		mainDom.value!.style.left = `${(parseInt(mainDom.value!.style.left) / oldMoveWidth.value) * moveWidth.value}px`;
		oldMoveWidth.value = moveWidth.value;
		timer = setInterval(nextSlider, totalTime);
	});
	observer.observe(swiperDom.value as HTMLDivElement, { box: "border-box" });
	// 启动定时器轮播图片
	timer = setInterval(nextSlider, totalTime);
	// 绑定 spot 监听器
	spotDom.value!.addEventListener("mouseover", (e: MouseEvent) => {
		// 兼容 IE8 及以下版本
		e = e || window.event;
		let target = (e.target || e.srcElement) as HTMLElement;
		if (target.tagName.toLowerCase() === "img") {
			clearInterval(timer);
			// 根据 <img/> 找父节点 <li/>
			target = target.parentNode!.parentNode as HTMLElement;
			let ret = spotDom.value!.querySelectorAll("li");
			let index = Array.prototype.indexOf.call(ret, target);
			nowIndex.value = index;
			setActiveSpot();
			mainDom.value!.style.transition = `left .8s`;
			mainDom.value!.style.left = `${-(nowIndex.value + 1) * moveWidth.value}px`;
		}
	});
	spotDom.value!.addEventListener("mouseout", (e: MouseEvent) => {
		// 兼容 IE8 及以下版本
		e = e || window.event;
		let target = (e.target || e.srcElement) as HTMLElement;
		if (target.tagName.toLowerCase() === "img") {
			timer = setInterval(nextSlider, totalTime);
		}
	});
}

onMounted(() => {
	if (props.animeList.length === 0) {
		throw new Error("anime swiper component: array of input image is null");
	}
	eventBind();
	setActiveSpot();
});
onBeforeUnmount(() => {
	observer.disconnect();
});
</script>

<template>
	<div class="anime-swiper" ref="swiperDom" :style="{ height: `${moveWidth / 3}px` }">
		<ul class="swiper-main" ref="mainDom" :style="{ width: `${moveWidth * (props.animeList.length + 2)}px` }">
			<li
				v-for="(anime, index) in animeRenderList"
				:key="index"
				class="swiper-item"
				:style="{ width: `${moveWidth}px`, left: `${index * moveWidth}px` }"
			>
				<a :href="`/video/${anime.id}`">
					<img :src="`${anime.posterPath}`" />
				</a>
			</li>
		</ul>
		<div class="swiper-inner-group">
			<div class="swiper-button">
				<el-button round ref="btnDom" @mouseover.enter="onPlayButtonMoveover" @mouseout.enter="onPlayButtonMoveout">
					<div ref="iconDom" class="play-icon">
						<SvgIcon name="play" class="mt-3.5 ml-3" width="18px" height="18px" />
					</div>
					{{ animeList[nowIndex].name }}
				</el-button>
			</div>
			<ul class="swiper-spot" ref="spotDom">
				<li v-for="(anime, index) in animeList" :key="index" :index="index" v-show="isSpotItemShow(index)" class="spot-item">
					<a :href="`/video/${anime.id}`">
						<img crossOrigin="anonymous" class="rounded" :src="`${anime.characterPosterPath}`" />
					</a>
				</li>
			</ul>
		</div>
	</div>
</template>

<style lang="scss" scoped>
img {
	@apply w-full h-full object-cover;
}
.el-button {
	@apply h-12 rounded-3xl text-lg text-white leading-6 border-0 p-0 pr-5;

	background-color: v-bind('btnColor ? btnColor:"rgb(139 126 102 /80%)"');
	&:hover {
		@apply text-sky-400;
	}
}
.anime-swiper {
	@apply min-h-[440px] relative my-0 mx-auto z-0 overflow-hidden;
	.swiper-main {
		@apply absolute h-full overflow-hidden;
		.swiper-item {
			@apply absolute inline h-full;
		}
	}
	.swiper-inner-group {
		@apply absolute flex flex-col left-0 right-0 bottom-0 items-center justify-center;

		background: linear-gradient(transparent, white);
		.swiper-spot {
			@apply flex items-center justify-center pb-5;
			.spot-item {
				@apply relative w-[14%] min-w-[155px] mx-[7px] rounded-lg border-4 border-opacity-[0.5];

				border-color: var(--b-c-light-gray);
				transition: transform v-bind('animeTime / 1000+"s"');
			}
			@media screen and (min-width: 1366px) {
				.spot-item {
					@apply w-[11%];
				}
			}
		}
		.swiper-button {
			@apply flex w-full bottom-0 items-center mb-[26px];

			margin-left: v-bind('moveWidth / 9+"px"');
			.play-icon {
				@apply w-11 h-11 ml-0.5 text-center tracking-normal rounded-full cursor-pointer text-white mr-3;

				background-color: v-bind('btnColor ? btnColor.replace(new RegExp(/(100|([1-9]?\d?))%/g),"100%"):"rgb(159 146 122)"');
				filter: brightness(140%);
				opacity: 1;
				transition: transform v-bind('animeTime / 500+"s"');
			}
		}
		@media screen and (min-width: 1366px) {
			.swiper-button {
				margin-left: v-bind('moveWidth / 5.5+"px"');
			}
		}
	}
}
</style>
