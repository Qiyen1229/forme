// Copies the static export (./out) into ../frontend, which Nginx mounts.
// Only the contents of ../frontend are replaced; nothing else is touched.
import { cp, mkdir, readdir, rm, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const src = path.join(root, "out");
const dest = path.resolve(root, "..", "frontend");

try {
  await stat(src);
} catch {
  console.error("✖ ./out not found — run `next build` first (npm run export does both).");
  process.exit(1);
}

await mkdir(dest, { recursive: true });
for (const entry of await readdir(dest)) {
  if (entry === ".gitkeep") continue;
  await rm(path.join(dest, entry), { recursive: true, force: true });
}
await cp(src, dest, { recursive: true });
console.log(`✔ Exported static site → ${dest}`);
