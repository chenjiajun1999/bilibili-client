<script setup lang="ts">
import { secondTimeFormat } from "@/utils/timeFormat";
import { PlayerEvent } from "types/event";

const props = defineProps({
	width: {
		type: String,
		default: "100%"
	},
	height: {
		type: String,
		default: "3px"
	},
	// 当前播放进度
	currentTime: {
		type: Number,
		default: 0,
		required: true
	},
	// 视频全长，例如videoDom.duration
	duration: {
		type: Number,
		default: 0,
		require: true
	},
	// 视频缓冲，参考videoDom.buffered
	buffered: {
		type: TimeRanges,
		default: null
	},
	// 主题色
	primaryColor: {
		type: String,
		default: "cornflowerblue"
	}
});

const rootBarDom = ref(); // 进度条根元素dom
const fullBarDom = ref(); // 完整进度条的dom，即进度条背景
const previewDom = ref(); // 预览框的dom
const isDragging = ref(false); // 是否处于拖动进度条过程中（未松开）
const isPreviewCenter = ref(true); // 游标的时间预览是否处于进度条中间的正常的不用处理的位置
const previewTimeLabel = ref("00:00"); // 游标的时间预览文字
const cursorPercent = ref(0); // 鼠标悬浮时的游标所处的百分比位置
const listeners = ref<Array<PlayerEvent>>([]); // 事件监听列表，列表项格式：{eventName: String, element: ELement, method: Function}

// 预览框的一半大小
const halfOfPreview = computed(() => {
	return Math.floor(previewDom.value!.clientWidth / 2);
});
// 当前播放进度与总时长的占比
const currentTimeRatio = computed(() => {
	return props.currentTime / props.duration;
});
// 预览时间的百分比位置
const previewPostionLeft = computed(() => {
	if (isPreviewCenter.value) {
		return `${cursorPercent.value}%`;
	} else {
		return cursorPercent.value > 50 ? `calc(100% - ${halfOfPreview.value}px)` : `${halfOfPreview.value}px`;
	}
});
// 缓冲进度条百分比位置
const bufferedBarPercent = computed(() => {
	// 遍历每一段缓存
	for (let i = 0; i < props.buffered?.length; i++) {
		// 该缓存段开始时间比当前时间还大，那么后面都不可能是了，跳出循环
		if (props.buffered.start(i) > props.currentTime) {
			break;
		}
		// 在该缓存段之内
		if (props.currentTime < props.buffered.end(i)) {
			return (props.buffered.end(i) / props.duration) * 100;
		}
	}
	return currentTimeRatio.value * 100;
});
const emits = defineEmits(["dragging", "released"]);

function down(e: MouseEvent) {
	isDragging.value = true;
	// 获取完整进度条的clientX（dom左上角）
	const fullBarClientX = fullBarDom.value!.getBoundingClientRect().left;
	// 预播放进度传给dragging事件
	emits("dragging", ((e.clientX - fullBarClientX) / fullBarDom.value!.clientWidth) * props.duration);
}

function move(e: MouseEvent) {
	if (isDragging.value) {
		const fullBarClientX = fullBarDom.value!.getBoundingClientRect().left;
		const currentBarWidth = e.clientX - fullBarClientX;
		// 预播放进度占比
		const preCurrentTimeRatio = currentBarWidth / fullBarDom.value!.clientWidth;
		emits("dragging", preCurrentTimeRatio * props.duration);
	}
}

function up(e: MouseEvent) {
	if (isDragging.value) {
		isDragging.value = false;
		const fullBarClientX = fullBarDom.value!.getBoundingClientRect().left;
		emits("released", ((e.clientX - fullBarClientX) / fullBarDom.value!.clientWidth) * props.duration);
	}
}
// 仅在Rootbar内移动才触发
function onlyInRootBarDomMove(e: MouseEvent) {
	const fullBarClientX = fullBarDom.value!.getBoundingClientRect().left;
	const currentBarWidth = e.clientX - fullBarClientX;
	// 预播放进度占比
	const preCurrentTimeRatio = currentBarWidth / fullBarDom.value!.clientWidth;
	cursorPercent.value = preCurrentTimeRatio * 100;
	previewTimeLabel.value = secondTimeFormat(preCurrentTimeRatio * props.duration);
	let cursorOffset = e.clientX - fullBarClientX - halfOfPreview.value;
	/* 游标的时间预览处于正常位置不会触碰边缘的时候为True（即处于中间段）
	 * 图示（进度条）：|_|____中间段____|_|
	 */
	isPreviewCenter.value = cursorOffset > 0 && cursorOffset < fullBarDom.value!.clientWidth - previewDom.value!.clientWidth;
}

