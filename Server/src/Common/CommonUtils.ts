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

/** The type of an object with the keys as the values of the enum. */
export type EnumObj<T extends Readonly<string>> = { [K in T]: K };

/**
 * Ensure that the object is an EnumObj.
 * @template T The type of the enum.
 * @param _ The object to check.
 * @returns nothing.
 */
export const checkEnumObj = <T extends Readonly<string>>(_: EnumObj<T>) => void 0;
