import { treaty } from "@elysiajs/eden";
import type { App } from "../../../Server/src/index";
import { SRV_URL } from "./CommonConfig";

/**
 * @notExported
 * The type of the API object.
 */
type Api = ReturnType<typeof treaty<App>>["api"];

/**
 * Object used to call the server's API.
 */
export const api: Api = treaty<App>(SRV_URL).api;

/**
 * Converts an enum to an object.
 * @param enumObj The enum to convert.
 * @returns an object with the enum values as keys and values.
 */
export const enumToObj = <T extends readonly string[]>(enumObj: T) => {
	const obj = {} as { [key in T[number]]: key };
	for (const value of enumObj) obj[value as keyof typeof obj] = value;
	return obj;
};
