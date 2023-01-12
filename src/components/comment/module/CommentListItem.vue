<script setup lang="ts">
withDefaults(
	defineProps<{
		avatarUrl: string;
		userName: string;
		isVip: boolean;
		level: number;
	}>(),
	{
		avatarUrl: "https://s2.loli.net/2023/01/10/GFkXYWf6Csa3c5g.gif",
		userName: "bili_123456789",
		isVip: false,
		level: 6
	}
);
</script>

<template>
	<div class="relative pt-[22px] pl-20 w-full">
		<div class="flex justify-center absolute left-0 w-20 cursor-pointer">
			<el-avatar :size="40" :src="avatarUrl">
				<img src="@/assets/imgs/avatar.gif" />
			</el-avatar>
		</div>
		<div class="relative flex-1">
			<div class="flex text-tiny mb-1 items-center">
				<div class="cursor-pointer mr-[5px]" :class="isVip ? 'text-pink-0' : ' text-secondly'">{{ userName }}</div>
				<div class="cursor-pointer w-[30px] h-[30px] pt-0.5">
					<SvgIcon :name="`lv${level}`" :width="23" :height="23" />
				</div>
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped></style>
