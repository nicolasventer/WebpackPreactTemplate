import type { FunctionComponent } from "preact";
import { SVGAttributes } from "preact/compat";

declare module "*.svg" {
	const content: FunctionComponent<SVGAttributes<SVGElement>>;
	export default content;
}
declare module "*.jpg" {
	const content: string;
	export default content;
}
declare module "*.png" {
	const content: string;
	export default content;
}
declare module "*.jpeg" {
	const content: string;
	export default content;
}
declare module "*.gif" {
	const content: string;
	export default content;
}
declare module "*.module.css" {
	const classes: { readonly [key: string]: string };
	export default classes;
}
