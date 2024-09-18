import clsx from "clsx";
import type { ComponentChildren, JSX } from "preact";
import { ComponentPropsWithoutRef, createElement, ForwardedRef, forwardRef } from "preact/compat";
import { useEffect } from "preact/hooks";
import { useMount } from "../hooks/useMount";

/**
 * Sets the viewport to be full height and width
 * @param props
 * @param {string} [props.selector="#root"] the selector to set to full viewport
 * @param props.children the children to render
 */
export const FullViewport = ({ selector = "#root", children }: { selector?: string; children?: ComponentChildren }) => {
	useMount(() => {
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
	});
	return <>{children}</>;
};

const _styleTmpEl = document.createElement("div");
const Style = (css: Partial<CSSStyleDeclaration>) => {
	try {
		_styleTmpEl.style.cssText = "";
		Object.assign(_styleTmpEl.style, css);
		return _styleTmpEl.style.cssText;
	} catch {
		console.warn(`css error with: ${JSON.stringify(css)}`);
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

/** Writes the toolbox classes, needs to use the component toolbox */
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
 * Get the padding properties
 * @param param
 * @param param.padding the padding value
 * @param param.paddingTop the padding top value
 * @param param.paddingLeft the padding left value
 * @returns the padding properties
 */
const getPadding = ({
	padding,
	paddingTop,
	paddingLeft,
}: {
	paddingTop?: CssProperty;
	paddingLeft?: CssProperty;
	padding?: CssProperty;
}) => (padding ? { padding } : { paddingTop, paddingLeft });

/**
 * Get the margin properties
 * @param param
 * @param param.margin the margin value
 * @param param.marginTop the margin top value
 * @param param.marginLeft the margin left value
 * @returns the margin properties
 */
const getMargin = ({
	margin,
	marginTop,
	marginLeft,
}: {
	marginTop?: CssProperty;
	marginLeft?: CssProperty;
	margin?: CssProperty;
}) => (margin ? { margin } : { marginTop, marginLeft });

/**
 * A flex box that can be horizontal, vertical, or overlap
 * @param props div props
 * @returns a div with the flex box properties
 */
export const LDisplay = forwardRef(
	(
		{
			lDisplay,
			alignItems,
			justifyContent,
			gap,
			width,
			widthMaxContent,
			height,
			heightMaxContent,
			padding,
			paddingTop,
			paddingLeft,
			margin,
			marginTop,
			marginLeft,
			flexGrow,
			...divProps
		}: {
			lDisplay: LDisplayType;
			alignItems?: AlignItemsType;
			justifyContent?: JustifyContentType;
			gap?: CssProperty;
			width?: CssProperty;
			widthMaxContent?: boolean;
			height?: CssProperty;
			heightMaxContent?: boolean;
			paddingTop?: CssProperty;
			paddingLeft?: CssProperty;
			padding?: CssProperty;
			marginTop?: CssProperty;
			marginLeft?: CssProperty;
			margin?: CssProperty;
			flexGrow?: CssProperty;
		} & ComponentPropsWithoutRef<"div">,
		ref: ForwardedRef<HTMLDivElement>
	) => (
		<div
			{...divProps}
			ref={ref}
			className={clsx(lDisplay, divProps.class, divProps.className)}
			style={{
				alignItems,
				justifyContent,
				gap,
				width: widthMaxContent ? "max-content" : width,
				height: heightMaxContent ? "max-content" : height,
				...getPadding({ padding, paddingTop, paddingLeft }),
				...getMargin({ margin, marginTop, marginLeft }),
				flexGrow,
				...(typeof divProps.style === "object" ? divProps.style : {}),
			}}
		/>
	)
);

/**
 * A horizontal flex box, with default alignItems="center"
 * @see {@link LDisplay}
 * @param props div props
 * @returns a div with the horizontal flex box properties
 */
export const HDisplay = forwardRef(
	(props: Omit<ComponentPropsWithoutRef<typeof LDisplay>, "lDisplay">, ref: ForwardedRef<HTMLDivElement>) => (
		<LDisplay ref={ref} alignItems="center" {...props} lDisplay="hDisplay" />
	)
);

/**
 * A vertical flex box
 * @see {@link LDisplay}
 * @param props div props
 * @returns a div with the vertical flex box properties
 */
export const VDisplay = forwardRef(
	(props: Omit<ComponentPropsWithoutRef<typeof LDisplay>, "lDisplay">, ref: ForwardedRef<HTMLDivElement>) => (
		<LDisplay ref={ref} {...props} lDisplay="vDisplay" />
	)
);

/**
 * An overlap flex box
 * @see {@link LDisplay}
 * @param props div props
 * @returns a div with the overlap flex box properties
 */
export const Overlap = forwardRef(
	(props: Omit<ComponentPropsWithoutRef<typeof LDisplay>, "lDisplay">, ref: ForwardedRef<HTMLDivElement>) => (
		<LDisplay ref={ref} {...props} lDisplay="overlap" />
	)
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
	<Comp {...divProps} style={{ flexGrow, ...(typeof divProps.style === "object" ? divProps.style : {}) }} />
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
 * A box component that have properties like width, height
 * @param props div props
 * @returns a div with the specified properties
 */
export const Box = forwardRef(
	(
		{
			width,
			widthMaxContent,
			height,
			heightMaxContent,
			padding,
			paddingTop,
			paddingLeft,
			margin,
			marginTop,
			marginLeft,
			flexGrow,
			...divProps
		}: {
			width?: CssProperty;
			widthMaxContent?: boolean;
			height?: CssProperty;
			heightMaxContent?: boolean;
			padding?: CssProperty;
			paddingTop?: CssProperty;
			paddingLeft?: CssProperty;
			margin?: CssProperty;
			marginTop?: CssProperty;
			marginLeft?: CssProperty;
			flexGrow?: CssProperty;
		} & ComponentPropsWithoutRef<"div">,
		ref: ForwardedRef<HTMLDivElement>
	) => (
		<div
			ref={ref}
			{...divProps}
			style={{
				width: widthMaxContent ? "max-content" : width,
				height: heightMaxContent ? "max-content" : height,
				...getPadding({ padding, paddingTop, paddingLeft }),
				...getMargin({ margin, marginTop, marginLeft }),
				flexGrow,
				...(typeof divProps.style === "object" ? { ...divProps.style } : {}),
			}}
		/>
	)
);
