<script setup lang="ts">
import request from "@/utils/request";
import { Barrage } from "types/barrage";
const props = defineProps({
	// 是否开启弹幕
	enable: {
		type: Boolean,
		default: true
	},
	// 是否正在播放
	isPlaying: {
		type: Boolean,
		default: false
	},
	// 当前播放进度
	currentTime: {
		type: Number,
		default: 0
	},
	videoDom: null,
	// 弹幕时间轴的初始时间（手动干预进度条会触发更新）
	barrageTimelineStart: {
		type: Number,
		default: 0
	},
	// 弹幕的链接地址（XML文件格式，B站风格）
	biBarrageXml: {
		type: String,
		default: null
	}
});

const wrapDom = ref();
const channelsDom = ref();
const barragedTag = ref(0); // 标记下一条等待显示的弹幕的索引
const barrageList = ref<Array<Barrage>>([]); // 弹幕列表
const channelAmount = ref(10); // 弹幕通道数量
const animationPlayState = ref("uset");
const scrollOccupy = ref<Array<number>>([]); // 滚动弹幕的占用情况，0为空闲，>0的数为剩余的时间（毫秒），该时间经过后通道变为空闲（0）
const topOccupy = ref([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]); // 顶部占用，暂时10行（下标从最顶部部开始，0表示空闲，1表示占用）
const bottomOccupy = ref([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]); // 底部占用（下标从最底部开始）
const intervals = ref<Array<number>>([]); // 定时器列表
watch(
	() => props.isPlaying,
	() => {
		animationPlayState.value = props.isPlaying ? "unset" : "paused";
	}
);
/*
 * 更新弹幕
 */
watch(
	() => props.biBarrageXml,
	() => {
		requestBarrageList();
	}
);
/*
 * 弹幕时间轴的初始时间。
 * 在手动改变进度条的时候触发，遍历弹幕列表获取下一条弹幕的索引
 */
watch(
	() => props.barrageTimelineStart,
	() => {
		const list = barrageList.value;
		const barrageStart = props.barrageTimelineStart;
		for (let n = 0; n < list.length; n++) {
			if (list[n].startTime >= barrageStart) {
				barragedTag.value = n;
				break;
			}
		}
	}
);
/*
 * 获取并处理排序弹幕列表
 */
function requestBarrageList() {
	// 获取弹幕列表
	request({
		method: "get",
		url: props.biBarrageXml
	}).then(res => {
		const xmlDoc = new DOMParser().parseFromString(res.data, "text/xml");
		const elements = xmlDoc.getElementsByTagName("d");
		let array: Array<Barrage> = [];
		for (let n = 0, len = elements.length; n < len; n++) {
			const pAttributeList = elements[n].getAttribute("p")!.split(",");
			// 弹幕的信息
			const color = Number(pAttributeList[3]).toString(16);
			const info: Barrage = {
				content: elements[n].innerHTML,
				startTime: Number(pAttributeList[0]),
				mode: Number(pAttributeList[1]),
				fontSize: pAttributeList[2],
				fontColor: color,
				timestamp: pAttributeList[4],
				barragePool: pAttributeList[5],
				userHash: pAttributeList[6],
				rowId: pAttributeList[7]
			};
			array.push(info);
		}
		// 写个冒泡过渡一下。。
		for (let i = 0, len = array.length; i < len; i++) {
			for (let j = 0, lenCache = len - i - 1; j < lenCache; j++) {
				if (array[j].startTime > array[j + 1].startTime) {
					const arrayCache = array[j];
					array[j] = array[j + 1];
					array[j + 1] = arrayCache;
				}
			}
		}
		barrageList.value = array;
	});
}
/*
 * 新建一个滚动弹幕
 */
function createBarrage(info: Barrage) {
	// 先寻找空闲的通道
	let index = 0;
	for (let i = 0; i < scrollOccupy.value.length; i++) {
		if (scrollOccupy.value[i] == 0) {
			index = i;
			break;
		}
		if (i == scrollOccupy.value.length - 1) return; // 没有空闲的位置则不显示该弹幕
	}
	scrollOccupy.value[index] = 500 + Number(info.content.length) * 50;
	let dom = document.createElement("span");
	dom.innerText = info.content;
	dom.setAttribute("class", "barrage barrage-scroll");
	dom.style.fontSize = `${Number(info.fontSize) * 0.8}px`;
	dom.style.color = `#${info.fontColor}`;

	// 动画过渡完之后清除掉弹幕dom
	function handleAnimationEnd() {
		dom.removeEventListener("animationend", handleAnimationEnd, false);
		dom.innerHTML = "";
		dom.parentNode!.removeChild(dom);
		dom.remove();
		dom = null as unknown as HTMLSpanElement;
	}
	dom.addEventListener("animationend", handleAnimationEnd);
	channelsDom.value[index].append(dom);
}

/*
 * 新建一个底部固定弹幕
 */
