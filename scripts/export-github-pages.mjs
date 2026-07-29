import { cp, mkdir, readFile, readdir, rm, writeFile } from "node:fs/promises";
import { extname, resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const source = resolve(root, "hf-static-output");
const output = resolve(root, "github-pages-output");
const repositoryName =
  process.env.PAGES_REPOSITORY_NAME ??
  process.env.GITHUB_REPOSITORY?.split("/").at(-1) ??
  "0731AIExchange";
const basePath = `/${repositoryName.replace(/^\/+|\/+$/g, "")}`;

const pathStarts = [
  "assets/",
  "case/",
  "downloads/",
  "tempo/",
  "process",
  "lab",
  "tempo",
  "favicon.svg",
  "site.webmanifest",
  "og.png",
  "robots.txt",
  "sitemap.xml",
  "file.svg",
  "globe.svg",
  "window.svg",
];
const rootPath = new RegExp(
  `(^|[^A-Za-z0-9.:/_-])\\/(?=(?:${pathStarts
    .map((value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
    .join("|")}))`,
  "gm",
);
const bareBuildAssetPath =
  /(["'`])(?=(?:assets|case|downloads|tempo)\/)/g;

function rewriteForProjectPages(content, extension) {
  let rewritten = content.replace(
    rootPath,
    (_match, prefix) => `${prefix}${basePath}/`,
  );
  rewritten = rewritten.replace(
    bareBuildAssetPath,
    (_match, quote) => `${quote}${basePath.slice(1)}/`,
  );

  rewritten = rewritten
    .replaceAll('href="/"', `href="${basePath}/"`)
    .replaceAll("home:`/`", `home:\`${basePath}/\``)
    .replace(
      /("start_url"\s*:\s*)"\/"/g,
      `$1"${basePath}/"`,
    )
    .replace(
      /("scope"\s*:\s*)"\/"/g,
      `$1"${basePath}/"`,
    );

  if (extension === ".css") {
    rewritten = rewritten.replace(
      /url\((["']?)\/(?!(?:\/|0731AIExchange\/))/g,
      `url($1${basePath}/`,
    );
  }

  return rewritten;
}

async function collectFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const path = resolve(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await collectFiles(path)));
    } else if (entry.isFile()) {
      files.push(path);
    }
  }
  return files;
}

await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });
await cp(source, output, { recursive: true });

const textExtensions = new Set([
  ".css",
  ".html",
  ".js",
  ".json",
  ".webmanifest",
]);
const files = await collectFiles(output);
for (const file of files) {
  const extension = extname(file);
  if (!textExtensions.has(extension)) continue;
  const content = await readFile(file, "utf8");
  const rewritten = rewriteForProjectPages(content, extension);
  if (rewritten !== content) {
    await writeFile(file, rewritten, "utf8");
  }
}

const indexHtml = await readFile(resolve(output, "index.html"), "utf8");
await writeFile(resolve(output, "404.html"), indexHtml, "utf8");
await writeFile(resolve(output, ".nojekyll"), "", "utf8");

console.log(`GitHub Pages export ready: ${output}`);
console.log(`Project base path: ${basePath}/`);
