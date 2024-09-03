import { Button } from "@mantine/core";
import { DarkModeButton } from "../components/DarkModeButton";
import { WakeLockButton } from "../components/WakeLockButton";
import { FullViewport } from "../utils/ComponentToolbox";

/**
 * Home page
 * @returns the home page
 */
export const HomePage = () => (
	<FullViewport>
		Home
		<Button>Button</Button>
		<DarkModeButton />
		<WakeLockButton />
	</FullViewport>
);
