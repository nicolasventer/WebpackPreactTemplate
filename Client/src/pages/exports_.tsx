import { lazy, Suspense } from "preact/compat";

type Params<T> = T extends (...args: [infer U]) => any ? U : Record<string, never>;

const Suspender =
	<T extends (...args: any) => any>(Comp: T) =>
	(props: Params<T>) =>
		(
			<Suspense fallback>
				<Comp {...props} />
			</Suspense>
		);

const defaultLoader =
	<T extends Record<string, any>>(defaultExport: keyof T) =>
	(mod: T) =>
		mod[defaultExport];

// Pages

/** Lazy export of HomePage */
export const HomePage = Suspender(lazy(() => import("./Home").then(defaultLoader("HomePage"))));
