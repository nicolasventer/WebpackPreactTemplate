declare module "*.svg" {
	// eslint-disable-next-line no-undef
	const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
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
