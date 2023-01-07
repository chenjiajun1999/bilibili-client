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
				const oldSvgPath =
					"M9 21v2H7v-2h2m4 0v2h-2v-2h2m4 0v2h-2v-2h2M2 19V3h20v16m-11-7H9v2h2v-2m8 0h-6v2h6v-2M7 8H5v2h2V8m12 0H9v2h10V8z";
				const newSvgPath =
					"M15.645 4.881l1.06-1.473a.998.998 0 10-1.622-1.166L13.22 4.835a110.67 110.67 0 00-1.1-.007h-.131c-.47 0-.975.004-1.515.012L8.783 2.3A.998.998 0 007.12 3.408l.988 1.484c-.688.019-1.418.042-2.188.069a4.013 4.013 0 00-3.83 3.44c-.165 1.15-.245 2.545-.245 4.185 0 1.965.115 3.67.35 5.116a4.012 4.012 0 003.763 3.363c1.903.094 3.317.141 5.513.141a.988.988 0 000-1.975 97.58 97.58 0 01-5.416-.139 2.037 2.037 0 01-1.91-1.708c-.216-1.324-.325-2.924-.325-4.798 0-1.563.076-2.864.225-3.904.14-.977.96-1.713 1.945-1.747 2.444-.087 4.465-.13 6.063-.131 1.598 0 3.62.044 6.064.13.96.034 1.71.81 1.855 1.814.075.524.113 1.962.141 3.065v.002c.005.183.01.07.014-.038.004-.096.008-.189.011-.081a.987.987 0 101.974-.069c-.004-.105-.007-.009-.011.09-.002.056-.004.112-.007.135l-.002.01a.574.574 0 01-.005-.091v-.027c-.03-1.118-.073-2.663-.16-3.276-.273-1.906-1.783-3.438-3.74-3.507-.905-.032-1.752-.058-2.543-.079zm-3.113 4.703h-1.307v4.643h2.2v.04l.651-1.234c.113-.215.281-.389.482-.509v-.11h.235c.137-.049.283-.074.433-.074h1.553V9.584h-1.264a8.5 8.5 0 00.741-1.405l-1.078-.381c-.24.631-.501 1.23-.806 1.786h-1.503l.686-.305c-.228-.501-.5-.959-.806-1.394l-1.034.348c.294.392.566.839.817 1.35zm-1.7 5.502h2.16l-.564 1.068h-1.595v-1.068zm-2.498-1.863l.152-1.561h1.96V8.289H7.277v.969h2.048v1.435h-1.84l-.306 3.51h2.254c0 1.155-.043 1.906-.12 2.255-.076.348-.38.523-.925.523-.305 0-.61-.022-.893-.055l.294 1.056.061.005c.282.02.546.039.81.039.991-.065 1.547-.414 1.677-1.046.11-.631.175-1.883.175-3.757H8.334zm5.09-.8v.85h-1.188v-.85h1.187zm-1.188-.955h1.187v-.893h-1.187v.893zm2.322.007v-.893h1.241v.893h-1.241zm.528 2.757a1.26 1.26 0 011.087-.627l4.003-.009a1.26 1.26 0 011.094.63l1.721 2.982c.226.39.225.872-.001 1.263l-1.743 3a1.26 1.26 0 01-1.086.628l-4.003.009a1.26 1.26 0 01-1.094-.63l-1.722-2.982a1.26 1.26 0 01.002-1.263l1.742-3zm1.967.858a1.26 1.26 0 00-1.08.614l-.903 1.513a1.26 1.26 0 00-.002 1.289l.885 1.492c.227.384.64.62 1.086.618l2.192-.005a1.26 1.26 0 001.08-.615l.904-1.518a1.26 1.26 0 00.001-1.288l-.884-1.489a1.26 1.26 0 00-1.086-.616l-2.193.005zm2.517 2.76a1.4 1.4 0 11-2.8 0 1.4 1.4 0 012.8 0z";
				for (let i = 0; i < paths.length; i++) {
					const path = paths[i];
					if (path.getAttribute("d") === oldSvgPath) {
						path.setAttribute("d", newSvgPath);
						return;
					}
				}
			});
		}
	};

	const volumePlugin = {
		apply(player: Player) {
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
			player.opts.volumeVertical = true;
			player.opts.volumeBarLength = "60px";
			player.opts.posterEnable = false;
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
