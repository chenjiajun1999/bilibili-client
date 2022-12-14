export interface PlayerEvent {
	eventName:
		| Extract<keyof WindowEventMap, "mousemove" | "mouseup" | "leavepictureinpicture" | "progress" | "durationchange">
		| Extract<keyof HTMLVideoElementEventMap, "leavepictureinpicture" | "fullscreenchange">;
	element: EventTarget;
	method(e: Event): void;
}
