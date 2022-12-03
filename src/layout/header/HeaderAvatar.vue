<!-- 头像 -->
<script setup lang="ts">
function logout() {}
</script>

<template>
	<el-avatar shape="square" :size="40" src="https://s2.loli.net/2022/12/02/aMlCD9gwSkvKT7n.jpg" />
	<el-dropdown>
		<el-icon :size="20" class="ml-1 mt-[1px] hover:rotate-180 duration-500 cursor-pointer"><CaretTop /></el-icon>
		<template #dropdown>
			<el-dropdown-menu>
				<el-dropdown-item>设置</el-dropdown-item>
				<el-dropdown-item @click="logout">退出登录</el-dropdown-item>
			</el-dropdown-menu>
		</template>
	</el-dropdown>
</template>

<style lang="scss" scoped></style>
