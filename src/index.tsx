import { Suspense, lazy } from "react";
import { createRoot } from "react-dom/client";
import { Collapsible } from "./Collapsible";

const Counter = lazy(() => import("./Counter").then((m) => ({ default: m.Counter })));

createRoot(document.getElementById("root")!).render(
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
	</div>
);

console.log("Hello, world!");
