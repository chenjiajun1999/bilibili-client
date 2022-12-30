import Player, { Popover, Tooltip } from "nplayer";
import Hls from "hls.js";
export function usePlayer() {
	function createIcon(html: string, noCls?: boolean) {
		const div = document.createElement("div");
		div.innerHTML = html;
		if (!noCls) div.classList.add("nplayer_icon");
		return (cls?: string) => {
			if (cls) {
				div.classList.add(cls);
			}
			return div;
		};
	}

	// 镜像开关
	const mirrorSwitch = {
		type: "switch",
		html: "镜像画面",
		checked: false,
		init(player: Player) {
			// 默认不是镜像
			player.video.classList.remove("nplayer_video-mirroring");
		},
		change(value: boolean, player: Player) {
			// 通过添加移除 class 来让视频是否是镜像
			player.video.classList.toggle("nplayer_video-mirroring", value);
		}
	};

	// 倍速选择器
	const speedSelector = {
		el: document.createElement("div"),
		btn: null as unknown as HTMLElement,
		popover: null as unknown as Popover,
		itemElements: null as unknown as HTMLDivElement[],
		value: null as unknown as number,
		tip: "倍速设置",
		tooltip: null as unknown as Tooltip,
		player: null as unknown as Player,
		options: [
			{ value: 2, html: "2x" },
			{ value: 1.5, html: "1.5x" },
			{ value: 1.25, html: "1.25x" },
			{ value: 1, html: "1x" },
			{ value: 0.75, html: "0.75x" },
			{ value: 0.5, html: "0.5x" }
		],
		init(player: Player, _: any, tooltip: Tooltip) {
			this.player = player;
			this.tooltip = tooltip;
			this.btn = document.createElement("div");
			this.btn.textContent = "倍速";
			this.el.appendChild(this.btn);
			this.popover = new Popover(this.el, () => this.tooltip.show());
			this.btn.addEventListener("click", () => {
				this.tooltip.hide();
				this.popover.show();
			});
			// 点击按钮的时候展示 popover
			this.el.style.display = "none";
			// 默认隐藏
			this.el.classList.add("nplayer_selector");
		},
		work() {
			const frag = document.createDocumentFragment();
			const listener = (i: number) => (init: any) => {
				const last = speedSelector.itemElements[speedSelector.itemElements.length - 1];
				const prev = speedSelector.itemElements[speedSelector.value] || last;
				const el = speedSelector.itemElements[i] || last;
				prev.classList.remove("nplayer_selector_item-active");
				el.classList.add("nplayer_selector_item-active");
				speedSelector.btn.textContent = el.textContent;
				if (el.textContent === "1x") speedSelector.btn.textContent = "倍速";
				if (init !== true && !speedSelector.player.paused) setTimeout(() => speedSelector.player.play());
				speedSelector.value = i;
				speedSelector.player.playbackRate = speedSelector.options[i].value;
				speedSelector.popover.hide();
			};
			speedSelector.itemElements = speedSelector.options.map((l, i) => {
				const el = document.createElement("div");
				el.textContent = l.html;
				el.classList.add("nplayer_selector_item");
				el.classList.add("text-center");
				el.addEventListener("click", listener(i));
				frag.appendChild(el);
				return el;
			});
			speedSelector.popover.panelEl.appendChild(frag);
			speedSelector.el.style.display = "block";
			// 初始化为 1 倍速
			listener(3)(true);
		}
	};

	// 清晰度选择器
	// 1. 首先创建一个控制条项
	// 2. 我们把它放到 spacer 后面
	const quantitySelector = {
		el: document.createElement("div"),
		btn: null as unknown as HTMLElement,
		popover: null as unknown as Popover,
		itemElements: null as unknown as HTMLDivElement[],
		value: null as unknown as number,
		tip: "画质设置",
		tooltip: null as unknown as Tooltip,
		player: null as unknown as Player,
		init(player: Player, _: any, tooltip: Tooltip) {
			this.player = player;
			this.tooltip = tooltip;
			this.btn = document.createElement("div");
			this.btn.textContent = "画质";
			this.el.appendChild(this.btn);
			this.popover = new Popover(this.el, () => this.tooltip.show());
			this.btn.addEventListener("click", () => {
				this.tooltip.hide();
				this.popover.show();
			});
			// 点击按钮的时候展示 popover
			this.el.style.display = "none";
			// 默认隐藏
			this.el.classList.add("nplayer_selector");
		},

		work(src: string) {
			// 3. 创建 HLS 实例
			const hls = new Hls();
			hls.on(Hls.Events.MEDIA_ATTACHED, function () {
				hls.on(Hls.Events.MANIFEST_PARSED, function () {
					// 4. 给清晰度排序，清晰度越高的排在最前面
					hls.levels.sort((a, b) => b.height - a.height);
					const frag = document.createDocumentFragment();
					// 5. 给与清晰度对应的元素添加，点击切换清晰度功能
					const listener = (i: number) => (init: any) => {
						const last = quantitySelector.itemElements[quantitySelector.itemElements.length - 1];
						const prev = quantitySelector.itemElements[quantitySelector.value] || last;
						const el = quantitySelector.itemElements[i] || last;
						prev.classList.remove("nplayer_selector_item-active");
						el.classList.add("nplayer_selector_item-active");
						quantitySelector.btn.textContent = el.textContent;
						if (init !== true && !quantitySelector.player.paused) setTimeout(() => quantitySelector.player.play());
						// 因为 HLS 切换清晰度会使正在播放的视频暂停，我们这里让它再自动恢复播放
						quantitySelector.value = hls.currentLevel = hls.loadLevel = i;
						quantitySelector.popover.hide();
					};
					// 6. 添加清晰度对应元素
					quantitySelector.itemElements = hls.levels.map((l, i) => {
						const el = document.createElement("div");
						el.textContent = l.name + "P";
						if (l.height === 1080) el.textContent += " 超清";
						if (l.height === 720) el.textContent += " 高清";
						if (l.height === 480) el.textContent += " 清晰";
						if (l.height === 360) el.textContent += " 流畅";
						el.classList.add("nplayer_selector_item");
						el.addEventListener("click", listener(i));
						frag.appendChild(el);
						return el;
					});

					const el = document.createElement("div");
					el.textContent = "自动";
					el.addEventListener("click", listener(-1));
					el.classList.add("nplayer_selector_item");
					frag.appendChild(el);
					quantitySelector.itemElements.push(el);
					// 这里再添加一个 `自动` 选项，HLS 默认是根据网速自动切换清晰度
					quantitySelector.popover.panelEl.appendChild(frag);
					quantitySelector.el.style.display = "block";
					listener(hls.currentLevel)(true);
					// 初始化当前清晰度
				});

				// 绑定 video 元素成功的时候，去加载视频
				hls.loadSource(src);
			});
			hls.attachMedia(this.player.video);
		}
	};

	return { mirrorSwitch, quantitySelector, speedSelector, createIcon };
}
