import { useBreakpoints } from "@vueuse/core";
export function useScreenPixel() {
	const breakpoints = useBreakpoints({
		sm: 640,
		md: 768,
		cmd: 766,
		lg: 1024,
		xl: 1280,
		"2xl": 1536
	});
	const sm = breakpoints.smaller("sm");
	const md = breakpoints.between("sm", "md");
	const cmd = breakpoints.between("sm", "cmd");
	const gtMd = breakpoints.greater("md");
	const lg = breakpoints.between("md", "lg");
	const xl = breakpoints.between("lg", "xl");
	const xxl = breakpoints.between("xl", "2xl");
	const xxxl = breakpoints["2xl"];

	return {
		sm,
		md,
		cmd,
		gtMd,
		lg,
		xl,
		xxl,
		xxxl
	};
}
