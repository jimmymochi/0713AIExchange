import ArtifactShowcase from "./components/ArtifactShowcase";
import SiteNav from "./components/SiteNav";
import WorkflowExplorer from "./components/WorkflowExplorer";
import { comparison } from "./data";

const homeSections = ["top", "why-agents", "compare", "workflow", "artifacts", "next"];

export default function Home() {
  return (
    <main>
      <SiteNav page="home" sectionIds={homeSections} />

      <section className="hero story-section" id="top">
        <div className="hero-grid">
          <div className="hero-copy reveal">
            <p className="eyebrow"><span className="live-dot" />從指令到交付 · 60 分鐘實作分享</p>
            <h1>
              <span className="hero-title-line">AI 不只回答。</span>
              <span className="hero-title-line hero-title-accent">它把工作做完。</span>
            </h1>
            <p className="hero-lead">
              從 Antigravity CLI、Codex，到每天 18:30 自動產生的 00981A
              報告。現場拆解一句話如何變成可驗證、可重跑、可交付的工作流。
            </p>
            <div className="hero-facts" aria-label="分享內容摘要">
              <div><strong>02</strong><span>代理入口<br />CLI × Codex</span></div>
              <div><strong>15</strong><span>可追溯<br />Agent Skills</span></div>
              <div><strong>01</strong><span>真實案例<br />00981A</span></div>
            </div>
            <div className="hero-actions">
              <a className="button button-primary" href="#workflow">進入真實工作流 <span>↓</span></a>
              <a className="button button-secondary" href="/lab.html">開啟互動教學 <span>↗</span></a>
            </div>
          </div>

          <div className="hero-console reveal" aria-label="AI 工作流動態摘要">
            <div className="console-top">
              <span className="chrome-dots"><i /><i /><i /></span>
              <span>LIVE WORKFLOW</span>
              <span className="console-live">● ACTIVE</span>
            </div>
            <div className="console-focus">
              <div>
                <span>CASE STUDY / 00981A</span>
                <strong>18:30</strong>
                <small>每個交易日自動啟動</small>
              </div>
              <div className="console-state">
                <span><i />資料取得</span>
                <span><i />51 / 51 驗證</span>
                <span><i />Excel + PDF</span>
              </div>
            </div>
            <div className="console-flow">
              {["排程", "PCF", "比對", "Excel", "PDF", "Mail"].map((item, index) => (
                <div key={item}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <i />
                  <strong>{item}</strong>
                </div>
              ))}
            </div>
            <div className="console-log">
              <p><span>18:34:19</span> source / 00981A / fetching</p>
              <p><span>18:44:03</span> retry / validated 51 of 51</p>
              <p className="console-success"><span>18:44:27</span> delivered / report complete ✓</p>
            </div>
          </div>
        </div>
        <div className="hero-marquee" aria-hidden="true">
          <div>ANTIGRAVITY CLI · CODEX · SKILLS · AUTOMATION · 00981A · ANTIGRAVITY CLI · CODEX · SKILLS · AUTOMATION · 00981A ·</div>
        </div>
      </section>

      <section className="story-section manifesto" id="why-agents">
        <div className="section-index">01 / WHY AGENTS</div>
        <div className="manifesto-copy reveal">
          <p>傳統 AI 給你一段答案。</p>
          <p className="highlight-line">代理型 AI 會先理解環境，</p>
          <p>再使用工具、處理例外，</p>
          <p className="highlight-line violet">最後交付可以檢查的成果。</p>
        </div>
        <div className="agent-loop reveal">
          {[
            ["01", "理解", "目標、限制、現有檔案"],
            ["02", "行動", "指令、程式、瀏覽器與服務"],
            ["03", "驗證", "資料筆數、測試與畫面"],
            ["04", "交付", "報告、檔案與可追蹤紀錄"],
          ].map(([number, title, copy]) => (
            <article key={number}>
              <span>{number}</span>
              <h3>{title}</h3>
              <p>{copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="story-section compare-section" id="compare">
        <div className="section-heading reveal">
          <div>
            <span className="section-index">02 / TWO ENTRIES</span>
            <h2>兩個入口，<br />同一個代理時代。</h2>
          </div>
          <p>
            Antigravity CLI 適合從終端快速出發；Codex 把同一套代理工作方式延伸到
            CLI、IDE、桌面與雲端。差別不只是模型，而是你想建立多長的工作鏈。
          </p>
        </div>

        <div className="tool-panels reveal">
          <article className="tool-panel antigravity-panel">
            <div className="tool-panel-top"><span>01</span><span>GOOGLE ANTIGRAVITY</span></div>
            <h3>快速、直接、<br />終端優先。</h3>
            <p>執行 <code>agy</code>，用自然語言派發任務，再以 Skills、Rules 與 MCP 擴充能力。</p>
            <a href="https://antigravity.google/docs/cli/features" target="_blank" rel="noreferrer">官方文件 ↗</a>
          </article>
          <article className="tool-panel codex-panel">
            <div className="tool-panel-top"><span>02</span><span>OPENAI CODEX</span></div>
            <h3>從理解專案，<br />一路做到交付。</h3>
            <p>在工作區內探索、修改、測試與審查，並用 AGENTS.md、Skills、Plugins 與 MCP 固化方法。</p>
            <a href="https://developers.openai.com/codex/cli" target="_blank" rel="noreferrer">官方文件 ↗</a>
          </article>
        </div>

        <div className="comparison-table reveal" role="table" aria-label="Antigravity CLI 與 Codex 比較">
          <div className="comparison-row comparison-head" role="row">
            <div role="columnheader">比較面向</div>
            <div role="columnheader">ANTIGRAVITY CLI</div>
            <div role="columnheader">CODEX</div>
          </div>
          {comparison.map((row) => (
            <div className="comparison-row" role="row" key={row.label}>
              <div role="cell">{row.label}</div>
              <div role="cell">{row.antigravity}</div>
              <div role="cell">{row.codex}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="story-section workflow-section" id="workflow">
        <div className="section-heading light reveal">
          <div>
            <span className="section-index">03 / REAL WORKFLOW</span>
            <h2>晚上 6:30，<br />工作自己開始。</h2>
          </div>
          <p>
            00981A 案例不是即時投資資訊，而是 2026/07/28
            經驗證的工作流快照。點選每個節點，查看它的輸入、輸出與安全檢查。
          </p>
        </div>
        <div className="reveal"><WorkflowExplorer /></div>
      </section>

      <section className="story-section artifacts-section" id="artifacts">
        <div className="section-heading reveal">
          <div>
            <span className="section-index">04 / PROOF OF WORK</span>
            <h2>成果不是一句<br />「已經完成」。</h2>
          </div>
          <p>
            真正的交付包含可檢查的通知、完整工作表、逐頁報告與原始檔。
            這裡展示工作流在 2026/07/28 實際產生的內容。
          </p>
        </div>
        <div className="reveal"><ArtifactShowcase /></div>
        <p className="disclaimer">教學展示、非投資建議。案例內容為特定日期快照，不代表目前持股或績效。</p>
      </section>

      <section className="story-section next-section" id="next">
        <div className="next-copy reveal">
          <span className="section-index">05 / YOUR TURN</span>
          <h2>先讓 AI 看懂一個資料夾，<br />再讓它接手一段工作。</h2>
          <p>互動教學從安全的唯讀分析開始，接著帶你安裝 CLI、啟動 Skill，理解每一步的風險。</p>
          <a className="button button-dark" href="/lab.html">進入互動教學 <span>→</span></a>
        </div>
      </section>

      <footer className="site-footer">
        <div>
          <span className="brand-mark">AI</span>
          <p><strong>0731 AI 分享</strong><br />2026／07／31 · Antigravity CLI × Codex</p>
        </div>
        <p>非官方教學網站 · 產品功能與安裝方式以官方文件為準</p>
      </footer>
    </main>
  );
}
