import { ActionIcon } from "@mantine/core";
import { signal } from "@preact/signals";
import { Moon, Sun } from "lucide-react";
import { flushSync } from "preact/compat";
import { globalState } from "../context/GlobalState";
import { widthSizeObj } from "../utils/commonUtils";

const isColorSchemeLoading = signal(false);

/**
 * A button that toggles between light and dark mode
 * @returns a button that toggles between light and dark mode
 */
export const DarkModeButton = ({ useTransition }: { useTransition: boolean }) => {
	const setModeFn = (mode: "light" | "dark") => () => {
		if (useTransition) {
			document.startViewTransition(() => flushSync(() => void (globalState.colorScheme.value = mode)));
		} else {
			isColorSchemeLoading.value = true;
			setTimeout(() => void ((globalState.colorScheme.value = mode), (isColorSchemeLoading.value = false)), 100);
		}
	};

	return (
		<ActionIcon loading={isColorSchemeLoading.value}>
			{globalState.colorScheme.value === "dark" && (
				<Sun width={widthSizeObj(3.5, 6)} id={"light-mode-button"} onClick={setModeFn("light")} style={{ marginBottom: 1 }} />
			)}
			{globalState.colorScheme.value === "light" && (
				<Moon width={widthSizeObj(3.5, 6)} id={"dark-mode-button"} onClick={setModeFn("dark")} style={{ marginBottom: 1 }} />
			)}
		</ActionIcon>
	);
};
