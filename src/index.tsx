import { render } from "preact";
import { lazy, Suspense } from "preact/compat";
import { Collapsible } from "./Collapsible";

const Counter = lazy(() => import("./Counter").then((m) => m.Counter));

render(
	<div>
		<Collapsible open>
			<p>Hello, world!</p>
		</Collapsible>
		<Collapsible>
			<Suspense fallback={<div>Loading...</div>}>
				<Counter />
				<Counter />
			</Suspense>
		</Collapsible>
	</div>,
	document.getElementById("root")!
);

console.log("Hello, world!");
