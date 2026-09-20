// Local-only inspection of the actual application, including its API and SW.
// This entry is never imported by the application or a production build.
import { createServer } from "vite";
import { fileURLToPath } from "node:url";
import { readFile } from "node:fs/promises";

const root = fileURLToPath(new URL("../..", import.meta.url));
const server = await createServer({
  root,
  configFile: `${root}/vite.config.ts`,
  plugins: [{
    name: "local-v2-pilot-inspection",
    enforce: "pre",
    configureServer(server) {
      server.middlewares.use(async (request, response, next) => {
        if (request.url?.split("?")[0] !== "/__v2-inspection") return next();
        try {
          const html = await readFile(new URL("./pilot-widths.html.template", import.meta.url), "utf8");
          response.setHeader("Content-Type", "text/html; charset=utf-8");
          response.setHeader("Cache-Control", "no-store");
          response.end(html);
        } catch (error) { next(error); }
      });
    },
  }],
  server: { host: "127.0.0.1", port: 5183, strictPort: true },
});
await server.listen();
console.log("V2 pilot inspection: http://127.0.0.1:5183/__v2-inspection");
console.log("Full application / offline check: http://127.0.0.1:5183/");
console.log("Choose 2013 → 阅读 Text 1 in the application. Use only local test records.");
if (process.argv.includes("--smoke")) {
  try {
    for (const [path, expected] of [["/__v2-inspection", "2013 Text 1"], ["/", "<h1>真题句读</h1>"]]) {
      const response = await fetch(`http://127.0.0.1:5183${path}`, { signal: AbortSignal.timeout(60000) });
      const html = await response.text();
      if (!response.ok || !html.includes(expected)) throw new Error(`Unexpected response at ${path}: ${response.status}; ${html.slice(0, 500)}`);
      console.log(`HTTP smoke passed: ${path} (${response.status}, ${html.length} characters)`);
    }
  } finally { await server.close(); }
} else {
  for (const signal of ["SIGINT", "SIGTERM"]) {
    process.once(signal, async () => { await server.close(); process.exit(0); });
  }
}
