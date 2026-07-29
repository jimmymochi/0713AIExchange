import type { Metadata } from "next";
import SiteNav from "../components/SiteNav";
import {
  buildIssues,
  buildStages,
  commitTrace,
  productionIdeas,
  toolGroups,
} from "../process-data";
import { siteConfig, siteUrl } from "../site";

export const metadata: Metadata = {
  title: "網站製作歷程｜我的製作想法與使用工具",
  description:
    "整理 0731 AI 分享網站的製作想法、實際使用工具、介面實作、測試部署與正式站問題修正。",
  alternates: {
    canonical: siteUrl(siteConfig.routes.processAlias),
  },
  openGraph: {
    title: `網站製作歷程｜${siteConfig.name}`,
    description:
      "Jimmy 如何決定網站要說什麼，並用哪些工具把想法做成可公開、可驗證的網站。",
    url: siteUrl(siteConfig.routes.processAlias),
  },
};

const processSections = [
  "process-top",
  "process-origin",
  "process-flow",
  "process-conversation",
  "process-issues",
  "process-tools",
  "process-proof",
  "process-closing",
];

export default function ProcessPage() {
  return (
    <>
      <SiteNav page="process" sectionIds={processSections} />
      <main className="process-page" id="main-content">
        <section className="process-hero story-section" id="process-top">
          <div className="process-hero-copy reveal">
            <p className="eyebrow">
              <span className="live-dot" />
              BUILD LOG / 2026.07.29
            </p>
            <h1>
              這個網站，
              <span>怎麼一步一步做出來。</span>
            </h1>
            <p>
              這裡不是逐字聊天紀錄。我整理的是自己怎麼決定網站要說什麼、
              用哪些工具把想法做成畫面，以及每一步最後留下了什麼。
            </p>
            <div className="process-hero-actions">
              <a className="button button-primary" href="#process-flow">
                從完整流程開始 <span>↓</span>
              </a>
              <a
                className="button button-secondary"
                href={siteConfig.repositoryUrl}
                target="_blank"
                rel="noreferrer"
              >
                查看 GitHub <span>↗</span>
              </a>
            </div>
          </div>
          <div className="process-runlog reveal" aria-label="網站製作狀態摘要">
            <div className="process-runlog-top">
              <span>PROJECT TRACE</span>
              <span>● SHIPPED</span>
            </div>
            <div className="process-runlog-title">
              <small>0731AIEXCHANGE / BUILD STORY</small>
              <strong>00 → 07</strong>
              <p>從原始任務到正式站回歸測試</p>
            </div>
            <ol>
              <li><span>01</span><strong>想法</strong><small>決定主線</small></li>
              <li><span>02</span><strong>工具</strong><small>各有任務</small></li>
              <li><span>03</span><strong>實作</strong><small>故事與介面</small></li>
              <li><span>04</span><strong>驗證</strong><small>正式站再測</small></li>
            </ol>
            <div className="process-runlog-lines" aria-hidden="true">
              <span>brief / facts / constraints</span>
              <span>build / export / inspect</span>
              <span>github / hugging-face / verify ✓</span>
            </div>
          </div>
        </section>

        <section className="process-origin story-section" id="process-origin">
          <div className="process-kicker reveal">
            <span className="section-index">01 / THE START</span>
            <p>最初不是從版型開始。</p>
          </div>
          <blockquote className="process-origin-quote reveal">
            <p>
              「AI 的能力正在快速普及。真正重要的是能否發現值得解決的問題、
              提出不同的想法、判斷什麼值得做，並設計可靠的驗證方式。」
            </p>
            <footer>Jimmy 在需求訪談中定下的核心主張</footer>
          </blockquote>
          <div className="process-origin-grid reveal">
            <article>
              <span>原始狀態</span>
              <h2>內容很多，主線還沒站穩。</h2>
              <p>
                原網站已經有 CLI、Codex、Skills 和 TempoTerm，也有三個個人案例。
                問題不是沒有內容，而是工具、故事、Demo、隱私與現場節奏同時擠在一起。
              </p>
            </article>
            <article>
              <span>第一個決定</span>
              <h2>先知道為什麼，再談用什麼。</h2>
              <p>
                首頁改講三次判斷；工具搬到獨立頁。每個新增功能都要回答：
                它幫觀眾理解了什麼，還是只是看起來很厲害？
              </p>
            </article>
          </div>
        </section>

        <section className="process-flow story-section" id="process-flow">
          <header className="process-section-heading reveal">
            <span className="section-index">02 / COMPLETE FLOW</span>
            <h2>從第一份需求，<br />到可以公開的網站。</h2>
            <p>
              每一步都有一個問題、實際用到的工具和可檢查的輸出。這是這次真正走過的製作路線。
            </p>
          </header>
          <ol className="process-timeline">
            {buildStages.map((stage) => (
              <li className="reveal" key={stage.order}>
                <div className="process-stage-index">
                  <span>{stage.order}</span>
                  <i aria-hidden="true" />
                </div>
                <div className="process-stage-main">
                  <small>{stage.question}</small>
                  <h3>{stage.title}</h3>
                  <p>{stage.work}</p>
                </div>
                <div className="process-stage-output">
                  <span>TOOLS</span>
                  <ul className="process-stage-tools" aria-label={`${stage.title}使用的工具`}>
                    {stage.tools.map((tool) => <li key={tool}>{tool}</li>)}
                  </ul>
                  <span>OUTPUT</span>
                  <p>{stage.output}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section
          className="process-conversation story-section"
          id="process-conversation"
        >
          <header className="process-section-heading light reveal">
            <span className="section-index">03 / MY PRODUCTION LOGIC</span>
            <h2>先決定怎麼說，<br />才決定怎麼做。</h2>
            <p>
              這七個想法決定了內容順序、案例篇幅、Demo 方式與畫面。它們比逐題列出我回答過什麼更接近真正的製作過程。
            </p>
          </header>
          <ol className="idea-track">
            {productionIdeas.map((item) => (
              <li className="reveal" key={item.order}>
                <div className="idea-statement">
                  <span>{item.order}</span>
                  <strong>{item.title}</strong>
                  <p>{item.idea}</p>
                </div>
                <div className="idea-reason">
                  <span>WHY</span>
                  <p>{item.reason}</p>
                </div>
                <div className="idea-result">
                  <span>ON SITE</span>
                  <p>{item.onSite}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="process-issues story-section" id="process-issues">
          <header className="process-section-heading reveal">
            <span className="section-index">04 / PROBLEMS WE HIT</span>
            <h2>遇到問題時，<br />先留下證據。</h2>
            <p>
              錯誤訊息只是表面。真正的修正要能說明原因，也要有一個會先失敗、修完再通過的檢查。
            </p>
          </header>
          <div className="issue-ledger">
            {buildIssues.map((issue, index) => (
              <article className="reveal" key={issue.title}>
                <div className="issue-ledger-title">
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <small>{issue.status}</small>
                  <h3>{issue.title}</h3>
                </div>
                <dl>
                  <div><dt>看到什麼</dt><dd>{issue.symptom}</dd></div>
                  <div><dt>真正原因</dt><dd>{issue.cause}</dd></div>
                  <div><dt>怎麼處理</dt><dd>{issue.response}</dd></div>
                  <div><dt>如何確認</dt><dd>{issue.proof}</dd></div>
                </dl>
              </article>
            ))}
          </div>
        </section>

        <section className="process-tools story-section" id="process-tools">
          <header className="process-section-heading light reveal">
            <span className="section-index">05 / TOOL LEDGER</span>
            <h2>每個工具，<br />都有明確任務。</h2>
            <p>
              這裡只列實際參與建站的工具，並寫清楚它做了什麼、留下什麼。Antigravity CLI、Skills 與 TempoTerm 是網站介紹的內容，不等於這次全部都有拿來建站。
            </p>
          </header>
          <ol className="tool-ledger">
            {toolGroups.map((group) => (
              <li className="reveal" key={group.order}>
                <span>{group.order}</span>
                <div className="tool-ledger-task">
                  <h3>{group.title}</h3>
                  <p>{group.use}</p>
                </div>
                <ul aria-label={`${group.title}使用的工具`}>
                  {group.tools.map((tool) => <li key={tool}>{tool}</li>)}
                </ul>
                <div className="tool-ledger-output">
                  <small>留下什麼</small>
                  <p>{group.output}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="process-proof story-section" id="process-proof">
          <header className="process-section-heading reveal">
            <span className="section-index">06 / TRACEABLE WORK</span>
            <h2>討論會改變。<br />Git 留下每次選擇。</h2>
            <p>
              規格、工程、內容、測試、視覺與正式站修正分開提交。回頭看紀錄時，可以知道每次改動在處理哪一件事。
            </p>
          </header>
          <div className="commit-console reveal">
            <div className="commit-console-bar">
              <span>git log --oneline</span>
              <span>PUBLIC REPOSITORY</span>
            </div>
            <ol>
              {commitTrace.map(([hash, label]) => (
                <li key={hash}>
                  <code>{hash}</code>
                  <span>{label}</span>
                  <i aria-hidden="true">✓</i>
                </li>
              ))}
            </ol>
          </div>
          <div className="process-proof-note reveal">
            <strong>這頁刻意沒有公開什麼？</strong>
            <p>
              帳號、密碼、Token、Cookie、真實學生資料、本機路徑，以及不公開的講者筆記。
              「完整過程」指的是完整決策與驗證脈絡，不是把私人對話和敏感資料原封不動貼上網。
            </p>
          </div>
        </section>

        <section className="process-closing story-section" id="process-closing">
          <div className="reveal">
            <span className="section-index">07 / WHAT I KEEP</span>
            <p>這次我最想留下的，不是某個框架版本。</p>
            <h2>
              先把問題問清楚。
              <br />
              做完，再證明它真的能用。
            </h2>
            <div className="process-closing-actions">
              <a className="button button-dark" href={siteConfig.routes.home}>
                回到實作故事 <span>←</span>
              </a>
              <a className="button button-secondary" href={siteConfig.routes.labAlias}>
                進入工具實驗室 <span>↗</span>
              </a>
            </div>
          </div>
        </section>

        <footer className="site-footer">
          <div>
            <span className="brand-mark">AI</span>
            <p><strong>{siteConfig.name}</strong><br />網站製作歷程</p>
          </div>
          <p>{siteConfig.speakerFullName} · 討論、實作、驗證與公開邊界</p>
        </footer>
      </main>
    </>
  );
}
