import { Type as t, type TSchema } from "@sinclair/typebox";
import { checkEnumObj } from "./CommonUtils";

const Nullable = <T extends TSchema>(type: T) => t.Union([type, t.Null()]);

/** Color scheme values */
export const COLOR_SCHEMES = ["light", "dark"] as const;
/**
 * Color scheme object
 * @enum
 * @property light - Light color scheme
 * @property dark - Dark color scheme
 */
export const COLOR_SCHEMES_OBJ = {
	/** Light color scheme */
	light: "light",
	/** Dark color scheme */
	dark: "dark",
} as const;
/** Color scheme type */
export type ColorSchemeType = (typeof COLOR_SCHEMES)[number];
checkEnumObj<ColorSchemeType>(COLOR_SCHEMES_OBJ);
