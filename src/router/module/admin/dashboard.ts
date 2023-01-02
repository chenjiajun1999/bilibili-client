import { RouteRecordRaw } from "vue-router";

export default {
	path: "/admin",
	name: "admin",
	meta: { menu: { title: "首页", icon: "Monitor" } },
	redirect: { name: "dashboard" },
	component: () => import("@/layouts/admin/index.vue"),
	children: [
		{
			path: "dashboard",
			name: "dashboard",
			meta: { menu: { title: "工作台" } },
			component: () => import("@/views/admin/dashboard/index.vue")
		}
	]
} as RouteRecordRaw;
