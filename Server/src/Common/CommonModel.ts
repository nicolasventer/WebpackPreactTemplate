import { enumToObj } from "./CommonUtils";

/** Color scheme values */
export const COLOR_SCHEMES = ["light", "dark"] as const;
/**
 * Color scheme object
 * @enum
 * @property light - Light color scheme
 * @property dark - Dark color scheme
 */
export const COLOR_SCHEMES_OBJ = enumToObj(COLOR_SCHEMES);
/** Color scheme type */
export type ColorSchemeType = (typeof COLOR_SCHEMES)[number];
