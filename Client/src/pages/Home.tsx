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
		<div>
			<span>With transition: </span>
			<DarkModeButton useTransition />
		</div>
		<div>
			<span>With loading: </span>
			<DarkModeButton useTransition={false} />
		</div>
		<WakeLockButton />
	</FullViewport>
);
