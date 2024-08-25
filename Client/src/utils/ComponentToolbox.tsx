import clsx from "clsx";
import type { ComponentChildren, JSX } from "preact";
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
			hDisplay: { display: "flex", flexDirection: "row" },
			vDisplay: { display: "flex", flexDirection: "column" },
			overlap: { position: "relative" },
			"overlap > *": { position: "absolute", height: "100%", width: "100%" },
		});
	}, []);
	return <></>;
};

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
 * @param props.gap the gap value
 * @param props.flexGrow the flex grow value
 * @returns a div with the flex box properties
 */
export const LDisplay = ({
	ldisplay,
	alignItems,
	justifyContent,
	gap,
	flexGrow,
	...divProps
}: {
	ldisplay: LDisplayType;
	alignItems?: AlignItemsType;
	justifyContent?: JustifyContentType;
	gap?: CssProperty;
	flexGrow?: CssProperty;
} & ComponentPropsWithoutRef<"div">) => (
	<div
		{...divProps}
		class={clsx(ldisplay, divProps.class)}
		style={{ ...(typeof divProps.style === "object" ? divProps.style : {}), alignItems, justifyContent, gap, flexGrow }}
	/>
);

/**
 * A horizontal flex box, with default alignItems="center"
 * @see {@link LDisplay}
 * @param props div props
 * @returns a div with the horizontal flex box properties
 */
export const HDisplay = (props: Omit<ComponentPropsWithoutRef<typeof LDisplay>, "ldisplay">) => (
	<LDisplay alignItems="center" {...props} ldisplay="hDisplay" />
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
 * @param props.flexGrow the flex grow of the box
 * @returns a div with the width, height, padding, and margin properties
 */
export const Box = ({
	width,
	height,
	padding,
	margin,
	flexGrow,
	...divProps
}: {
	width?: CssProperty;
	height?: CssProperty;
	padding?: CssProperty;
	margin?: CssProperty;
	flexGrow?: CssProperty;
} & ComponentPropsWithoutRef<"div">) => (
	<div
		{...divProps}
		style={{ ...(typeof divProps.style === "object" ? { ...divProps.style } : {}), width, height, padding, margin, flexGrow }}
	/>
);
