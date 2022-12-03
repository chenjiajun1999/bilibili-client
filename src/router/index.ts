import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
const routes: Array<RouteRecordRaw> = [
	{
		path: "/",
		name: "home",
		meta: { menu: { title: "首页", icon: "Monitor" } },
		redirect: { name: "dashboard" },
		component: () => import("@/layout/index.vue"),
		children: [
			{
				path: "dashboard",
				name: "dashboard",
				meta: { menu: { title: "工作台" } },
				component: () => import("@/views/dashboard/index.vue")
			}
		]
	},
	{
		path: "/system",
		name: "system",
		meta: { menu: { title: "系统管理", icon: "Tools" } },
		component: () => import("@/layout/index.vue"),
		children: [
			{
				path: "user",
				name: "user",
				meta: { menu: { title: "用户管理" } },
				component: () => import("@/views/system/user/index.vue")
			},
			{
				path: "role",
				name: "role",
				meta: { menu: { title: "角色管理" } },
				component: () => import("@/views/system/RolePage.vue")
			},
			{
				path: "auth",
				name: "auth",
				meta: { menu: { title: "权限管理" } },
				component: () => import("@/views/system/AuthPage.vue")
			}
		]
	},
	{
		path: "/design",
		name: "design",
		component: () => import("@/layout/index.vue"),
		meta: { auth: true, menu: { title: "常用组件", icon: "EditPen" } },
		children: [
			{
				name: "other",
				path: "other",
				component: () => import("@/views/design/OtherPage.vue"),
				meta: { menu: { title: "其他" } }
			}
		]
	},
	{
		path: "/login",
		name: "login",
		component: () => import("@/views/auth/LoginPage.vue")
	}
];

const router = createRouter({
	history: createWebHistory(),
	routes
});

export default router;
