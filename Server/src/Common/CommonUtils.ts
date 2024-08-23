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
