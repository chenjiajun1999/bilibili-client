import { RouteRecordRaw } from "vue-router";

export default {
	path: "/",
	name: "web",
	component: () => import("@/layouts/web/index.vue"),
	children: [
		{
			path: "",
			name: "home",
			component: () => import("@/views/web/home/index.vue")
		},
		{
			path: "video",
			name: "video",
			component: () => import("@/views/web/video/index.vue")
		},
		{
			path: "anime",
			name: "anime",
			component: () => import("@/views/web/anime/index.vue")
		}
	]
} as RouteRecordRaw;
