const path = require("path");

// plugin to refresh live server after build
const RefreshLiveServerPlugin = {
	apply: (compiler) => {
		compiler.hooks.beforeCompile.tap("RefreshLiveServer", () => {
			console.clear();
			console.log("Compiling...");
		});
		compiler.hooks.afterEmit.tap("RefreshLiveServer", () => {
			const fs = require("fs");
			fs.writeFileSync("dist/_dmp", "");
			fs.unlinkSync("dist/_dmp");
		});
	},
};

module.exports = {
	entry: {
		main: "./src/index.tsx",
	},
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "[name].bundle.js",
		chunkFilename: "[name].chunk.js",
	},
	mode: "production",
	resolve: {
		extensions: [".ts", ".tsx", ".js"],
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				loader: "ts-loader",
			},
		],
	},
	optimization: {
		chunkIds: "named",
	},
	plugins: [RefreshLiveServerPlugin],
};
