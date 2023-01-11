<script setup lang="ts">
defineProps({
	avatarUrl: {
		type: String,
		default: "https://s2.loli.net/2023/01/10/GFkXYWf6Csa3c5g.gif"
	}
});
const content = ref("");
const isExpended = ref(false);
const inputRef = ref();

function onFocus() {
	isExpended.value = true;
}
function onBlur() {
	isExpended.value = false;
}

function onMousedown(e: MouseEvent) {
	e.preventDefault();
}

function onEmojiClick() {}
function onCallClick() {
	content.value = content.value.concat("@");
}
function onPostClick() {}
</script>

<template>
	<div class="flex flex-col w-full">
		<div class="flex w-full">
			<div class="flex justify-center items-center w-20 h-[50px]">
				<el-avatar :size="48" :src="avatarUrl">
					<img src="@/assets/imgs/avatar.gif" />
				</el-avatar>
			</div>
			<div class="flex justify-center flex-1" :style="{ height: `${isExpended ? 65 : 50}px` }">
				<el-input
					ref="inputRef"
					v-model="content"
					resize="none"
					type="textarea"
					placeholder="发一条友善的评论"
					@focus="onFocus"
					@blur="onBlur"
				/>
			</div>
			<div class="flex justify-center items-center ml-2.5 w-[70px]" :style="{ height: `${isExpended ? 65 : 50}px` }">
				<el-button @mousedown.enter="onMousedown" @click="onPostClick"> 发布 </el-button>
			</div>
		</div>
		<div class="flex w-full" v-show="isExpended">
			<div class="flex justify-center items-center ml-20 mt-[5px]">
				<div class="expend-btn" @mousedown.enter="onMousedown" @click="onEmojiClick">
					<SvgIcon name="emoji" width="16px" height="16px" />
				</div>
				<div class="expend-btn ml-1.5" @mousedown.enter="onMousedown" @click="onCallClick">
					<SvgIcon name="call" width="16px" height="16px" />
				</div>
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.el-textarea {
	--el-input-bg-color: var(--b-c-gray-1);
	--el-input-border-color: var(--b-c-gray-1);
	--el-input-hover-border-color: var(--b-c-gray-3);
	--el-input-focus-border-color: var(--b-c-gray-3);
	--el-input-clear-border-color: var(--b-c-gray-3);
	--el-input-text-color: var(--b-c-text-primary);
	--el-input-placeholder-color: var(--b-c-text-thirdly);
	:deep(.el-textarea__inner) {
		@apply h-full rounded-md px-[10px] py-[5px] text-xs;

		line-height: v-bind('content?"normal":"38px"');
		&:hover {
			@apply bg-white;
		}
		&:focus {
			@apply bg-white;
		}
	}
}
.el-button {
	@apply h-full w-full rounded text-base text-white bg-blue-0 opacity-50 border-blue-0;
	&:hover {
		@apply opacity-100;
	}
}
.expend-btn {
	@apply flex justify-center items-center w-8 h-[26px] cursor-pointer text-thirdly rounded border-gray-1 border border-solid;
}
</style>
