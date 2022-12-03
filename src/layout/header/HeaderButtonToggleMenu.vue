<script setup lang="ts">
import { useMenu } from "@/hooks/useMenu";
const { close, toggleState } = useMenu();
</script>

<template>
	<div class="pr-3 cursor-pointer" @click="toggleState">
		<i-mdi-format-indent-decrease :class="{ 'rotate-180': close }" class="duration-300" style="font-size: 1.5em" />
	</div>
</template>
<style lang="scss" scoped></style>
