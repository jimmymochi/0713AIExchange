import type { Metadata } from "next";
import Link from "next/link";
import SiteNav from "../components/SiteNav";
import TempoGallery from "../components/TempoGallery";
import { siteConfig, siteUrl } from "../site";

export const metadata: Metadata = {
  title: "TempoTerm｜AI 原生終端機工作區",
  description: "認識 TempoTerm：把終端機、檔案、Git 與 AI CLI 工作階段放進同一個正體中文工作區。",
  alternates: { canonical: siteUrl(siteConfig.routes.tempo) },
};

const tempoSections = ["tempo-top", "learning-path", "workspace", "real-use", "decision", "tempo-start"];

const capabilities = [
  ["01", "TERMINAL", "終端機仍是核心", "Codex、Antigravity 與其他 CLI 照原本方式執行；你學到的命令與路徑觀念都不會浪費。"],
  ["02", "CONTEXT", "檔案與程式碼在旁邊", "檔案總管、編輯器與預覽留在同一個工作區，減少複製路徑和切換視窗。"],
  ["03", "GIT", "Git 與 worktree 可見", "同時追蹤多個分支、差異與代理工作狀態，適合開始處理真正專案之後使用。"],
  ["04", "SESSIONS", "AI 工作階段集中", "可查看 Codex、Claude Code 與 Antigravity 的本機工作紀錄，把分散的任務重新放回脈絡裡。"],
  ["05", "ZH-HANT", "正體中文完整支援", "從介面到 CJK 終端字寬都以中文使用情境為考量，長篇輸出更容易閱讀。"],
];

