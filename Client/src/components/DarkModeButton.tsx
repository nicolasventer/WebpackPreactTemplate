import { ActionIcon, useMantineColorScheme } from "@mantine/core";
import { Moon, Sun } from "lucide-react";
import { globalState } from "../context/GlobalState";

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
			{globalState.colorScheme.value === "dark" && <Sun id={"light-mode-button"} onClick={setModeFn("light")} />}
			{globalState.colorScheme.value === "light" && <Moon id={"dark-mode-button"} onClick={setModeFn("dark")} />}
		</ActionIcon>
	);
};
