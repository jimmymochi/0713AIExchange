import { cp, mkdir, rm, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";

const root = resolve(import.meta.dirname, "..");
const output = resolve(root, "hf-static-output");
const client = resolve(root, "dist", "client");
const workerUrl = pathToFileURL(resolve(root, "dist", "server", "index.js"));
workerUrl.searchParams.set("static-export", Date.now().toString());

await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });
await cp(client, output, { recursive: true });

const { default: worker } = await import(workerUrl.href);
const assets = {
  fetch: async () => new Response("Not found", { status: 404 }),
};
const executionContext = {
  waitUntil() {},
  passThroughOnException() {},
};

async function exportRoute(route, destination) {
  const response = await worker.fetch(
    new Request(`https://sapphirejimmy-0713aiexchange.static.hf.space${route}`, {
      headers: { accept: "text/html" },
    }),
    { ASSETS: assets },
    executionContext,
  );
  if (!response.ok) {
    throw new Error(`Failed to render ${route}: ${response.status}`);
  }
  const file = resolve(output, destination);
  await mkdir(resolve(file, ".."), { recursive: true });
  await writeFile(file, await response.text(), "utf8");
}

await exportRoute("/", "index.html");
await exportRoute("/lab", "lab.html");
await exportRoute("/tempo", "tempo.html");

await writeFile(
  resolve(output, "README.md"),
  `---
title: 0731 AI 分享
emoji: ⚡
colorFrom: yellow
colorTo: purple
sdk: static
app_file: index.html
pinned: false
---

# 0731 AI 分享

Antigravity CLI、OpenAI Codex、Skills 與 00981A 自動化工作流的高互動繁體中文教學網站。

- 捲動式故事首頁
- 安全的引導式 CLI 模擬
- 00981A 失敗／修正工作流
- Excel、PDF 與 AgentMail 成果展示
- 可追溯來源的 CLI 與 Codex Skills
`,
  "utf8",
);

console.log(`Static export ready: ${output}`);
