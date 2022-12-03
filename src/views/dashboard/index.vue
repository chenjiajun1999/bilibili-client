<!--  -->
<script setup lang="ts">
import { getRSAPublicKey } from "@/api/user";
const rsaPks = ref<String>("");
getRSAPublicKey().then(res => {
	rsaPks.value = res.data;
});
</script>

<template>
	<div>首页</div>
	<div>rsa-pks: {{ rsaPks }}</div>
</template>

<style lang="scss" scoped></style>
