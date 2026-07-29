import { cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";

const root = resolve(import.meta.dirname, "..");
const output = resolve(root, "hf-static-output");
const client = resolve(root, "dist", "client");
const workerUrl = pathToFileURL(resolve(root, "dist", "server", "index.js"));
workerUrl.searchParams.set("static-export", Date.now().toString());
const config = JSON.parse(
  await readFile(resolve(root, "site.config.json"), "utf8"),
);

await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });
await cp(client, output, { recursive: true });

const { default: serverHandler } = await import(workerUrl.href);
const executionContext = {
  waitUntil() {},
  passThroughOnException() {},
};

async function exportRoute(route, destination) {
  const request = new Request(new URL(route, config.canonicalUrl), {
    headers: { accept: "text/html" },
  });
  const response =
    typeof serverHandler === "function"
      ? await serverHandler(request, executionContext)
      : await serverHandler.fetch(
          request,
          {
            ASSETS: {
              fetch: async () => new Response("Not found", { status: 404 }),
            },
          },
          executionContext,
        );
  if (!response.ok) {
    throw new Error(`Failed to render ${route}: ${response.status}`);
  }
  const file = resolve(output, destination);
  await mkdir(resolve(file, ".."), { recursive: true });
  await writeFile(file, await response.text(), "utf8");
}

await exportRoute(config.routes.home, "index.html");
await exportRoute(config.routes.process, "process/index.html");
await exportRoute(config.routes.process, "process.html");
await exportRoute(config.routes.lab, "lab/index.html");
await exportRoute(config.routes.lab, "lab.html");
await exportRoute(config.routes.tempo, "tempo/index.html");
await exportRoute(config.routes.tempo, "tempo.html");

await writeFile(
  resolve(output, "README.md"),
  `---
title: ${config.name}
emoji: ⚡
colorFrom: gray
colorTo: gray
sdk: static
app_file: index.html
pinned: false
---

# ${config.name}

從 PDF 翻譯、畢業學分到 00981A 自動化，整理 Jimmy 如何發現問題、做出原型、驗證成果，並判斷什麼值得繼續。

- 三個 AI 實作案例與個人歷程
- 從需求訪談、討論決策到部署驗證的網站製作紀錄
- 不蒐集輸入的現場引導提問
- Antigravity CLI、OpenAI Codex、Skills 與 TempoTerm 教學
- 可檢查的 00981A 工作流快照
`,
  "utf8",
);

console.log(`Static export ready: ${output}`);
