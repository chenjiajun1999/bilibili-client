import { RouteRecordRaw } from "vue-router";

export default {
	path: "/design",
	name: "design",
	component: () => import("@/layouts/admin/index.vue"),
	meta: { auth: true, menu: { title: "常用组件", icon: "EditPen", priority: 1 } },
	children: [
		{
			name: "player",
			path: "player",
			component: () => import("@/views/admin/design/player/index.vue"),
			meta: { menu: { title: "视频播放" } }
		},
		{
			name: "upload",
			path: "upload",
			component: () => import("@/views/admin/design/upload/index.vue"),
			meta: { menu: { title: "视频上传" } }
		}
	]
} as RouteRecordRaw;
