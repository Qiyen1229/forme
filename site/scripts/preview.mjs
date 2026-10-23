// Zero-dependency static server for the exported site (mirrors what Nginx does).
//   npm run export && npm run preview   →  http://localhost:9177
import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import http from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, process.env.PREVIEW_DIR ?? "../out");
const port = Number(process.env.PORT ?? 9177);

const types = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".ico": "image/x-icon",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
  ".woff2": "font/woff2",
  ".woff": "font/woff",
};

async function resolveFile(urlPath) {
  const clean = path.normalize(decodeURIComponent(urlPath)).replace(/^(\.\.[/\\])+/, "");
  const target = path.join(root, clean);
  if (!target.startsWith(root)) return null;
  for (const candidate of [target, path.join(target, "index.html"), `${target}.html`]) {
    try {
      if ((await stat(candidate)).isFile()) return candidate;
    } catch {}
  }
  return null;
}

http
  .createServer(async (req, res) => {
    const { pathname } = new URL(req.url ?? "/", "http://localhost");
    let file = await resolveFile(pathname);
    let status = 200;
    if (!file) {
      file = await resolveFile("/404.html");
      status = 404;
    }
    if (!file) {
      res.writeHead(404).end("Not found");
      return;
    }
    res.writeHead(status, {
      "content-type":
        types[path.extname(file)] ?? (path.basename(file) === "opengraph-image" ? "image/png" : "application/octet-stream"),
      "cache-control": "no-cache",
    });
    createReadStream(file).pipe(res);
  })
  .listen(port, () => console.log(`▶ Preview: http://localhost:${port}  (serving ${root})`));
