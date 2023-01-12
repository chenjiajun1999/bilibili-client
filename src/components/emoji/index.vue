<script setup lang="ts">
import useEmoji from "@/hooks/useEmoji";
withDefaults(
	defineProps<{
		onMousedown?: (payload: MouseEvent) => void;
	}>(),
	{
		onMousedown: () => {}
	}
);
defineEmits<{
	(e: "addEmoji", key: string): void;
}>();
const { emojiList } = useEmoji();
const title = ref(emojiList.value[0].name);
onMounted(() => {});
</script>

<template>
	<el-popover
		popper-class="emoji-popover"
		placement="bottom-start"
		trigger="click"
		:width="365"
		:show-arrow="false"
		:show-after="0"
		:hide-after="0"
		:offset="5"
		transition="none"
		:teleported="false"
	>
		<div class="flex flex-col w-full" @mousedown.enter="onMousedown">
			<div class="pt-[13px] pr-[15px] pb-[6px] p-[15px]">{{ title }}</div>
			<el-tabs v-model="title" type="border-card" tabPosition="bottom">
				<el-tab-pane :name="item.name" v-for="(item, index) in emojiList" :key="index">
					<template #label>
						<img class="object-cover" :src="item.data?.values().next().value" />
					</template>
					<div class="h-[196px] px-[11px] overflow-auto">
						<div v-for="(value, key) in item.data" :key="key">
							<div class="inline-block rounded cursor-pointer float-left hover:bg-gray-2" @click="$emit('addEmoji', value[0])">
								<div v-if="item.isLarge" class="w-[56px] h-[56px] m-1">
									<img class="object-cover" :src="value[1]" />
								</div>
								<div v-else class="w-[24px] h-[24px] m-1">
									<img class="object-cover" :src="value[1]" />
								</div>
							</div>
						</div>
					</div>
				</el-tab-pane>
			</el-tabs>
		</div>
		<template #reference>
			<el-button v-if="!$slots.default">表情</el-button>
			<slot v-else></slot>
		</template>
	</el-popover>
</template>
<style lang="scss">
.emoji-popover {
	--el-popover-padding: 0;
	--el-popover-border-radius: 8px;
	--el-popover-border-color: var(--b-c-gray-2);
	--el-popover-title-text-color: var(--b-c-text-secondly);
	--el-popover-font-size: 12px;
	--el-popover-title-font-size: 12px;
	--el-box-shadow-light: 0;
}
</style>
<style lang="scss" scoped>
.el-tabs {
	--el-tabs-header-height: 36px;
	--el-popover-padding-large: 18px 18px;
	--el-color-primary: var(--b-c-text-secondly);
	--el-text-color-secondary: var(--b-c-text-secondly);
	@apply border-0 rounded-b-lg;
	:deep(.el-tabs__content) {
		@apply p-0;
	}
	:deep(.el-tabs__header) {
		@apply mt-0 bg-gray-1 rounded-b-lg;
	}
	:deep(.el-tabs__header.is-bottom) {
		@apply border-0;
	}
	:deep(.el-tabs__item) {
		@apply border-0 h-9 w-[58px] py-[7px] px-[18px];
		&:not(.is-active):hover {
			@apply bg-gray-2;
		}
		&:first-child {
			@apply rounded-bl-lg;
		}
		&:nth-child(2) {
			@apply pl-[18px];
		}
		&:last-child {
			@apply pr-[18px];
		}
	}
	:deep(.el-tabs__item.is-bottom) {
		@apply m-0;
		&:not(.is-active) {
			@apply border-0;
		}
	}
	:deep(.el-tabs__nav) {
		@apply h-[36px];
	}
	:deep(.el-tabs__nav-wrap.is-bottom) {
		@apply mt-0;
	}
}
</style>
