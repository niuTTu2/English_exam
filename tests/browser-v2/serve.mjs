import { createServer } from "vite";
import { fileURLToPath } from "node:url";
import { readFile } from "node:fs/promises";
const root = fileURLToPath(new URL("../..", import.meta.url));
// Templates are deliberately not *.html: unrelated SSR tests must not auto-scan this harness.
const server = await createServer({ root, configFile: false, resolve: { alias: { "@": root } },
  plugins: [{ name: "synthetic-v2-pages", configureServer(server) {
    server.middlewares.use(async (request, response, next) => {
      const path = request.url?.split("?")[0];
      if (!["/tests/browser-v2/index.html", "/tests/browser-v2/widths.html"].includes(path)) return next();
      try {
        const html = await readFile(`${root}${path}.template`, "utf8");
        response.setHeader("Content-Type", "text/html; charset=utf-8");
        response.end(await server.transformIndexHtml(path, html));
      } catch (error) { next(error); }
    });
  } }], server: { host: "127.0.0.1", port: 5174, strictPort: true }, optimizeDeps: { noDiscovery: true } });
await server.listen();
console.log("Synthetic V2 browser harness: http://127.0.0.1:5174/tests/browser-v2/widths.html");
