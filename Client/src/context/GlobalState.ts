import { computed, effect, signal, Signal } from "@preact/signals";
import { ColorSchemeType } from "../Common/CommonModel";
import { SignalToValue } from "../utils/signalUtils";

/** The type of the global state of the application. */
export type GlobalState = {
	/** the color scheme of the application */
	colorScheme: Signal<ColorSchemeType>;
	/** if the screen is above md */
	isAboveMd: Signal<boolean>;
	/** if the screen is below xxs */
	isBelowXxs: Signal<boolean>;
};

// Note: all of theses settings could be stored in the database
type LocalStorageState = SignalToValue<Pick<GlobalState, "colorScheme">>;

const loadGlobalState = (): GlobalState => {
	const storedGlobalState = JSON.parse(localStorage.getItem("globalState") ?? "{}") as Partial<SignalToValue<LocalStorageState>>;

	return {
		colorScheme: signal(storedGlobalState.colorScheme ?? "dark"),
		isAboveMd: signal(false),
		isBelowXxs: signal(false),
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

effect(() => {
	localStorageState.value;
	localStorage.setItem("globalState", JSON.stringify(localStorageState.value));
});
