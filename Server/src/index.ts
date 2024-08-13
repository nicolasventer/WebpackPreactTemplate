import { closeSync, fstatSync, openSync, readdirSync, watchFile } from "fs";
import path from "path";
import Watcher from "watcher";

const CLIENT_PATH = path.join(__dirname, "../../Client");
const DIST_PATH = path.join(CLIENT_PATH, "dist");
const PAGE_PATH = path.join(CLIENT_PATH, "page.html");

const distFiles = readdirSync(DIST_PATH, { withFileTypes: true, recursive: true }).map((file) =>
	path.join(file.parentPath, file.name)
);
const pageFile = PAGE_PATH;

const files = [pageFile, ...distFiles];

const filesContent = await (async () => {
	const result = {} as Record<string, string>;
	await Promise.all(files.map(async (file) => (result[file] = await Bun.file(file).text())));
	return result;
})();

const filesStatSize = await (async () => {
	const result = {} as Record<string, number>;
	await Promise.all(
		files.map(async (file) => {
			const path_fd = openSync(file, "r");
			const path_stat = fstatSync(path_fd);
			closeSync(path_fd);
			result[file] = path_stat.size;
		})
	);
	return result;
})();

const watcher = new Watcher(DIST_PATH, { recursive: true, native: true });

const updateFile = (filename: string) => {
	const oldSize = filesStatSize[filename];
	const path_fd = openSync(filename, "r");
	const path_stat = fstatSync(path_fd);
	closeSync(path_fd);
	const newSize = path_stat.size;
	if (oldSize === newSize) return;
	filesStatSize[filename] = newSize;
	Bun.file(filename)
		.text()
		.then((content) => (filesContent[filename] = content));
	console.log("File updated:", filename);
};

const deleteFile = (filename: string) => {
	delete filesContent[filename];
	delete filesStatSize[filename];
	console.log("File deleted:", filename);
};

watcher.on("add", updateFile);
watcher.on("change", updateFile);
watcher.on("rename", deleteFile);
watcher.on("unlink", deleteFile);

watchFile(pageFile, (curr, prev) => {
	if (curr.size === prev.size) return;
	Bun.file(pageFile)
		.text()
		.then((content) => (filesContent[pageFile] = content));
	console.log("Page file updated:", pageFile);
});

const mimeTypes = {
	".html": "text/html",
	".css": "text/css",
	".js": "application/javascript",
	".json": "application/json",
	".png": "image/png",
	".jpg": "image/jpeg",
	".jpeg": "image/jpeg",
	".gif": "image/gif",
	".svg": "image/svg+xml",
	".ico": "image/x-icon",
};

const getMimeType = (filename: string) => {
	for (const ext in mimeTypes) if (filename.endsWith(ext)) return mimeTypes[ext as keyof typeof mimeTypes];
	return "text/plain";
};

Bun.serve({
	port: 3000,
	fetch(req) {
		const url = new URL(req.url);
		const pathname = url.pathname === "/" ? "/page.html" : url.pathname;
		const joinedPath = path.join(CLIENT_PATH, pathname);
		console.log("joinedPath:", joinedPath);
		if (files.includes(joinedPath))
			return new Response(filesContent[joinedPath], { headers: { "Content-Type": getMimeType(joinedPath) } });
		return new Response(`${url.pathname} not found`, { status: 404 });
	},
});

console.log("Server started on http://localhost:3000");
