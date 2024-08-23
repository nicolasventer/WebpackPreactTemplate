import clsx from "clsx";
import type { ComponentChild, ComponentChildren, JSX } from "preact";
import { ComponentPropsWithoutRef, createElement } from "preact/compat";
import { useEffect } from "preact/hooks";

/**
 * Sets the viewport to be full height and width
 * @param props
 * @param {string} [props.selector="#root"] the selector to set to full viewport
 * @param props.children the children to render
 */
export const FullViewport = ({ selector = "#root", children }: { selector?: string; children?: ComponentChildren }) => {
	useEffect(() => {
		const elStyle = document.createElement("style");
		elStyle.innerHTML = `
			html, body, ${selector} {
				height: 100%;
				margin: 0;
				padding: 0;
			}
		`;
		elStyle.id = "full-viewport";
		document.head.appendChild(elStyle);
	}, []);
	return <>{children}</>;
};

const _styleTmpEl = document.createElement("div");
const Style = (css: Partial<CSSStyleDeclaration>) => {
	try {
		_styleTmpEl.style.cssText = "";
		Object.assign(_styleTmpEl.style, css);
		return _styleTmpEl.style.cssText;
	} catch (e) {
		console.warn(css);
		return css.cssText ?? "";
	}
};

const WriteClasses = (styleId: string, classes: Record<string, Partial<CSSStyleDeclaration>>) => {
	let classStyleEl = document.getElementById(styleId);
	if (!classStyleEl) {
		classStyleEl = document.createElement("style");
		classStyleEl.id = styleId;
		document.head.appendChild(classStyleEl);
	}
	classStyleEl.innerHTML = Object.entries(classes).reduce((style, [className, classStyle]) => {
		style += `.${className} { ${Style(classStyle)} }\n`;
		return style;
	}, classStyleEl.innerHTML);
};

/**
 * Writes the toolbox classes, needs to use the component toolbox
 */
export const WriteToolboxClasses = () => {
	useEffect(() => {
		WriteClasses("vanilla-classes", {
			horizontal: { display: "flex", justifyContent: "space-between" },
			vertical: { display: "flex", flexDirection: "column", justifyContent: "space-between" },
			hDisplay: { display: "flex", flexDirection: "row" },
			vDisplay: { display: "flex", flexDirection: "column" },
			overlap: { position: "relative" },
			"overlap > *": { position: "absolute", height: "100%", width: "100%" },
		});
	}, []);
	return <></>;
};

/** Layout values */
export const LayoutValues = ["horizontal", "vertical"] as const;
/** Layout type */
export type LayoutType = (typeof LayoutValues)[number];

/**
 * A layout component
 * @param props div props and layout
 * @param props.layout the layout type
 * @param props.children expects at most 3 children, left, center, and right (add {null} to skip)
 * @returns a div with the children laid out according to the layout type
 */
export const Layout = ({
	layout,
	children: [leftEl, centerEl, rightEl],
	...divProps
}: {
	layout: LayoutType;
	children: [ComponentChild, ComponentChild, ComponentChild];
} & ComponentPropsWithoutRef<"div">) => (
	<div {...divProps} class={clsx(layout, divProps.class)}>
		{leftEl ?? <div />}
		{centerEl ?? <div />}
		{rightEl ?? <div />}
	</div>
);

/**
 * A horizontal layout component
 * @see {@link Layout}
 * @param props div props, expects at most 3 children, left, center, and right (add {null} to skip)
 * @returns a div with the children laid out horizontally
 */
export const Horizontal = (props: Omit<ComponentPropsWithoutRef<typeof Layout>, "layout">) => (
	<Layout {...props} layout="horizontal" />
);

/**
 * A horizontal layout component (for only left)
 * @see {@link Horizontal}
 * @param props div props, expects one child (placed at the left)
 * @returns a div with the child laid out at the left
 */
export const Left = ({ children, ...divProps }: ComponentPropsWithoutRef<"div">) => (
	<Horizontal {...divProps} children={[children, null, null]} />
);

/**
 * A horizontal layout component (for only center)
 * @see {@link Horizontal}
 * @param props div props, expects one child (placed at the center)
 * @returns a div with the child laid out at the center
 */
export const Center = ({ children, ...divProps }: ComponentPropsWithoutRef<"div">) => (
	<Horizontal {...divProps} children={[null, children, null]} />
);

/**
 * A horizontal layout component (for only right)
 * @see {@link Horizontal}
 * @param props div props, expects one child (placed at the right)
 * @returns a div with the child laid out at the right
 */
export const Right = ({ children, ...divProps }: ComponentPropsWithoutRef<"div">) => (
	<Horizontal {...divProps} children={[null, null, children]} />
);

/**
 * A vertical layout component
 * @see {@link Layout}
 * @param props div props, expects at most 3 children, top, middle, and bottom (add {null} to skip)
 * @returns a div with the children laid out vertically
 */
export const Vertical = (props: Omit<ComponentPropsWithoutRef<typeof Layout>, "layout">) => (
	<Layout {...props} layout="vertical" />
);

/**
 * A vertical layout component (for only top)
 * @see {@link Vertical}
 * @param props div props, expects one child (placed at the top)
 * @returns a div with the child laid out at the top
 */
