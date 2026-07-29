import assert from "node:assert/strict";
import { access, readFile, readdir } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);
const { isPublishedCase, projectCases, publishedCases } = await import(
  new URL("../app/cases.ts", import.meta.url)
);
const siteConfig = JSON.parse(
  await readFile(new URL("site.config.json", root), "utf8"),
);

const requiredCaseFields = [
  "id",
  "order",
  "period",
  "title",
  "role",
  "question",
  "problem",
  "result",
  "limitation",
];

async function render(path = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${path}`);
  const { default: serverHandler } = await import(workerUrl.href);

  const request = new Request(`http://localhost${path}`, {
    headers: { accept: "text/html" },
  });
  const executionContext = {
    waitUntil() {},
    passThroughOnException() {},
  };
  return typeof serverHandler === "function"
    ? serverHandler(request, executionContext)
    : serverHandler.fetch(
        request,
        {
          ASSETS: {
            fetch: async () => new Response("Not found", { status: 404 }),
          },
        },
        executionContext,
      );
}

test("renders the personal journey and all three decision cases", async () => {
  const response = await render("/");
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /AI 做得越快/);
  assert.match(html, /PDF 翻譯/);
  assert.match(html, /畢業學分/);
  assert.match(html, /00981A/);
  assert.match(html, /決定停止/);
  assert.match(html, /目前限制/);
  assert.match(html, /正式畢業資格仍以學校與系所審核為準/);
  assert.match(html, /每天都要自己找資料、拉表格/);
  assert.match(html, /AI 可以執行/);
  assert.match(html, /你真正想解決的是/);
  assert.match(html, /<html[^>]+lang="zh-Hant-TW"/);
  assert.match(
    html,
    /<link rel="canonical" href="https:\/\/sapphirejimmy-0713aiexchange\.static\.hf\.space\/"/,
  );
  assert.match(html, /<meta property="og:image:width" content="1731"/);
  assert.match(html, /<meta property="og:image:height" content="909"/);
  assert.doesNotMatch(html, /Codex is working|Your site is taking shape/);
});

test("validates case publication states and required content", () => {
  assert.equal(projectCases.length, 3);
  assert.equal(publishedCases.length, 3);
  assert.equal(isPublishedCase({ status: "published" }), true);
  for (const status of ["draft", "hidden", "needs-assets"]) {
    assert.equal(isPublishedCase({ status }), false);
  }

  for (const project of publishedCases) {
    for (const field of requiredCaseFields) {
      assert.equal(
        typeof project[field],
        "string",
        `${project.id}.${field} must be a string`,
      );
      assert.notEqual(
        project[field].trim(),
        "",
        `${project.id}.${field} must not be empty`,
      );
    }
    assert.ok(project.aiWork.length > 0, `${project.id}.aiWork is required`);
    assert.ok(project.humanWork.length > 0, `${project.id}.humanWork is required`);
  }
});

test("does not load either external Space before explicit consent", async () => {
  const response = await render("/");
  const html = await response.text();

  assert.match(html, /我了解風險，載入外部 Demo/);
  assert.match(html, /帳號、密碼、成績單與修課資料會傳送到 Hugging Face Space 伺服器處理/);
  assert.match(html, /計算結果可能有分類錯誤/);
  assert.match(html, /載入完整學期作品集/);
  assert.match(html, /建議使用桌機開啟/);
  assert.doesNotMatch(html, /<iframe\b/i);
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
  assert.match(html, /href="\/tempo"/);
  assert.doesNotMatch(html, /href="\/tempo\.html"/);

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
  assert.match(html, /href="\/lab"/);
});

test("exports clean routes, compatibility aliases, and discovery files", async () => {
  const paths = [
    "hf-static-output/index.html",
    "hf-static-output/lab/index.html",
    "hf-static-output/lab.html",
    "hf-static-output/tempo/index.html",
    "hf-static-output/tempo.html",
    "hf-static-output/robots.txt",
    "hf-static-output/sitemap.xml",
    "hf-static-output/site.webmanifest",
    "hf-static-output/README.md",
  ];
  await Promise.all(paths.map((path) => access(new URL(path, root))));

  const spaceReadme = await readFile(
    new URL("hf-static-output/README.md", root),
    "utf8",
  );
  assert.match(spaceReadme, /^---\r?\ntitle: 0731 AI 分享/m);
  assert.match(spaceReadme, /\nsdk: static\r?\n/);
  assert.match(spaceReadme, /\napp_file: index\.html\r?\n/);
});

