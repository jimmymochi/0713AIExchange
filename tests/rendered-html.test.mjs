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
  assert.match(html, /AI 不只回答/);
  assert.match(html, /PDF 翻譯/);
  assert.match(html, /畢業學分/);
  assert.match(html, /00981A/);
  assert.match(html, /決定停止/);
  assert.match(html, /目前限制/);
  assert.match(html, /正式畢業資格仍以學校與系所審核為準/);
  assert.match(html, /每天都要自己找資料、拉表格/);
  assert.match(html, /AI 可以執行/);
  assert.match(html, /你真正想解決的是/);
  assert.match(html, /不用作答 · 先想 30 秒/);
  assert.match(html, /第一個浮現在腦中的問題/);
  assert.match(html, /href="\/process\.html"/);
  assert.match(html, /href="\/lab\.html"/);
  assert.match(html, /href="\/tempo\.html"/);
  assert.doesNotMatch(html, /href="\/(?:process|lab|tempo)"/);
  assert.doesNotMatch(html, /<textarea\b|<input\b/i);
  assert.doesNotMatch(html, /複製我的問題畫布|清除內容/);
  assert.match(html, /<html[^>]+lang="zh-Hant-TW"/);
  assert.match(
    html,
    /<link rel="canonical" href="https:\/\/sapphirejimmy-0713aiexchange\.static\.hf\.space\/"/,
  );
  assert.match(html, /<meta property="og:image:width" content="1734"/);
  assert.match(html, /<meta property="og:image:height" content="907"/);
  assert.doesNotMatch(html, /Codex is working|Your site is taking shape/);
});

test("renders the production ideas, actual tools, and build outputs", async () => {
  const response = await render("/process");
  assert.equal(response.status, 200);

  const html = await response.text();
  assert.match(html, /這個網站/);
  assert.match(html, /怎麼一步一步做出來/);
  assert.match(html, /先決定怎麼說/);
  assert.match(html, /先講人的判斷/);
  assert.match(html, /案例不平均分配/);
  assert.match(html, /我爸每天都要找資料、拉表格/);
  assert.match(html, /互動只做現場需要的事/);
  assert.match(html, /每個工具/);
  assert.match(html, /都有明確任務/);
  assert.match(html, /Entry not found/);
  assert.match(html, /Grill Me/);
  assert.match(html, /Codex Desktop/);
  assert.match(html, /GitHub Actions/);
  assert.match(html, /Antigravity CLI/);
  assert.match(html, /是網站介紹的內容，不等於這次全部都有拿來建站/);
  assert.match(html, /Playwright/);
  assert.match(html, /Hugging Face Static Space/);
  assert.match(html, /完整決策與驗證脈絡/);
  assert.match(
    html,
    /<link rel="canonical" href="https:\/\/sapphirejimmy-0713aiexchange\.static\.hf\.space\/process\.html"/,
  );
  assert.doesNotMatch(html, /href="\/process"/);
  assert.doesNotMatch(html, /<textarea\b|<input\b/i);
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
  assert.match(
    html,
    /<link rel="canonical" href="https:\/\/sapphirejimmy-0713aiexchange\.static\.hf\.space\/lab\.html"/,
  );
  assert.match(html, /href="\/tempo\.html"/);
  assert.doesNotMatch(html, /href="\/tempo"/);

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
  assert.match(html, /class="tempo-route-progress"/);
  assert.match(html, /class="tempo-route-dot"/);
  assert.match(html, /4 TOOLS CONNECTED/);
  assert.match(html, /role="img"/);
  assert.match(html, /終端機、檔案、Git 與 AI 工作階段串進同一個工作區/);
  assert.match(
    html,
    /<link rel="canonical" href="https:\/\/sapphirejimmy-0713aiexchange\.static\.hf\.space\/tempo\.html"/,
  );
  assert.match(html, /href="\/lab\.html"/);
  assert.doesNotMatch(html, /href="\/lab"/);
});

