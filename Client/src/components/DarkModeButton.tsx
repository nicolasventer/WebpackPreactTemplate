import { ActionIcon, useMantineColorScheme } from "@mantine/core";
import { Moon, Sun } from "lucide-react";
import { globalState } from "../context/GlobalState";
import { widthSizeObj } from "../utils/commonUtils";

/**
 * A button that toggles between light and dark mode
 * @returns a button that toggles between light and dark mode
 */
export const DarkModeButton = () => {
	const { setColorScheme } = useMantineColorScheme();

	const setModeFn = (mode: "light" | "dark") => () => {
		setColorScheme(mode);
		globalState.colorScheme.value = mode;
	};

	return (
		<ActionIcon>
			{globalState.colorScheme.value === "dark" && (
				<Sun width={widthSizeObj(4, 6)} id={"light-mode-button"} onClick={setModeFn("light")} style={{ marginBottom: 1 }} />
			)}
			{globalState.colorScheme.value === "light" && (
				<Moon width={widthSizeObj(4, 6)} id={"dark-mode-button"} onClick={setModeFn("dark")} style={{ marginBottom: 1 }} />
			)}
		</ActionIcon>
	);
};
