import { createApp, Component } from "vue";
import App from "@/App.vue";
import router from "@/router";
import { createPinia } from "pinia";
import "tailwindcss/tailwind.css";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";

const app = createApp(App);
const store = createPinia();
app.use(router);
app.use(store);
// 注册图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
	app.component(key, component as unknown as Component);
}

app.mount("#app");
