import { Menu, M } from "types/Menu";
import { useStorage } from "@vueuse/core";
import { C } from "@/constants";
import router from "@/router";
import { RouteLocationNormalizedLoaded, RouteRecordNormalized } from "vue-router";

const menus = ref<Menu[]>([]);
const close = useStorage<boolean>(C.MENU_CLOSE_STATE, false);
const getMenuByRoute = () => {
	return router
		.getRoutes()
		.filter(route => route.children.length && route.meta.menu && !(route.meta as M)?.menu?.nested)
		.map(route => {
			const menu: Menu = { ...(route.meta as M)?.menu };
			menu.children = filterNestedMenu(route.children);
			return menu;
		})
		.filter(menu => menu.children?.length) as Menu[];
};
const filterNestedMenu = (children: RouteRecordNormalized["children"]): Menu[] => {
	return children
		.filter(route => route.meta?.menu)
		.map(route => {
			if (route.children) {
				const childRoute = filterNestedMenu(route.children);
				return { ...(route.meta as M)?.menu, route: route.name, children: childRoute };
			}
			return { ...(route.meta as M)?.menu, route: route.name };
		}) as Menu[];
};
// 遍历路由
menus.value = getMenuByRoute();

export const useMenu = () => {
	const getNestedMenuByRoute = (m: Menu, routerMap: Map<string, string>, title = "") => {
		m.children?.forEach(c => {
			title !== "" ? (title = `${title}-${c.title}`) : (title = `${m.title}-${c.title}`);
			routerMap.set(c.route!, title);
			if (c.children) {
				getNestedMenuByRoute(c, routerMap, title);
			} else {
				title = "";
			}
		});
	};

	const getCurrentMenu = (route: RouteLocationNormalizedLoaded) => {
		const routerMap = new Map();
		menus.value.forEach(m => {
			getNestedMenuByRoute(m, routerMap);
		});
		return routerMap.get(route.name);
	};

	const linkPage = (menu: Menu) => {
		isExternalLink(menu) ? window.open(menu.path) : router.push({ name: menu.route });
	};

	const isExternalLink = (menu: Menu) => {
		return !!menu.path;
	};

	const toggleState = () => {
		close.value = !close.value;
	};

	return {
		menus,
		close,
		toggleState,
		getCurrentMenu,
		linkPage
	};
};
