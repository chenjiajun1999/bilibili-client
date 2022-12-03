<script setup lang="ts">
import { useTab } from "@/hooks/useTab";
import { M } from "types/Menu";
const {} = useTab();
</script>

<template>
	<el-main>
		<router-view v-slot="{ Component, route }">
			<template v-if="(route.meta as M).menu?.iframe_link">
				<keep-alive>
					<Transition appear name="el-fade-in-linear">
						<EmptyBlock>
							<iframe class="w-full h-full" :src="(route.meta as M).menu?.iframe_link" frameborder="0"></iframe>
						</EmptyBlock>
					</Transition>
				</keep-alive>
			</template>
			<template v-else>
				<Transition appear name="el-fade-in-linear">
					<EmptyBlock>
						<component :is="Component" />
					</EmptyBlock>
				</Transition>
			</template>
		</router-view>
	</el-main>
</template>

<style lang="scss" scoped></style>
