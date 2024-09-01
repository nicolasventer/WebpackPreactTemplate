import { computed, effect, signal, Signal } from "@preact/signals";
import { ColorSchemeType } from "../Common/CommonModel";
import { SignalToValue } from "../utils/signalUtils";

/** The type of the global state of the application. */
export type GlobalState = {
	/** the color scheme of the application */
	colorScheme: Signal<ColorSchemeType>;
	/** if the screen is wake locked */
	isWakeLock: Signal<boolean>;
	/** if the screen is above md */
	isAboveMd: Signal<boolean>;
	/** if the screen is below xxs */
	isBelowXxs: Signal<boolean>;
	/** the size of the viewport */
	viewportSize: Signal<{
		/** the height of the viewport */
		height: number;
		/** the width of the viewport */
		width: number;
	}>;
};

// Note: all of theses settings could be stored in the database
type LocalStorageState = SignalToValue<Pick<GlobalState, "colorScheme">>;

const loadGlobalState = (): GlobalState => {
	const storedGlobalState = JSON.parse(localStorage.getItem("globalState") ?? "{}") as Partial<SignalToValue<LocalStorageState>>;

	return {
		colorScheme: signal(storedGlobalState.colorScheme ?? "dark"),
		isWakeLock: signal(false),
		isAboveMd: signal(false),
		isBelowXxs: signal(false),
		viewportSize: signal({ height: 0, width: 0 }),
	};
};

/** The global state of the application. */
export const globalState: GlobalState = loadGlobalState();

const localStorageState = computed(
	(): LocalStorageState => ({
		colorScheme: globalState.colorScheme.value,
	})
);

/** "md" if the screen is above md, "sm" otherwise. */
export const smMd = computed(() => (globalState.isAboveMd.value ? "md" : "sm"));
/** "sm" if the screen is above md, "xs" otherwise. */
export const xsSm = computed(() => (globalState.isAboveMd.value ? "sm" : "xs"));
/** "compact-md" if the screen is above md, "compact-sm" otherwise. */
export const compactXsSm = computed(() => `compact-${xsSm.value}`);

effect(() => {
	localStorageState.value;
	localStorage.setItem("globalState", JSON.stringify(localStorageState.value));
});

effect(() => {
	document.body.classList.toggle("dark", globalState.colorScheme.value === "dark");
});
