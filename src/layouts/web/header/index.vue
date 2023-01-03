<script setup lang="ts">
import "./index.scss";
import HeaderLeftEntry from "./module/HeaderLeftEntry.vue";
import HeaderRightEntry from "./module/HeaderRightEntry.vue";
import HeaderSearch from "./module/HeaderSearch.vue";

const isFixed = ref(false);
const unFixedPathMap = new Set(["", "anime"]);
const router = useRouter();
let timer: NodeJS.Timer;
const onScroll = () => {
	clearTimeout(timer);
	timer = setTimeout(() => {
		if (window.scrollY >= 100) {
			isFixed.value = true;
		} else {
			isFixed.value = false;
		}
	}, 100);
};

watch(
	() => router.currentRoute.value.path,
	toPath => {
		const currentPath = toPath.split("/")[1];
		if (unFixedPathMap.has(currentPath)) {
			isFixed.value = false;
			document.addEventListener("scroll", onScroll);
		} else {
			isFixed.value = true;
			document.removeEventListener("scroll", onScroll);
		}
	},
	{ immediate: true, deep: true }
);
</script>

<template>
	<el-header class="layout-header" :class="{ 'layout-header__fixed': isFixed }">
		<ul class="entry-container mr-4">
			<HeaderLeftEntry :isFixed="isFixed" />
		</ul>
		<div class="entry-container flex-auto">
			<HeaderSearch />
		</div>
		<ul class="entry-container ml-4 justify-end">
			<HeaderRightEntry />
		</ul>
	</el-header>
</template>

<style lang="scss">
.layout-header {
	--w-e-text-color: #ffffff;
	@apply absolute flex items-center justify-between z-50 w-full h-16;
	&.layout-header__fixed {
		@keyframes fixed {
			from {
				transform: translateY(-100%);
			}
			to {
				transform: translateY(0);
			}
		}
		@apply fixed bg-white;

		--w-e-text-color: #18191c;

		box-shadow: 0 0 5px 1px #0000001a;
		animation: fixed 0.01s ease;
	}
	.entry-container {
		@apply flex items-center flex-shrink-0 h-full;
	}
}
</style>
