<script setup lang="ts">
import { useMenu } from "@/hooks/useMenu";
const router = useRouter();
const { close } = useMenu();
</script>

<template>
	<div class="flex align-center items-center py-2 w-[220px] cursor-pointer" @click="router.push('/')">
		<div class="w-10 ml-4">
			<img src="/favicon.ico" alt="logo" />
		</div>
		<div v-show="!close" class="flex-1 duration-500 ml-2 mr-1 w-[160px]">
			<span class="text-base font-bold">哔哩哔哩 (゜-゜)つロ 干杯~-bilibili</span>
		</div>
	</div>
</template>

<style lang="scss" scoped></style>
