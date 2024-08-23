import preact from "@preact/preset-vite";
import path from "path";
import { defineConfig } from "vite";
// install vite-plugin-singlefile if webpack build is too slow/impossible

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
