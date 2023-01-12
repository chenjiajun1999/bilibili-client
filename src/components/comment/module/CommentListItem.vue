<script setup lang="ts">
import useEmoji from "@/hooks/useEmoji";
const props = withDefaults(
	defineProps<{
		avatarUrl: string;
		userName: string;
		isVip: boolean;
		level: number;
		content: string;
		time: string;
		agreeCount: number;
	}>(),
	{
		avatarUrl: "https://s2.loli.net/2023/01/10/GFkXYWf6Csa3c5g.gif",
		userName: "bili_123456789",
		isVip: false,
		level: 0,
		content: `阿里！？纳西！？纳西！？阿里！？崔铁路崔铁奶啊咧斗气斗气创死创死创，阿里！？纳西！？纳西！？阿里！？几噶几噶后开[吃瓜]`,
		time: "2023-01-13 0:16",
		agreeCount: 0
	}
);
const { emojiMap, largeEmojiSet } = useEmoji();
function parseStr(value: string) {
	const reg = /\[.+?\]/g;
	const smallClass = "w-[20px] h-[20px]";
	const largeClass = "w-[50px] h-[50px]";
	value = value.replace(reg, (str: any) => {
		const emojiPath = emojiMap.value.get(str);
		//表情库不存在的就默认返回原字符串
		if (!emojiPath) {
			return str;
		}
		return `<img src="${emojiPath}" class="${
			largeEmojiSet.value.has(str) ? largeClass : smallClass
		} align-text-bottom inline-block"/>`;
	});
	return `<span class="relative w-full text-primary overflow-hidden whitespace-pre-wrap align-baseline overflow-wrap break-word float-left">${value}</span>`;
}
const content = computed(() => parseStr(props.content));
function agree() {}
function disagree() {}
function reply() {}
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
			<div class="relative inline-block w-full py-0.5 text-[15px] leading-6">
				<span class="relative inline-block text-primary w-full py-0.5 text-[15px] leading-6" v-dompurify-html="content" />
				<div class="flex items-center relative mt-0.5 text-tiny text-thirdly">
					<span class="mr-5">{{ time }}</span>
					<span class="flex items-center cursor-pointer mr-[19px]" @click="agree">
						<SvgIcon class="mr-[5px] hover:text-blue-0" name="agreeSmall" :width="16" :height="16" />
						{{ agreeCount == 0 ? "" : agreeCount }}
					</span>
					<span class="flex items-center cursor-pointer mr-[19px]" @click="disagree">
						<SvgIcon class="mr-[5px] hover:text-blue-0" name="disagreeSmall" :width="16" :height="16" />
					</span>
					<span class="cursor-pointer hover:text-blue-0" @click="reply">回复</span>
				</div>
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped></style>
