export default function useImageMainColor(imgElement: HTMLImageElement, opacity?: number): Promise<String> {
	function getMainColor(imgElement: HTMLImageElement) {
		const canvas = document.createElement("canvas");
		const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

		canvas.width = imgElement.width;
		canvas.height = imgElement.height;
		ctx.drawImage(imgElement, 0, 0, canvas.width, canvas.height);
		const matrix = [];
		let pre = Math.max(1, Math.trunc(canvas.width / 100));

		for (let x = 0; x <= ctx.canvas.width; x = x + pre) {
			for (let y = 0; y <= ctx.canvas.height; y = y + pre) {
				matrix.push([x, y]);
			}
		}

		let res = matrix
			.map(p => ctx.getImageData(p[0], p[1], 1, 1).data)
			.filter(c => {
				const l = c[0] * 0.3 + c[1] * 0.59 + c[2] * 0.11;

				return 180 > l && l > 70;
			})
			.map(c => {
				c.slice().sort((a, b) => b - a);
				c[3] = (c[0] - c[c.length - 1]) / c[0];
				return c;
			})
			.sort((a, b) => b[3] - a[3]);

		return res[res.length >>> 1];
	}

	return new Promise(res => {
		function resolve() {
			let color = getMainColor(imgElement);
			opacity = typeof opacity === "undefined" ? 1 : Math.max(Math.min(1, opacity), 0.1);
			res(`rgb(${color[0]} ${color[1]} ${color[2]} / ${Math.trunc(opacity * 100)}%)`);
		}
		imgElement.complete
			? resolve()
			: (imgElement.onload = () => {
					resolve();
			  });
	});
}
