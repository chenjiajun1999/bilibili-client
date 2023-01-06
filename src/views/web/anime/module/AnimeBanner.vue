<script setup lang="ts">
import { Anime } from "types/anime";
const animeList = ref<Array<Anime>>([
	{
		id: "1",
		name: "间谍过家家",
		posterPath: "http://i0.hdslb.com/bfs/bangumi/image/43f9bdc0c86f0d08ee5fb2a880cb582e1541a4c3.png",
		characterPosterPath: "http://i0.hdslb.com/bfs/bangumi/image/0b40992307e7a7df92629083cf0e5b8b2fbf9f25.png"
	},
	{
		id: "2",
		name: "孤独摇滚！",
		posterPath: "http://i0.hdslb.com/bfs/bangumi/image/c66f197dfc889ccf16feca4c9393960041c25978.png",
		characterPosterPath: "http://i0.hdslb.com/bfs/bangumi/image/56012f5e63ded834c7953e3096d592bb788aaaa6.png"
	},
	{
		id: "3",
		name: "驯兽师邂逅最强少女",
		posterPath: "http://i0.hdslb.com/bfs/bangumi/image/b6da7e2a04dc839d7c273b2e885d3477aca5b9e3.png",
		characterPosterPath: "http://i0.hdslb.com/bfs/bangumi/image/dddb6bd8bf0bac18009e82206180ed9be1536dcc.png"
	},
	{
		id: "4",
		name: "路人超人100 III",
		posterPath: "http://i0.hdslb.com/bfs/bangumi/image/c6f77bdabe4b6577390b20db38bee31371dd5b8d.png",
		characterPosterPath: "http://i0.hdslb.com/bfs/bangumi/image/ade7e51aed9a2ba2d596d74aeb4051ca33883c90.png"
	},
	{
		id: "1",
		name: "间谍过家家",
		posterPath: "http://i0.hdslb.com/bfs/bangumi/image/43f9bdc0c86f0d08ee5fb2a880cb582e1541a4c3.png",
		characterPosterPath: "http://i0.hdslb.com/bfs/bangumi/image/0b40992307e7a7df92629083cf0e5b8b2fbf9f25.png"
	},
	{
		id: "2",
		name: "孤独摇滚！",
		posterPath: "http://i0.hdslb.com/bfs/bangumi/image/c66f197dfc889ccf16feca4c9393960041c25978.png",
		characterPosterPath: "http://i0.hdslb.com/bfs/bangumi/image/56012f5e63ded834c7953e3096d592bb788aaaa6.png"
	},
	{
		id: "3",
		name: "驯兽师邂逅最强少女",
		posterPath: "http://i0.hdslb.com/bfs/bangumi/image/b6da7e2a04dc839d7c273b2e885d3477aca5b9e3.png",
		characterPosterPath: "http://i0.hdslb.com/bfs/bangumi/image/dddb6bd8bf0bac18009e82206180ed9be1536dcc.png"
	},
	{
		id: "4",
		name: "路人超人100 III",
		posterPath: "http://i0.hdslb.com/bfs/bangumi/image/c6f77bdabe4b6577390b20db38bee31371dd5b8d.png",
		characterPosterPath: "http://i0.hdslb.com/bfs/bangumi/image/ade7e51aed9a2ba2d596d74aeb4051ca33883c90.png"
	}
]);
</script>

<template>
	<AnimeSwiper :animeList="animeList" />
</template>

<style lang="scss" scoped></style>
