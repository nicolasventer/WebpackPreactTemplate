import { createTheme, MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import { useMediaQuery } from "@mantine/hooks";
import { useEffect } from "preact/hooks";
import { ErrorBoundary } from "react-error-boundary";
import { globalState } from "./context/GlobalState";
import { HomePage } from "./pages/exports_";
import type { HomePage as HomePage_ } from "./pages/Home";
import { WriteToolboxClasses } from "./utils/ComponentToolbox";

const theme = createTheme({});

/**
 * Renders all pages of the application based on the URL. All pages are lazy loaded. \
 * It also updates the {@link globalState | `global states`} `isAboveMd` and `isBelowXxs` based on the screen size. \
 * Renders the {@link HomePage_ | `HomePage`} if the URL is `/` or `/coord`.
 * @returns The rendered application.
 */
export const App = () => {
	const url = new URL(window.location.href);
	const isAboveMd = useMediaQuery("(min-width: 62em)");
	const isBelowXxs = useMediaQuery("(max-width: 25em)");
	useEffect(() => void (globalState.isAboveMd.value = !!isAboveMd), [isAboveMd]);
	useEffect(() => void (globalState.isBelowXxs.value = !!isBelowXxs), [isBelowXxs]);

	return (
		<ErrorBoundary fallbackRender={({ error }) => "error: " + JSON.stringify(error)}>
			<WriteToolboxClasses />
			<MantineProvider theme={theme} defaultColorScheme={globalState.colorScheme.value}>
				{url.pathname === "/" && <HomePage />}
				{url.pathname === "/home" && <HomePage />}
			</MantineProvider>
		</ErrorBoundary>
	);
};
