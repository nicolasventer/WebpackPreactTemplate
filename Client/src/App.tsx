import { createTheme, MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import { ErrorBoundary } from "react-error-boundary";
import { globalState } from "./context/GlobalState";
import { HomePage } from "./pages/exports_";
import { WriteToolboxClasses } from "./utils/ComponentToolbox";

const theme = createTheme({});

/**
 * Main app component, routes to different pages based on the URL
 * @returns the main app component
 */
export const App = () => {
	const url = new URL(window.location.href);
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
