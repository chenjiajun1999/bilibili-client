<script setup lang="ts">
import { Md5 } from "ts-md5";
const props = defineProps({
	tagList: {
		type: Array<String>,
		default: []
	},
	baseUrl: {
		type: String,
		default: "#"
	}
});

const isExpanded = ref(false);
const ulDom = ref<HTMLUListElement>();
const tagRenderList = ref<Array<String>>([...props.tagList]);
let expandSet = new Set<String>();
let expandKey = Md5.hashStr(Date.now().toString());
let observer: ResizeObserver;
let lineHeight = 40; // 36 向上兼容

async function calculateExpandButtonIndex() {
	let left = 0,
		mid = 0,
		right = props.tagList.length;

	while (left < right) {
		mid = Math.trunc((left + right) / 2);
		let tags = props.tagList.slice(0, mid);
		tags.push(expandKey);
		tagRenderList.value = tags;
		await nextTick();
		console.log(left, mid, right, ulDom.value!.offsetHeight);
		// 溢出
		if (ulDom.value!.offsetHeight > lineHeight) {
			right = mid;
		} else {
			left = mid + 1;
		}
	}
	if (ulDom.value!.offsetHeight > lineHeight) {
		mid = mid - 1;
	}

	let tags = props.tagList.slice(0, mid);
	tags.push(expandKey);
	expandSet.clear();
	for (let i = mid; i < props.tagList.length; i++) {
		let tag = props.tagList[i];
		tags.push(tag);
		expandSet.add(getTagKey(tag.toString(), i + 1));
	}
	tagRenderList.value = tags;
}

function getTagKey(tag: string, index: number) {
	return Md5.hashStr("TAG_" + index + "_" + tag);
}

function onClick() {
	isExpanded.value = !isExpanded.value;
}

onMounted(() => {
	observer = new ResizeObserver(async () => {
		let flag = isExpanded.value;
		isExpanded.value = true;
		tagRenderList.value = [...props.tagList];
		await nextTick();
		// 溢出
		if (ulDom.value!.offsetHeight > lineHeight) {
			calculateExpandButtonIndex();
		}
		isExpanded.value = flag;
	});
	observer.observe(document.body, { box: "border-box" });
});
</script>

<template>
	<ul ref="ulDom">
		<div v-for="(tag, index) in tagRenderList" :key="index">
			<li v-if="tag == expandKey" class="tag">
				<div class="tag-expand" @click="onClick" :class="{ 'tag-expand__round': isExpanded }">
					<SvgIcon name="arrow" width="10px" height="6px" />
				</div>
			</li>
			<li v-else-if="expandSet.has(getTagKey(tag.toString(), index))" class="tag" v-show="isExpanded">
				<a href="#" class="tag-item"> {{ tag }} </a>
			</li>
			<li v-else class="tag">
				<a href="#" class="tag-item"> {{ tag }} </a>
			</li>
		</div>
	</ul>
</template>

<style lang="scss" scoped>
// 防止 <ul> 高度为 0，单行高度为 36
ul::after {
	display: block;
	clear: both;
	content: "";
}
.tag-expand__round {
	transform: rotate(180deg);
}
.tag {
	@apply max-w-[300px] relative h-7 mt-0 mr-3 mb-2 ml-0 float-left rounded-full bg-gray-1;
	.tag-item {
		@apply text-[13px] leading-7 px-3 py-0 text-secondly;
	}
	.tag-expand {
		@apply cursor-pointer h-full w-full pt-3 px-[9px] text-regular;
		&:hover {
			@apply text-active;
		}
	}
}
</style>
