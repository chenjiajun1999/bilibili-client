<script setup lang="ts">
import { PlayerEvent } from "types/event";
const props = defineProps({
	width: {
		type: String,
		default: "100%"
	},
	height: {
		type: String,
		default: "100%"
	},
	//当前音量（0-1）
	currentVolume: {
		type: Number,
		default: 1
	},
	// 主题色
	primaryColor: {
		type: String,
		default: "cornflowerblue"
	}
});
const fullBarDom = ref(); // 总音量条的dom
const isClickBar = ref(false); // 是否点击了音量条
const fullBarHeight = ref(0); // 音量条的总高度（像素）
const fullBarClientTop = ref(0); // 满载的音量条相对于视口的高度
const listeners = ref<Array<PlayerEvent>>([]); // 事件监听列表，列表项格式：{eventName: String, element: ELement, method: Function}
const emits = defineEmits(["update-volume"]);

function down(e: MouseEvent) {
	isClickBar.value = true;
	//赋值高度备用
	fullBarHeight.value = fullBarDom.value!.clientHeight;
	emits("update-volume", 1 - e.offsetY / fullBarHeight.value);
}

function move(e: MouseEvent) {
	//满载的音量条相对于视口的高度
	fullBarClientTop.value = fullBarDom.value!.getBoundingClientRect().top;
	//偏移量
	const offsetY = e.clientY - fullBarClientTop.value;
	//当鼠标按下的时候才进行更新数据
	if (isClickBar) {
		const newVolume = 1 - offsetY / fullBarHeight.value;
		if (newVolume > 1) {
			emits("update-volume", 1);
		} else if (newVolume < 0) {
			emits("update-volume", 0);
		} else {
			emits("update-volume", newVolume);
		}
	}
}
function up() {
	isClickBar.value = false;
}

onMounted(() => {
	// 绑定全局监听器
	let inWindowMove: PlayerEvent = {
		eventName: "mousemove",
		element: window,
		method: function (e: MouseEvent) {
			if (isClickBar) {
				move(e);
			}
		}.bind(this)
	};
	let inWindowUp: PlayerEvent = {
		eventName: "mouseup",
		element: window,
		method: function () {
			up();
		}.bind(this)
	};
	listeners.value.push(inWindowMove);
	listeners.value.push(inWindowUp);
	window.addEventListener("mousemove", inWindowMove.method, false);
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
	<div
		class="volume-bar"
		:style="{ width: '100%', height: height }"
		@mousedown.left.stop="down"
		@mousemove.stop="move"
		@mouseup.stop="up"
	>
		<div ref="fullBarDom" class="volume-full" :style="{ width: width, height: height }">
			<div class="volume-current volume-ball" :style="{ width: '100%', height: currentVolume * 100 + '%' }"></div>
		</div>
	</div>
</template>

<style scoped>
.volume-bar {
	display: inline-block;
	text-align: center;
	cursor: pointer;
	user-select: none;
}
.volume-full {
	position: relative;
	display: inline-block;
	background: rgb(180 180 180);
	border-radius: 10px;
}
.volume-current {
	position: absolute;
	bottom: 0;
	pointer-events: none;
	background-color: v-bind("props.primaryColor");
	border-radius: 10px;
}
.volume-current::after {
	position: absolute;
	display: inline-block;

	/* top: 0; */
	width: 12px;
	height: 12px;
	content: "";
	background: #ffffff;
	border-radius: 100%;
	transform: translate(-50%, -50%);
}
</style>