test("uses configured canonical routes and valid internal static links", async () => {
  assert.deepEqual(siteConfig.routes, {
    home: "/",
    lab: "/lab",
    tempo: "/tempo",
    labAlias: "/lab.html",
    tempoAlias: "/tempo.html",
  });

  const htmlFiles = [
    "hf-static-output/index.html",
    "hf-static-output/lab/index.html",
    "hf-static-output/tempo/index.html",
  ];
  for (const htmlFile of htmlFiles) {
    const html = await readFile(new URL(htmlFile, root), "utf8");
    const urls = [
      ...html.matchAll(/\b(?:href|src)="([^"]+)"/g),
    ].map((match) => match[1]);

    for (const value of urls) {
      if (
        !value.startsWith("/") ||
        value.startsWith("//") ||
        value.startsWith("/_next/")
      ) {
        continue;
      }
      const pathname = decodeURIComponent(new URL(value, "https://site.test").pathname);
      const destination =
        pathname === "/"
          ? "hf-static-output/index.html"
          : pathname === "/lab" || pathname === "/tempo"
            ? `hf-static-output${pathname}/index.html`
            : `hf-static-output${pathname}`;
      await access(new URL(destination.replaceAll("\\", "/"), root));
    }
  }
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
    "public/tempo/tempo-codex-public.png",
    "public/tempo/tempo-antigravity-public.png",
    "docs/qa-screenshots/home-desktop.png",
    "docs/qa-screenshots/home-mobile.png",
    "docs/qa-screenshots/credit-case.png",
    "docs/qa-screenshots/presenter-mode.png",
    "docs/qa-screenshots/idea-canvas.png",
    "docs/qa-screenshots/lab-interactions.png",
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

test("keeps private notes and common credential or local-path formats out of public source", async () => {
  const directories = ["app", "public", "scripts"];
  const files = [];
  for (const directory of directories) {
    const entries = await readdir(new URL(`${directory}/`, root), {
      recursive: true,
      withFileTypes: true,
    });
    for (const entry of entries) {
      if (!entry.isFile()) continue;
      const path = `${entry.parentPath}\\${entry.name}`;
      if (/\.(?:png|jpe?g|xlsx|pdf|zip)$/i.test(path)) continue;
      files.push(path);
    }
  }
  files.push(new URL("site.config.json", root), new URL("README.md", root));

  const content = (
    await Promise.all(files.map((path) => readFile(path, "utf8")))
  ).join("\n");
  const secretPatterns = [
    /hf_[A-Za-z0-9]{20,}/,
    /am_(?:us|eu)_[A-Za-z0-9]{20,}/,
    /sk-(?:proj-)?[A-Za-z0-9_-]{20,}/,
    /gh[pousr]_[A-Za-z0-9]{20,}/,
    /github_pat_[A-Za-z0-9_]{20,}/,
    /(?:OPENAI_API_KEY|HF_TOKEN|HUGGING_FACE_HUB_TOKEN|GITHUB_TOKEN|AGENTMAIL_API_KEY|API_KEY|PASSWORD|SECRET)\s*=\s*[^\s"'<>]{8,}/i,
    /Authorization\s*[:=]\s*["']?(?:Bearer|Basic)\s+[A-Za-z0-9+/_=-]{12,}/i,
    /Cookie\s*[:=]\s*["']?[A-Za-z0-9_.-]+=[^;\s"']+/i,
    /C:\\Users\\[^\\\s"'<>]+/i,
    /\b[A-Za-z]\d{8}\b/,
  ];
  for (const pattern of secretPatterns) {
    assert.doesNotMatch(content, pattern);
  }

  const emails = content.match(
    /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/gi,
  ) ?? [];
  assert.deepEqual([...new Set(emails)], [siteConfig.contactEmail]);
  assert.doesNotMatch(content, /presenter-notes/i);

  const outputEntries = await readdir(new URL("hf-static-output/", root), {
    recursive: true,
    withFileTypes: true,
  });
  const outputFiles = outputEntries
    .filter((entry) => entry.isFile())
    .map((entry) => `${entry.parentPath}\\${entry.name}`)
    .filter((path) => !/\.(?:png|jpe?g|xlsx|pdf|zip|woff2?)$/i.test(path));
  const publicOutput = (
    await Promise.all(outputFiles.map((path) => readFile(path, "utf8")))
  ).join("\n");
  for (const pattern of secretPatterns) {
    assert.doesNotMatch(publicOutput, pattern);
  }
  assert.doesNotMatch(
    publicOutput,
    /presenter-notes|private-do-not-publish/i,
  );
  const outputEmails = publicOutput.match(
    /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/gi,
  ) ?? [];
  assert.deepEqual([...new Set(outputEmails)], [siteConfig.contactEmail]);

  await assert.rejects(access(new URL("hf-static-output/content-input/", root)));
});

test("contains no unresolved prompts, placeholders, or unsupported safety claims", async () => {
  const publicFiles = [
    "app/page.tsx",
    "app/cases.ts",
    "app/lab/page.tsx",
    "app/tempo/page.tsx",
    "README.md",
  ];
  const content = (
    await Promise.all(
      publicFiles.map((path) => readFile(new URL(path, root), "utf8")),
    )
  ).join("\n");

  assert.doesNotMatch(content, /【請填寫】|TODO|FIXME/);
  assert.doesNotMatch(content, /百分之百正確|完全不需要人工|保證節省/);
  assert.doesNotMatch(content, /本機處理不上傳到雲端|完全安全/);
  assert.match(content, /尚未經教務處認證/);
  assert.match(content, /正式畢業資格仍以學校與系所審核為準/);
  assert.match(content, /不是即時投資資訊，也不構成投資建議/);
});

test("ships accessibility and motion safeguards in the design system", async () => {
  const css = await readFile(new URL("app/globals.css", root), "utf8");
  const showcase = await readFile(
    new URL("app/components/ArtifactShowcase.tsx", root),
    "utf8",
  );
  assert.match(css, /:focus-visible/);
  assert.match(css, /prefers-reduced-motion:\s*reduce/);
  assert.match(showcase, /role="dialog"/);
  assert.match(showcase, /aria-modal="true"/);
  assert.match(showcase, /event\.key === "Escape"/);
});
