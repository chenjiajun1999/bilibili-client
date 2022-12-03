import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import IconsResolver from "unplugin-icons/resolver";
import Icons from "unplugin-icons/vite";
import { viteMockServe } from "vite-plugin-mock";

import path from "path";
const srcPath = path.resolve(__dirname, "src");

// https://vitejs.dev/config/
export default ({ mode }) => {
	return defineConfig({
		// 别名配置
		resolve: {
			alias: [{ find: "@", replacement: srcPath }]
		},
		// 反向代理
		server: {
			proxy: {
				[loadEnv(mode, process.cwd()).VITE_APP_BASE_API]: {
					target: "http://localhost:6000/",
					changeOrigin: true,
					//rewrite: path => path.replace(/^\/api/, '')
					rewrite: path => path.replace(new RegExp("^" + loadEnv(mode, process.cwd()).VITE_APP_BASE_API), "/bilibli-server")
				}
			}
		},
		plugins: [
			vue(),
			viteMockServe({
				supportTs: true,
				logger: false,
				mockPath: "./mock/"
			}),
			AutoImport({
				// targets to transform
				include: [/\.[tj]sx?$/, /\.vue$/, /\.vue\?vue/, /\.md$/],
				// global imports to register
				imports: ["vue", "vue-router", "pinia"],
				// Generate corresponding .eslintrc-auto-import.json file.
				// eslint globals Docs - https://eslint.org/docs/user-guide/configuring/language-options#specifying-globals
				eslintrc: {
					enabled: false, // Default `false`
					filepath: "./.eslintrc-auto-import.json", // Default `./.eslintrc-auto-import.json`
					globalsPropValue: true // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
				},
				dts: "auto-imports.d.ts",
				resolvers: [ElementPlusResolver()]
			}),
			Components({
				dts: "components.d.ts",
				resolvers: [ElementPlusResolver(), IconsResolver()]
			}),
			Icons({ autoInstall: true })
		]
	});
};