export const Top = ({ children, ...divProps }: ComponentPropsWithoutRef<"div">) => (
	<Vertical {...divProps} children={[children, null, null]} />
);

/**
 * A vertical layout component (for only middle)
 * @see {@link Vertical}
 * @param props div props, expects one child (placed at the middle)
 * @returns a div with the child laid out at the middle
 */
export const Middle = ({ children, ...divProps }: ComponentPropsWithoutRef<"div">) => (
	<Vertical {...divProps} children={[null, children, null]} />
);

/**
 * A vertical layout component (for only bottom)
 * @see {@link Vertical}
 * @param props div props, expects one child (placed at the bottom)
 * @returns a div with the child laid out at the bottom
 */
export const Bottom = ({ children, ...divProps }: ComponentPropsWithoutRef<"div">) => (
	<Vertical {...divProps} children={[null, null, children]} />
);

/** Justify content values */
export const JustifyContentValues = [
	"normal",
	"center",
	"flex-start",
	"flex-end",
	"space-between",
	"space-around",
	"space-evenly",
] as const;
/** Justify content type */
export type JustifyContentType = (typeof JustifyContentValues)[number];

/** Align items values */
export const AlignItemsValues = ["normal", "center", "flex-start", "flex-end", "stretch", "baseline"] as const;
/** Align items type */
export type AlignItemsType = (typeof AlignItemsValues)[number];

/** LDisplay values */
export const LDisplayValues = ["hDisplay", "vDisplay", "overlap"] as const;
/** LDisplay type */
export type LDisplayType = (typeof LDisplayValues)[number];

/**
 * A flex box
 * @param props div props and ldisplay, alignItems and justifyContent
 * @param props.ldisplay the display type
 * @param props.alignItems the align items value
 * @param props.justifyContent the justify content value
 * @returns a div with the flex box properties
 */
export const LDisplay = ({
	ldisplay,
	alignItems,
	justifyContent,
	...divProps
}: {
	ldisplay: LDisplayType;
	alignItems?: AlignItemsType;
	justifyContent?: JustifyContentType;
} & ComponentPropsWithoutRef<"div">) => (
	<div
		{...divProps}
		class={clsx(ldisplay, divProps.class)}
		style={{ ...(typeof divProps.style === "object" ? divProps.style : {}), alignItems, justifyContent }}
	/>
);

/**
 * A horizontal flex box
 * @see {@link LDisplay}
 * @param props div props
 * @returns a div with the horizontal flex box properties
 */
export const HDisplay = (props: Omit<ComponentPropsWithoutRef<typeof LDisplay>, "ldisplay">) => (
	<LDisplay {...props} ldisplay="hDisplay" />
);

/**
 * A vertical flex box
 * @see {@link LDisplay}
 * @param props div props
 * @returns a div with the vertical flex box properties
 */
export const VDisplay = (props: Omit<ComponentPropsWithoutRef<typeof LDisplay>, "ldisplay">) => (
	<LDisplay {...props} ldisplay="vDisplay" />
);

/**
 * An overlap flex box
 * @see {@link LDisplay}
 * @param props div props
 * @returns a div with the overlap flex box properties
 */
export const Overlap = (props: Omit<ComponentPropsWithoutRef<typeof LDisplay>, "ldisplay">) => (
	<LDisplay {...props} ldisplay="overlap" />
);

/**
 * @notExported
 * the type of the parameters of a function
 */
type Params<T> = T extends (...args: [infer U]) => any ? U : Record<string, never>;

/**
 * @notExported
 * the type of a css property
 */
type CssProperty = number | string | null;

/**
 * Create a component with a flex grow property set
 * @template T the component type
 * @param props
 * @param props.Comp the component to wrap
 * @param {CssProperty?} [props.flexGrow=1] the flex grow value
 * @returns a component with a flex grow property set
 */
export const FlexGrow = <T extends (...args: any) => any>({
	Comp,
	flexGrow = 1,
	...divProps
}: { Comp: T; flexGrow?: CssProperty } & Params<T>) => (
	// @ts-ignore
	<Comp {...divProps} style={{ ...(typeof divProps.style === "object" ? divProps.style : {}), flexGrow }} />
);

/**
 * Create a component with a tag
 * @param tag the tag to use
 * @returns a component with the tag
 */
export const GetIntrinsicComp =
	<T extends keyof JSX.IntrinsicElements>(tag: T) =>
	(props: JSX.IntrinsicElements[T]) =>
		createElement(tag as any, props);

/**
 * A box component
 * @param props div props and width and height
 * @param props.width the width of the box
 * @param props.height the height of the box
 * @param props.padding the padding of the box
 * @param props.margin the margin of the box
 * @returns a div with the width, height, padding, and margin properties
 */
export const Box = ({
	width,
	height,
	padding,
	margin,
	...divProps
}: {
	width?: CssProperty;
	height?: CssProperty;
	padding?: CssProperty;
	margin?: CssProperty;
} & ComponentPropsWithoutRef<"div">) => (
	<div
		{...divProps}
		style={{ ...(typeof divProps.style === "object" ? { ...divProps.style } : {}), width, height, padding, margin }}
	/>
);