export default function TempoPage() {
  return (
    <main className="tempo-page">
      <SiteNav page="tempo" sectionIds={tempoSections} />

      <section className="tempo-hero story-section" id="tempo-top">
        <div className="tempo-hero-copy reveal">
          <p className="eyebrow"><span className="live-dot" />OPEN-SOURCE TOOL PICK</p>
          <h1>先學會<br />終端機，<br /><span>再升級工作區。</span></h1>
          <p className="tempo-lead">
            TempoTerm 把終端機、程式碼、檔案、Git 與 AI 助手放進同一個正體中文視窗。
            但它最有價值的時刻，是你已經懂得命令正在做什麼之後。
          </p>
          <div className="tempo-actions">
            <a className="button button-primary" href="https://github.com/mukiwu/tempo-term" target="_blank" rel="noreferrer">查看 GitHub ↗</a>
            <a className="button button-secondary" href="https://github.com/mukiwu/tempo-term/releases" target="_blank" rel="noreferrer">下載最新版 ↓</a>
          </div>
          <p className="tempo-verdict"><strong>本站建議</strong><span>初學：Windows Terminal / PowerShell</span><span>進階：TempoTerm</span></p>
        </div>
        <div className="tempo-hero-visual reveal" aria-label="TempoTerm 整合工作區概念圖">
          <div className="tempo-orbit orbit-terminal"><span>01</span>TERMINAL</div>
          <div className="tempo-orbit orbit-files"><span>02</span>FILES</div>
          <div className="tempo-orbit orbit-git"><span>03</span>GIT</div>
          <div className="tempo-orbit orbit-ai"><span>04</span>AI SESSIONS</div>
          <div className="tempo-core"><small>ONE WINDOW</small><strong>Tempo<br />Term</strong><span>正體中文 AI CLI 工作區</span></div>
        </div>
      </section>

      <section className="tempo-path story-section" id="learning-path">
        <div className="section-heading light reveal">
          <div><span className="section-index">01 / LEARNING PATH</span><h2>工具越整合，<br />基礎越重要。</h2></div>
          <p>TempoTerm 讓操作更集中，不會替你理解路徑、權限、命令與 Git。先掌握底層，遇到錯誤時才知道該看哪裡。</p>
        </div>
        <ol className="tempo-ladder reveal">
          <li><span>STEP 01 · START HERE</span><strong>原生終端機</strong><p>學會 <code>cd</code>、資料夾路徑、複製貼上、權限與如何停止指令。</p></li>
          <li><span>STEP 02 · ADD AI</span><strong>Codex / Antigravity CLI</strong><p>在熟悉的終端機裡下任務，觀察它讀取什麼、修改什麼、如何回報。</p></li>
          <li><span>STEP 03 · UPGRADE</span><strong>TempoTerm 工作區</strong><p>當分頁、檔案、Git 與多個 AI 工作階段變多，再用整合介面降低切換成本。</p></li>
        </ol>
      </section>

      <section className="tempo-workspace story-section" id="workspace">
        <div className="section-heading reveal">
          <div><span className="section-index">02 / ONE WINDOW</span><h2>不是換掉 CLI，<br />是把脈絡放回來。</h2></div>
          <p>點選 Codex 或 Antigravity，查看 Jimmy 實際在 TempoTerm 裡使用兩套 CLI 的畫面。</p>
        </div>
        <div className="reveal"><TempoGallery /></div>
      </section>

      <section className="tempo-capabilities story-section" id="real-use">
        <header className="tempo-capabilities-head reveal">
          <span className="section-index">03 / WHAT IT ADDS</span>
          <h2>一個視窗，<br />五種工作角色。</h2>
        </header>
        <div className="tempo-capability-list reveal">
          {capabilities.map(([number, label, title, detail]) => (
            <article key={number}>
              <span className="tempo-cap-number">{number}</span>
              <small>{label}</small>
              <h3>{title}</h3>
              <p>{detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="tempo-decision story-section" id="decision">
        <div className="tempo-decision-intro reveal">
          <span className="section-index">04 / HONEST RECOMMENDATION</span>
          <h2>現在適合你嗎？</h2>
          <p>好的工具推薦，也要包含「何時先不要用」。</p>
        </div>
        <div className="tempo-decision-grid reveal">
          <article className="tempo-yes">
            <span>YES · 可以升級</span>
            <h3>你已經能自己跑 CLI</h3>
            <ul>
              <li>同時開著多個 Codex 或 Antigravity 任務</li>
              <li>需要看檔案、編輯程式碼與 Git 差異</li>
              <li>想保留正體中文介面與終端機體驗</li>
              <li>常因切換視窗而失去目前任務脈絡</li>
            </ul>
          </article>
          <article className="tempo-wait">
            <span>WAIT · 先練基礎</span>
            <h3>你還不確定命令做了什麼</h3>
            <ul>
              <li>還在熟悉資料夾路徑與基本命令</li>
              <li>遇到錯誤只會關掉視窗重新開始</li>
              <li>還沒建立「先看、再授權修改」的習慣</li>
              <li>目前只需要單一 CLI 與一個資料夾</li>
            </ul>
          </article>
        </div>
      </section>

      <section className="tempo-start story-section" id="tempo-start">
        <div className="tempo-start-copy reveal">
          <span className="section-index">05 / GET STARTED</span>
          <h2>三步開始，<br />不用重學 CLI。</h2>
          <p>TempoTerm 是工作區，不是新的 AI 訂閱。原本的 CLI、帳號與 shell 使用方式可以繼續沿用。</p>
        </div>
        <div className="tempo-start-steps reveal">
          <article><span>01</span><div><h3>下載正式版本</h3><p>從 GitHub Releases 取得最新版本；先閱讀版本說明與支援平台。</p><a href="https://github.com/mukiwu/tempo-term/releases" target="_blank" rel="noreferrer">前往 Releases ↗</a></div></article>
          <article><span>02</span><div><h3>開啟熟悉的 shell</h3><p>在 TempoTerm 建立終端機，先測試 <code>codex --version</code> 或 <code>agy --version</code>。</p></div></article>
          <article><span>03</span><div><h3>再加入整合功能</h3><p>需要內建 AI 助手時才設定自己的 API Key；Git、SSH 與 worktree 也分階段啟用。</p><a href="https://github.com/mukiwu/tempo-term/blob/master/README.zh-Hant.md" target="_blank" rel="noreferrer">正體中文說明 ↗</a></div></article>
        </div>
        <div className="tempo-source-note reveal">
          <strong>來源與授權</strong>
          <p>
            TempoTerm 是 <a href="https://github.com/mukiwu/tempo-term" target="_blank" rel="noreferrer">mukiwu/tempo-term</a> 的第三方開源專案，
            採 Apache-2.0 授權；本頁為使用心得與教學介紹，與專案作者無隸屬關係，名稱與標誌仍依原專案 NOTICE 規範。
          </p>
        </div>
        <Link className="back-home" href={siteConfig.routes.lab}>← 回到 CLI 互動教學</Link>
      </section>

      <footer className="site-footer">
        <div><span className="brand-mark">AI</span><p><strong>{siteConfig.name}</strong><br />CLI 工具推薦 · TempoTerm</p></div>
        <p>{siteConfig.speakerFullName} · 先理解命令，再升級工作區</p>
      </footer>
    </main>
  );
}