test("exports clean routes, compatibility aliases, and discovery files", async () => {
  const paths = [
    "hf-static-output/index.html",
    "hf-static-output/process/index.html",
    "hf-static-output/process.html",
    "hf-static-output/lab/index.html",
    "hf-static-output/lab.html",
    "hf-static-output/tempo/index.html",
    "hf-static-output/tempo.html",
    "hf-static-output/robots.txt",
    "hf-static-output/sitemap.xml",
    "hf-static-output/site.webmanifest",
    "hf-static-output/_headers",
    "hf-static-output/README.md",
  ];
  await Promise.all(paths.map((path) => access(new URL(path, root))));

  const spaceReadme = await readFile(
    new URL("hf-static-output/README.md", root),
    "utf8",
  );
  assert.match(spaceReadme, /^---\r?\ntitle: 0731AIExchange/m);
  assert.match(spaceReadme, /^# 0731AIExchange$/m);
  assert.match(spaceReadme, /\ncolorFrom: gray\r?\ncolorTo: gray\r?\n/);
  assert.match(spaceReadme, /\nsdk: static\r?\n/);
  assert.match(spaceReadme, /\napp_file: index\.html\r?\n/);
  assert.match(spaceReadme, /不蒐集輸入的現場引導提問/);
  assert.doesNotMatch(spaceReadme, /驗證畫布/);

  const staticHeaders = await readFile(
    new URL("hf-static-output/_headers", root),
    "utf8",
  );
  assert.match(staticHeaders, /\/assets\/\*/);
  assert.match(staticHeaders, /max-age=31536000, immutable/);

  const sitemap = await readFile(
    new URL("hf-static-output/sitemap.xml", root),
    "utf8",
  );
  assert.match(sitemap, /\/lab\.html<\/loc>/);
  assert.match(sitemap, /\/tempo\.html<\/loc>/);
  assert.match(sitemap, /\/process\.html<\/loc>/);
  assert.doesNotMatch(sitemap, /\/(?:process|lab|tempo)<\/loc>/);
});

test("exports a GitHub Pages artifact with the repository base path", async () => {
  const paths = [
    "github-pages-output/index.html",
    "github-pages-output/404.html",
    "github-pages-output/.nojekyll",
    "github-pages-output/process.html",
    "github-pages-output/process/index.html",
    "github-pages-output/lab.html",
    "github-pages-output/lab/index.html",
    "github-pages-output/tempo.html",
    "github-pages-output/tempo/index.html",
  ];
  await Promise.all(paths.map((path) => access(new URL(path, root))));

  const pagesBase = "/0731AIExchange";
  const htmlFiles = [
    "github-pages-output/index.html",
    "github-pages-output/process.html",
    "github-pages-output/lab.html",
    "github-pages-output/tempo.html",
  ];
  for (const htmlFile of htmlFiles) {
    const html = await readFile(new URL(htmlFile, root), "utf8");
    const rootUrls = [...html.matchAll(/\b(?:href|src)="(\/[^"]*)"/g)].map(
      (match) => match[1],
    );
    assert.ok(rootUrls.length > 0, `${htmlFile} must contain internal URLs`);
    for (const value of rootUrls) {
      assert.ok(
        value === `${pagesBase}/` || value.startsWith(`${pagesBase}/`),
        `${htmlFile} contains an unprefixed URL: ${value}`,
      );
      const pathname = decodeURIComponent(
        new URL(value, "https://jimmymochi.github.io").pathname,
      );
      const relativePath = pathname.slice(pagesBase.length);
      const destination =
        relativePath === "/"
          ? "github-pages-output/index.html"
          : `github-pages-output${relativePath}`;
      await access(new URL(destination.replaceAll("\\", "/"), root));
    }
  }

  const pagesHome = await readFile(
    new URL("github-pages-output/index.html", root),
    "utf8",
  );
  assert.match(pagesHome, /href="\/0731AIExchange\/process\.html"/);
  assert.match(pagesHome, /href="\/0731AIExchange\/lab\.html"/);
  assert.match(pagesHome, /href="\/0731AIExchange\/tempo\.html"/);
  assert.match(pagesHome, /(?:href|src)="\/0731AIExchange\/assets\//);

  const manifest = await readFile(
    new URL("github-pages-output/site.webmanifest", root),
    "utf8",
  );
  assert.match(manifest, /"start_url":\s*"\/0731AIExchange\/"/);

  const assetNames = await readdir(new URL("github-pages-output/assets/", root));
  const siteBundle = assetNames.find(
    (name) => name.startsWith("site-") && name.endsWith(".js"),
  );
  assert.ok(siteBundle, "GitHub Pages site bundle must exist");
  const siteBundleContent = await readFile(
    new URL(`github-pages-output/assets/${siteBundle}`, root),
    "utf8",
  );
  assert.match(siteBundleContent, /home:`\/0731AIExchange\/`/);
  assert.match(
    siteBundleContent,
    /processAlias:`\/0731AIExchange\/process\.html`/,
  );
  assert.match(siteBundleContent, /labAlias:`\/0731AIExchange\/lab\.html`/);
  assert.match(siteBundleContent, /tempoAlias:`\/0731AIExchange\/tempo\.html`/);

  const workflow = await readFile(
    new URL(".github/workflows/deploy-pages.yml", root),
    "utf8",
  );
  assert.match(workflow, /actions\/configure-pages@v5/);
  assert.match(workflow, /actions\/upload-pages-artifact@v4/);
  assert.match(workflow, /actions\/deploy-pages@v4/);
  assert.match(workflow, /pages:\s*write/);
  assert.match(workflow, /id-token:\s*write/);
});

test("uses configured canonical routes and valid internal static links", async () => {
  assert.deepEqual(siteConfig.routes, {
    home: "/",
    process: "/process",
    lab: "/lab",
    tempo: "/tempo",
    processAlias: "/process.html",
    labAlias: "/lab.html",
    tempoAlias: "/tempo.html",
  });

  const htmlFiles = [
    "hf-static-output/index.html",
    "hf-static-output/process/index.html",
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
          : ["/process", "/lab", "/tempo"].includes(pathname)
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
    "docs/qa-screenshots/question-prompt.png",
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
    "app/process/page.tsx",
    "app/process-data.ts",
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
  assert.match(css, /@keyframes tempo-route-tour/);
  assert.match(css, /@keyframes tempo-node-focus/);
  assert.match(css, /\.tempo-route,\s*\.tempo-route-dot\s*\{\s*display:\s*none/);
  assert.match(showcase, /role="dialog"/);
  assert.match(showcase, /aria-modal="true"/);
  assert.match(showcase, /event\.key === "Escape"/);
});
