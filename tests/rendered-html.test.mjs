import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);

async function render(path = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${path}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${path}`, {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("renders the story homepage with the real workflow and artifact viewer", async () => {
  const response = await render("/");
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /0731 AI 分享/);
  assert.match(html, /AI 不只回答/);
  assert.match(html, /晚上 6:30/);
  assert.match(html, /00981A/);
  assert.match(html, /修正後成功流程/);
  assert.match(html, /Excel \/ 2 sheets/);
  assert.match(html, /PDF \/ 3 pages/);
  assert.doesNotMatch(html, /Codex is working|Your site is taking shape/);
});

test("renders the tutorial with guided terminal and traceable skills", async () => {
  const response = await render("/lab");
  assert.equal(response.status, 200);

  const html = await response.text();
  assert.match(html, /60 MINUTE FIELD LAB/);
  assert.match(html, /GUIDED TERMINAL/);
  assert.match(html, /安全沙盒/);
  assert.match(html, /url-summarizer/);
  assert.match(html, /playwright-mcp/);
  assert.match(html, /Codex/);
  assert.match(html, /Jimmy 客製/);
  assert.match(html, /TempoTerm/);
  assert.match(html, /\/tempo\.html/);

  const skillSource = await readFile(new URL("app/data.ts", root), "utf8");
  assert.match(skillSource, /Grill Me/);
  assert.match(skillSource, /LLM Council/);
  assert.match(skillSource, /Code Review Graph/);
});

test("renders the TempoTerm guide with a terminal-first recommendation", async () => {
  const response = await render("/tempo");
  assert.equal(response.status, 200);

  const html = await response.text();
  assert.match(html, /先學會/);
  assert.match(html, /原生終端機/);
  assert.match(html, /Codex CLI/);
  assert.match(html, /Antigravity CLI/);
  assert.match(html, /mukiwu\/tempo-term/);
  assert.match(html, /Apache-2\.0/);
});

test("ships all case-study assets and complete spreadsheet data", async () => {
  const assetPaths = [
    "public/case/00981a-email-redacted.png",
    "public/case/00981a-report-page-1.jpg",
    "public/case/00981a-report-page-2.jpg",
    "public/case/00981a-report-page-3.jpg",
    "public/downloads/20260728_00981A持股分析.xlsx",
    "public/downloads/20260728_00981A持股分析.pdf",
    "public/downloads/url-summarizer-jimmy-custom.zip",
    "public/downloads/markdown-to-pdf-jimmy-custom.zip",
    "public/downloads/self-improving-jimmy-custom.zip",
    "public/tempo/tempo-codex.png",
    "public/tempo/tempo-antigravity-redacted.png",
  ];
  await Promise.all(assetPaths.map((path) => access(new URL(path, root))));

  const data = JSON.parse(
    await readFile(new URL("public/case/excel-data.json", root), "utf8"),
  );
  assert.equal(data.sheets.length, 2);
  assert.equal(data.sheets[0].name, "持股變動分析報告");
  assert.equal(data.sheets[0].rows.length, 89);
  assert.equal(data.sheets[1].name, "今日完整持股明細");
  assert.equal(data.sheets[1].rows.length, 52);
});

test("does not embed common credential formats in source or generated data", async () => {
  const files = [
    "app/data.ts",
    "app/page.tsx",
    "app/lab/page.tsx",
    "app/tempo/page.tsx",
    "public/case/excel-data.json",
  ];
  const content = (
    await Promise.all(files.map((path) => readFile(new URL(path, root), "utf8")))
  ).join("\n");
  assert.doesNotMatch(content, /hf_[A-Za-z0-9]{20,}/);
  assert.doesNotMatch(content, /am_(?:us|eu)_[A-Za-z0-9]{20,}/);
  assert.doesNotMatch(content, /sk-[A-Za-z0-9_-]{20,}/);
});
