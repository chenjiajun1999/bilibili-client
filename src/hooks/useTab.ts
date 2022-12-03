import { Menu, M } from "types/Menu";
import router from "@/router";
import { RouteLocationNormalized, RouteRecordRaw } from "vue-router";
import { useStorage } from "@vueuse/core";
import { C } from "@/constants";

const history = useStorage<Menu[]>(C.HISTORY_MENU, []);
const getHistoryTab = () => {
	const routes = [] as RouteRecordRaw[];
	router.getRoutes().map(r => routes.push(...r.children));

	return history.value.filter(m => {
		return routes.some(r => r.name == m.route);
	});
};

history.value = getHistoryTab();

export const useTab = () => {
	const addHistoryTab = (route: RouteLocationNormalized) => {
		if (!route.meta?.menu) return;

		const menu: Menu = { ...(route.meta as M)?.menu, route: route.name as string };
		const isHas = history.value.some(menu => menu.route == route.name);
		if (!isHas) history.value.push(menu);
		if (history.value.length > 10) {
			history.value.pop();
		}
	};

	/**
	 * 关闭当前页面
	 */
	const removeTab = (name: string, route: RouteLocationNormalized) => {
		const menu = history.value.find(m => m.route == name);
		const length = history.value.length;
		if (!menu) return;
		removeHistoryTab(menu);
		if (length > 1) {
			const prevRouter: Menu = history.value[length - 2];
			router.push({ name: prevRouter.route });
		} else {
			// "/" -> "/" 跳转路由回监听不到
			if (route.name == "dashboard") addHistoryTab(route);
			router.push("/");
		}
	};

	const removeHistoryTab = (menu: Menu) => {
		const index = history.value.indexOf(menu);
		history.value.splice(index, 1);
	};

	return {
		history,
		addHistoryTab,
		removeTab,
		removeHistoryTab
	};
};