function createBottomFixedBarrage(info: Barrage) {
	// 先寻找空闲的通道（底部倒数）
	let index = 0;
	for (let i = 0; i < bottomOccupy.value.length; i++) {
		if (bottomOccupy.value[i] == 0) {
			index = i;
			break;
		}
	}
	bottomOccupy.value[index] = 1; // 占用该通道
	let dom = document.createElement("span");
	dom.innerText = info.content;
	dom.setAttribute("class", "barrage barrage-center barrage-bottom");
	dom.style.fontSize = `${Number(info.fontSize) * 0.8}px`;
	dom.style.bottom = `${(Number(info.fontSize) * 0.8 + 4) * index}px`;
	dom.style.color = `#${info.fontColor}`;
	// 之后清除掉弹幕dom
	setTimeout(() => {
		dom.style.opacity = String(0);
		bottomOccupy.value[index] = 0; // 释放该通道
		dom.parentNode!.removeChild(dom);
		dom.remove();
		dom = null as unknown as HTMLSpanElement;
	}, 5000);
	wrapDom.value.append(dom);
}
/*
 * 新建一个顶部固定弹幕
 */
function createTopFixedBarrage(info: Barrage) {
	// 先寻找空闲的通道
	let index = 0;
	for (let i = 0; i < topOccupy.value.length; i++) {
		if (topOccupy.value[i] == 0) {
			index = i;
			break;
		}
	}
	topOccupy.value[index] = 1; // 占用该通道
	let dom = document.createElement("span");
	dom.innerText = info.content;
	dom.setAttribute("class", "barrage barrage-center barrage-top");
	dom.style.fontSize = `${info.fontSize}px`;
	dom.style.top = `${(Number(info.fontSize) * 0.8 + 4) * index}px`;
	dom.style.color = `#${info.fontColor}`;
	// 之后清除掉弹幕dom
	setTimeout(() => {
		dom.style.opacity = String(0);
		topOccupy.value[index] = 0; // 释放该通道
		dom.parentNode!.removeChild(dom);
		dom.remove();
		dom = null as unknown as HTMLSpanElement;
	}, 5000);
	wrapDom.value.append(dom);
}
onBeforeMount(() => {
	// 初始化通道占用情况
	for (let i = 0; i < channelAmount.value; i++) {
		scrollOccupy.value.push(0);
	}
});
onMounted(() => {
	requestBarrageList();
	// 测试弹幕
	let intervalID = setInterval(() => {
		if (props.isPlaying) {
			const info = barrageList.value[barragedTag.value];
			if (info && info.startTime < props.videoDom.currentTime) {
				// 标记下一条弹幕的索引
				barragedTag.value++;
				if (!props.enable) return;
				switch (info.mode) {
					case 0:
					case 1:
					case 2:
					case 3:
						createBarrage(info);
						break;
					case 4: // 底部弹幕
						createBottomFixedBarrage(info);
						break;
					case 5: // 顶部弹幕
						createTopFixedBarrage(info);
						break;
				}
			}
		}
	}, 1);
	intervals.value.push(Number(intervalID));
	// 滚动弹幕的计时器
	intervalID = setInterval(() => {
		if (props.isPlaying) {
			for (let i = 0; i < scrollOccupy.value.length; i++) {
				if (scrollOccupy.value[i] > 100) scrollOccupy.value[i] -= 100;
				else scrollOccupy.value[i] = 0;
			}
		}
	}, 100);
	intervals.value.push(Number(intervalID));
});

onBeforeUnmount(() => {
	// 销毁定时器
	for (const index in intervals.value) {
		clearInterval(intervals.value[index]);
	}
});
</script>
<template>
	<div ref="wrapDom" class="player-barrage-wrap" v-if="enable">
		<div v-for="n in channelAmount" ref="channelsDom" class="player-barrage-layer" :key="`channel-${n - 1}`"></div>
	</div>
</template>
<style scoped>
.player-barrage-wrap {
	position: absolute;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	overflow: hidden;
	pointer-events: none;
	cursor: pointer;
}
.player-barrage-layer {
	position: relative;
	z-index: 1;
	display: block;
	height: 2rem;
	line-height: 2rem;
}
.player-barrage-wrap :deep(.barrage) {
	position: absolute;
	text-shadow: #000000 1px 0 1px, #000000 0 1px 1px, #000000 0 -1px 1px, #000000 -1px 0 1px;
	white-space: pre;
}
.player-barrage-wrap :deep(.barrage-center) {
	left: 50%;
	z-index: 1;
	transform: translateX(-50%);
}
.player-barrage-wrap :deep(.barrage-bottom) {
	bottom: 0;
}
.player-barrage-wrap :deep(.barrage-scroll) {
	left: 100%;
	animation: horizontal-scroll 7s linear 0s;
	animation-play-state: v-bind("animationPlayState") !important;
}
</style>
<style>
@keyframes horizontal-scroll {
	from {
		left: 100%;
		transform: translate3d(0, 0, 0);
	}
	to {
		left: 0;
		transform: translate3d(-100%, 0, 0);
	}
}
</style>
