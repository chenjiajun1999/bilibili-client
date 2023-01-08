import Player, { Popover, Tooltip } from "nplayer";
import Hls from "hls.js";
import useSvgIcon from "@/hooks/useSvgIcon";
export function usePlayer() {
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
		value: 1,
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

			player.on("AfterInit", () => {
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
			});
		},
		work() {}
	};

	// 清晰度选择器
	// 1. 首先创建一个控制条项
	// 2. 我们把它放到 spacer 后面
	class quantitySelector {
		el = document.createElement("div");
		btn = null as unknown as HTMLElement;
		popover = null as unknown as Popover;
		itemElements = null as unknown as HTMLDivElement[];
		value = null as unknown as number;
		tip = "画质设置";
		tooltip = null as unknown as Tooltip;
		player = null as unknown as Player;
		src: string;

		constructor(src: string) {
			this.src = src;
		}

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

			player.on("AfterInit", () => {
				// 3. 创建 HLS 实例
				const hls = new Hls();
				const _this = this;
				hls.on(Hls.Events.MEDIA_ATTACHED, function () {
					hls.on(Hls.Events.MANIFEST_PARSED, function () {
						// 4. 给清晰度排序，清晰度越高的排在最前面
						hls.levels.sort((a, b) => b.height - a.height);
						const frag = document.createDocumentFragment();
						// 5. 给与清晰度对应的元素添加，点击切换清晰度功能
						const listener = (i: number) => (init: any) => {
							const last = _this.itemElements[_this.itemElements.length - 1];
							const prev = _this.itemElements[_this.value] || last;
							const el = _this.itemElements[i] || last;
							prev.classList.remove("nplayer_selector_item-active");
							el.classList.add("nplayer_selector_item-active");
							_this.btn.textContent = el.textContent;
							if (init !== true && !_this.player.paused) setTimeout(() => _this.player.play());
							// 因为 HLS 切换清晰度会使正在播放的视频暂停，我们这里让它再自动恢复播放
							_this.value = hls.currentLevel = hls.loadLevel = i;
							_this.popover.hide();
						};
						// 6. 添加清晰度对应元素
						_this.itemElements = hls.levels.map((l, i) => {
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
						_this.itemElements.push(el);
						// 这里再添加一个 `自动` 选项，HLS 默认是根据网速自动切换清晰度
						_this.popover.panelEl.appendChild(frag);
						_this.el.style.display = "block";
						listener(hls.currentLevel)(true);
						// 初始化当前清晰度
					});

					// 绑定 video 元素成功的时候，去加载视频
					hls.loadSource(_this.src);
				});
				hls.attachMedia(this.player.video);
			});
		}
	}

	const playStatePlugin = {
		el: null as unknown as HTMLDivElement,

		apply(player: Player) {
			const { $ } = player.Player.__utils;
			this.el = player.el.appendChild($(`.state_icon`));
			this.el.appendChild(useSvgIcon("playState", 64, 64));
			player.on("Play", () => (this.el.style.display = "none"));
			player.on("Pause", () => (this.el.style.display = "inline"));
			this.el.addEventListener("click", () => {
				player.play();
			});
		}
	};

	const danmakuPlugin = {
		apply(player: Player) {
			player.on("AfterInit", () => {
				const namespace = "http://www.w3.org/2000/svg";
				const paths = player.el.getElementsByTagNameNS(namespace, "path");
				const target =
					"M9 21v2H7v-2h2m4 0v2h-2v-2h2m4 0v2h-2v-2h2M2 19V3h20v16m-11-7H9v2h2v-2m8 0h-6v2h6v-2M7 8H5v2h2V8m12 0H9v2h10V8z";
				for (let i = 0; i < paths.length; i++) {
					const path = paths[i];
					if (path.getAttribute("d") === target) {
						const svgDom = path.parentNode as SVGElement;
						const dom = svgDom.parentNode as HTMLDivElement;
						dom.removeChild(svgDom);
						dom.appendChild(useSvgIcon("danmakuSetting", 22, 22, ["nplayer-icon"]));
						return;
					}
				}
			});
		}
	};

	const volumePlugin = {
		apply(player: Player) {
			player.opts.volumeVertical = true;
			player.opts.volumeBarLength = "60px";
			player.on("AfterInit", () => {
				const volumeDom = player.el.getElementsByClassName("nplayer_control_volume_bars")[0];
				const outlineDom = document.createElement("div");
				volumeDom.appendChild(outlineDom);
				outlineDom.classList.add("nplayer_control_volume_outline");

				const numDom = document.createElement("div");
				numDom.textContent = "0";
				volumeDom.appendChild(numDom);
				numDom.classList.add("nplayer_control_volume_number");

				const dotDom = document.createElement("div");
				outlineDom.appendChild(dotDom);
				dotDom.classList.add("nplayer_control_volume_dot");

				const sideDom = document.createElement("div");
				outlineDom.appendChild(sideDom);
				sideDom.classList.add("nplayer_control_volume_side");

				const onVolumeChange = () => {
					numDom.textContent = Math.trunc(player.volume * 100).toString();
					dotDom.style.transform = `translate${player.opts.volumeVertical ? "Y" : "X"}(${-player.volume * 60 + 88}px)`;
				};

				player.on("VolumeChange", onVolumeChange);
				onVolumeChange();
			});
		}
	};

	const themePlugin = {
		apply(player: Player) {
			function createIcon(name: string, width: number, height: number, noCls?: boolean) {
				const div = useSvgIcon(name, width, height);
				if (!noCls) div.classList.add("nplayer_icon");
				return (cls?: string) => {
					if (cls) {
						div.classList.add(cls);
					}
					return div;
				};
			}

			const registerIcon = Player.Icon.register;
			registerIcon("play", createIcon("play", 22, 22));
			registerIcon("volume", createIcon("volume", 22, 22));
			registerIcon("cog", createIcon("setting", 22, 22));
			registerIcon("webEnterFullscreen", createIcon("webFullScreen", 22, 22));
			registerIcon("enterFullscreen", createIcon("fullScreen", 22, 22));

			player.opts.progressDot = createIcon("progressDot", 18, 18, true)("text-black");
			player.opts.posterPlayEl = createIcon("playBig", 80, 80)();
		}
	};

	return {
		mirrorSwitch,
		quantitySelector,
		speedSelector,
		playStatePlugin,
		danmakuPlugin,
		volumePlugin,
		themePlugin
	};
}
