import { Button } from "@mantine/core";
import { DarkModeButton } from "../components/DarkModeButton";
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
	</FullViewport>
);
