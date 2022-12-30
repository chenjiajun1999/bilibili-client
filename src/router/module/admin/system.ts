import { RouteRecordRaw } from "vue-router";

export default {
	path: "/system",
	name: "system",
	meta: { menu: { title: "系统数据", icon: "Tools" } },
	component: () => import("@/layouts/admin/index.vue"),
	children: [
		{
			path: "user",
			name: "user",
			meta: { menu: { title: "用户列表" } },
			component: () => import("@/views/admin/system/user/index.vue")
		},
		{
			path: "role",
			name: "role",
			meta: { menu: { title: "角色列表" } },
			component: () => import("@/views/admin/system/role/index.vue")
		},
		{
			path: "auth",
			name: "auth",
			meta: { menu: { title: "权限列表" } },
			component: () => import("@/views/admin/system/auth/index.vue")
		}
	]
} as RouteRecordRaw;