onMounted(() => {
	//绑定监听器
	let inWindowMove: PlayerEvent = {
		eventName: "mousemove",
		element: window,
		method: function (e: MouseEvent) {
			move(e);
		}.bind(this)
	};
	let inRootbarMove: PlayerEvent = {
		eventName: "mousemove",
		element: rootBarDom.value!,
		method: function (e: MouseEvent) {
			onlyInRootBarDomMove(e);
		}.bind(this)
	};
	let inWindowUp: PlayerEvent = {
		eventName: "mouseup",
		element: window,
		method: function (e: MouseEvent) {
			up(e);
		}.bind(this)
	};
	listeners.value.push(inWindowMove);
	listeners.value.push(inRootbarMove);
	listeners.value.push(inWindowUp);
	window.addEventListener("mousemove", inWindowMove.method, false);
	rootBarDom.value!.addEventListener("mousemove", inRootbarMove.method, false);
	window.addEventListener("mouseup", inWindowUp.method, false);
});
onBeforeUnmount(() => {
	for (const index in listeners.value) {
		const item = listeners.value[index];
		item.element.removeEventListener(item.eventName, item.method);
	}
});
</script>

<template>
	<div ref="rootBarDom" class="progress-bar" :style="{ width: width }" @mousedown.left="down" @mousemove="move" @mouseup="up">
		<div ref="fullBarDom" class="progress-full" :style="{ height: height }">
			<!-- 缓冲段 -->
			<div class="progress-buffered" :style="{ width: bufferedBarPercent + '%' }"></div>
			<!-- 当前播放时间段 -->
			<div class="progress-current" :style="{ width: currentTimeRatio * 100 + '%' }"></div>
			<!-- 游标 -->
			<span class="progress-cursor" :style="{ left: cursorPercent + '%' }"></span>
			<!-- 预览框 -->
			<span ref="previewDom" class="progress-preview" :style="{ left: previewPostionLeft }">
				<span class="preview-time">{{ previewTimeLabel }}</span>
			</span>
		</div>
	</div>
</template>

<style scoped>
.progress-bar {
	position: relative;
	padding: 2px 0;
	cursor: pointer;
	transition: height 0.2s;

	/* overflow: hidden; */
}
.progress-bar:hover .progress-full {
	height: 6px !important;
}
.progress-full {
	position: relative;
	display: inline-block;
	width: 100%;
	background: rgb(255 255 255 / 33%);
	transition: height 0.3s;
}
.progress-current {
	position: absolute;
	top: 0;
	left: 0;
	display: inline-block;
	width: 50%;
	height: inherit;
	background-color: v-bind("props.primaryColor");
}
.progress-current::after {
	position: absolute;
	top: 50%;
	right: 0;
	bottom: 50%;
	z-index: 1002;
	box-sizing: border-box;
	display: inline-block;
	width: 14px;
	height: 14px;
	content: "";
	background: v-bind("props.primaryColor");
	border: 2px solid #ffffff;
	border-radius: 100%;
	opacity: 0;
	transition: opacity 0.3s;
	transform: translate(50%, -50%);
}
.progress-bar:hover .progress-current::after {
	opacity: 1;
}
.progress-buffered {
	position: absolute;
	top: 0;
	left: 0;
	display: inline-block;
	width: 50%;
	height: inherit;
	background-color: rgb(255 255 255 / 50%);
}
.progress-cursor {
	position: absolute;
	bottom: 50%;
	left: 0%;
	z-index: 1001;
	width: 2px;
	height: 10px;
	pointer-events: none;
	background: #ffffff;
	border-radius: 2px;
	opacity: 0;
	transition: opacity.2s;
	transform: translate(-50%, 50%);
}
.progress-bar:hover .progress-cursor,
.progress-bar:hover .progress-preview {
	opacity: 1;
}
.progress-preview {
	position: absolute;
	bottom: 50%;
	left: 25px;
	width: auto;
	height: auto;
	padding: 0 4px;
	color: #ffffff;
	pointer-events: none;
	opacity: 0;
	transition: opacity.2s;
	transform: translate(-50%, -10px);
}
.progress-preview .preview-time {
	display: inline-block;
	padding: 5px;
	background: rgb(34 34 34 / 60%);
	border-radius: 2px;
}
</style>
