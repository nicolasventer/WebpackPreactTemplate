import { signal } from "@preact/signals";
import { render } from "preact";
import { lazy, Suspense } from "preact/compat";
import { ErrorBoundary } from "react-error-boundary";
import { Collapsible } from "./Collapsible";

const Counter = lazy(() => import("./Counter").then((m) => m.Counter));

const count = signal(0);

const Counter2 = () => {
	return (
		<div>
			<div>Count: {count}</div>
			<button onClick={() => count.value++}>Increment</button>
		</div>
	);
};

render(
	<ErrorBoundary fallback={<div>An error occured</div>}>
		<Collapsible open>
			<p>Hello, world!</p>
			<Counter2 />
			<Counter2 />
		</Collapsible>
		<Collapsible>
			<Suspense fallback={<div>Loading...</div>}>
				<Counter />
				<Counter />
			</Suspense>
		</Collapsible>
	</ErrorBoundary>,
	document.getElementById("root")!
);

console.log("Hello, world!");
