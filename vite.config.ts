import preact from "@preact/preset-vite";
import path from "path";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
	base: "./",
	plugins: [preact()],
	build: {
		rollupOptions: {
			output: {
				dir: path.resolve(__dirname, "dist"),
				entryFileNames: "[name].js",
				assetFileNames: "asset/[name].css",
				chunkFileNames: "[name].chunk.js",
				manualChunks: undefined,
			},
		},
	},
});
