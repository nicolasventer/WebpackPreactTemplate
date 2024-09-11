import { Button } from "@mantine/core";
import { signal } from "@preact/signals";
import { DarkModeButton } from "../components/DarkModeButton";
import { WakeLockButton } from "../components/WakeLockButton";
import { FullViewport } from "../utils/ComponentToolbox";

const useTransition = signal(true);
const toggleUseTransition = () => (useTransition.value = !useTransition.value);

/**
 * Home page
 * @returns the home page
 */
export const HomePage = () => (
	<FullViewport>
		Home
		<Button onClick={toggleUseTransition}>{`${useTransition.value ? "Disable" : "Enable"} transition`}</Button>
		<DarkModeButton useTransition={useTransition.value} />
		<WakeLockButton />
	</FullViewport>
);
