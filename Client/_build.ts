import Bun from "bun";
import fs from "fs";

fs.rmSync("./dist", { recursive: true, force: true });
console.log("dist folder removed");

await Bun.build({
	entrypoints: ["./src/index.tsx"],
	outdir: "./dist",
	splitting: true,
	sourcemap: "linked",
	minify: true,
	naming: {
		entry: "[dir]/[name].[ext]",
		chunk: "[dir]/[name].chunk.[ext]",
		asset: "asset/[name].[ext]",
	},
});
console.log("build done");

fs.copyFileSync("./bun_index.html", "./dist/index.html");
console.log("bun_index.html copied");
