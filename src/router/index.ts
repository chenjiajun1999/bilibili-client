import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
const routes: Array<RouteRecordRaw> = [
	{
		path: "/login",
		name: "login",
		component: () => import("@/views/web/login/index.vue")
	}
];

/**
 * 自动装配子路由
 */
function autoloadModuleRoutes() {
	const modules: Record<
		string,
		{
			[key: string]: any;
		}
	> = import.meta.glob("./module/**/*.ts", { eager: true });

	const routes = [] as RouteRecordRaw[];

	Object.keys(modules).forEach(key => {
		routes.push(modules[key].default);
	});

	return routes;
}

const moduleRoutes = autoloadModuleRoutes();
const router = createRouter({
	history: createWebHistory(),
	routes
});
moduleRoutes.forEach(r => router.addRoute(r));

export default router;
