import { effect, signal, Signal } from "@preact/signals";
import { signalToValue, SignalToValue } from "../utils/signalUtils";

/**
 * The type of the global state of the application.
 */
export type GlobalState = {
	/** the color scheme of the application */
	colorScheme: Signal<"light" | "dark">;
};

const loadGlobalState = (): GlobalState => {
	const storedGlobalState = JSON.parse(localStorage.getItem("globalState") ?? "{}") as SignalToValue<GlobalState>;

	return {
		colorScheme: signal(storedGlobalState.colorScheme ?? "dark"),
	};
};

/**
 * The global state of the application.
 */
export const globalState: GlobalState = loadGlobalState();

effect(() => {
	globalState.colorScheme.value;
	localStorage.setItem("globalState", JSON.stringify(signalToValue(globalState)));
});
