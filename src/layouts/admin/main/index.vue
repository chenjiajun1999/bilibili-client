<script setup lang="ts">
import { useTab } from "@/hooks/useTab";
import { M } from "types/menu";
const {} = useTab();
</script>

<template>
	<el-main>
		<router-view v-slot="{ Component, route }">
			<template v-if="(route.meta as M).menu?.iframe_link">
				<Transition appear name="el-fade-in-linear">
					<EmptyBlock>
						<iframe class="w-full h-full" :src="(route.meta as M).menu?.iframe_link" frameborder="0"></iframe>
					</EmptyBlock>
				</Transition>
			</template>
			<template v-else>
				<Transition appear name="el-fade-in-linear">
					<EmptyBlock>
						<keep-alive>
							<component :is="Component" />
						</keep-alive>
					</EmptyBlock>
				</Transition>
			</template>
		</router-view>
	</el-main>
</template>

<style lang="scss" scoped></style>
