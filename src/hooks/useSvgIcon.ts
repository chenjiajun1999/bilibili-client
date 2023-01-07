import SvgIcon from "@/components/svgIcon/index.vue";

export default function useSvgIcon(name: string, width: number, height: number, classNames?: string[]) {
	const app = createApp(SvgIcon, { name: name, width: width + "px", height: height + "px" });
	const div = document.createElement("div");
	app.mount(div);
	if (classNames) {
		classNames.forEach(c => div.classList.add(c));
	}
	return div;
}
