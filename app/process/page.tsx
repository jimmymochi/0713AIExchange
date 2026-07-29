import type { Metadata } from "next";
import SiteNav from "../components/SiteNav";
import {
  buildIssues,
  buildStages,
  commitTrace,
  conversationDecisions,
  toolGroups,
} from "../process-data";
import { siteConfig, siteUrl } from "../site";

export const metadata: Metadata = {
  title: "網站製作歷程｜從第一次討論到正式上線",
  description:
    "完整記錄 0731 AI 分享網站如何從需求訪談、內容規格、介面重構、測試部署，到正式站問題修正。",
  alternates: {
    canonical: siteUrl(siteConfig.routes.processAlias),
  },
  openGraph: {
    title: `網站製作歷程｜${siteConfig.name}`,
    description:
      "從原始想法、Jimmy 與 Codex 的討論，到遇到的問題、使用工具與公開站驗證。",
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
              我一開始有很多內容，也有明確想法，但還不是一個能直接開工的網站。
              這裡把需求怎麼被問清楚、哪些地方改過方向、程式怎麼驗證，以及上線後怎麼修正，全部留下來。
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
              <small>0713AIEXCHANGE / BUILD STORY</small>
              <strong>00 → 07</strong>
              <p>從原始任務到正式站回歸測試</p>
            </div>
            <ol>
              <li><span>01</span><strong>訪談</strong><small>問題先行</small></li>
              <li><span>02</span><strong>規格</strong><small>公開邊界</small></li>
              <li><span>03</span><strong>重構</strong><small>故事與介面</small></li>
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
              每一步都有一個問題、一段實作和一個可檢查的輸出。這也是我之後想重複使用的工作方式。
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
            <span className="section-index">03 / CONVERSATION → DECISION</span>
            <h2>我們不是一次<br />就把答案猜對。</h2>
            <p>
              訪談的價值不是問很多，而是每個回答都真的改變網站。以下保留最關鍵的七次轉折。
            </p>
          </header>
          <ol className="conversation-track">
            {conversationDecisions.map((item) => (
              <li className="reveal" key={item.order}>
                <div className="conversation-speaker">
                  <span>{item.order}</span>
                  <strong>JIMMY</strong>
                  <p>「{item.jimmy}」</p>
                </div>
                <div className="conversation-arrow" aria-hidden="true">→</div>
                <div className="conversation-result">
                  <span>{item.effect}</span>
                  <p>{item.decision}</p>
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
            <h2>工具很多。<br />每個只負責一段。</h2>
            <p>
              我沒有找一個「自動完成全部」的工具。訪談、實作、檢查與部署各自需要不同能力。
            </p>
          </header>
          <ol className="tool-ledger">
            {toolGroups.map((group) => (
              <li className="reveal" key={group.order}>
                <span>{group.order}</span>
                <h3>{group.title}</h3>
                <ul aria-label={`${group.title}使用的工具`}>
                  {group.tools.map((tool) => <li key={tool}>{tool}</li>)}
                </ul>
                <p>{group.detail}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="process-proof story-section" id="process-proof">
          <header className="process-section-heading reveal">
            <span className="section-index">06 / TRACEABLE WORK</span>
            <h2>討論會改變。<br />Git 留下每次選擇。</h2>
            <p>
              大改版沒有塞進一個模糊的提交。規格、工程、內容、測試、視覺與正式站修正分開留下紀錄。
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
