import preact from "@preact/preset-vite";
import path from "path";
import { env } from "process";
import { defineConfig } from "vite";
import mkcert from "vite-plugin-mkcert";

export default defineConfig({
	base: "./",
	plugins: env.USE_HTTPS ? [preact(), mkcert()] : [preact()],
	build: {
		rollupOptions: {
			output: {
				dir: path.resolve(__dirname, "dist"),
				entryFileNames: "[name].js",
				assetFileNames: "asset/[name].[ext]",
				chunkFileNames: "[name].chunk.js",
				manualChunks: undefined,
			},
		},
	},
});
