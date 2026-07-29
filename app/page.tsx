import ArtifactShowcase from "./components/ArtifactShowcase";
import ExternalEmbed from "./components/ExternalEmbed";
import ReflectionPrompt from "./components/ReflectionPrompt";
import SiteNav from "./components/SiteNav";
import WorkflowExplorer from "./components/WorkflowExplorer";
import { publishedCases } from "./cases";
import { siteConfig, siteDisplayDate } from "./site";

const homeSections = [
  "top",
  "thesis",
  "journey",
  "case-pdf",
  "case-credits",
  "case-workflow",
  "responsibility",
  "question",
  "portfolio",
  "tools",
  "closing",
];

const [pdfCase, creditCase, workflowCase] = publishedCases;

export default function Home() {
  return (
    <>
      <SiteNav page="home" sectionIds={homeSections} />
      <main id="main-content">
        <section className="hero story-section" id="top">
          <div className="hero-grid">
            <div className="hero-copy reveal">
              <p className="eyebrow">
                <span className="live-dot" />
                從問題到交付 · {siteConfig.durationMinutes} 分鐘實作分享
              </p>
              <h1>
                <span className="hero-title-line">AI 不只回答。</span>
                <span className="hero-title-line hero-title-accent">
                  人要決定做什麼。
                </span>
              </h1>
              <p className="hero-lead">
                我做過 PDF 翻譯、畢業學分計算和 00981A 自動化。
                三個專案教我的不是同一套工具，而是三種判斷：何時停止、什麼值得做，以及怎麼確認成果可信。
              </p>
              <div className="hero-facts" aria-label="分享內容摘要">
                <div>
                  <strong>03</strong>
                  <span>實際案例<br />依時間展開</span>
                </div>
                <div>
                  <strong>02</strong>
                  <span>核心案例<br />問題 × 驗證</span>
                </div>
                <div>
                  <strong>01</strong>
                  <span>最後問題<br />留給每個人</span>
                </div>
              </div>
              <div className="hero-actions">
                <a className="button button-primary" href="#journey">
                  從第一個專案開始 <span>↓</span>
                </a>
                <a className="button button-secondary" href={siteConfig.routes.lab}>
                  工具實驗室 <span>↗</span>
                </a>
              </div>
            </div>

            <div className="hero-console reveal" aria-label="00981A 自動化工作流摘要">
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
            <div>
              PROBLEM · IDEA · JUDGMENT · PROOF · RESPONSIBILITY · PROBLEM · IDEA · JUDGMENT · PROOF · RESPONSIBILITY ·
            </div>
          </div>
        </section>

        <section className="story-section manifesto" id="thesis">
          <div className="section-index">01 / WHAT CHANGED</div>
          <div className="manifesto-copy reveal">
            <p>工具會繼續變強。</p>
            <p className="highlight-line">操作會逐漸變成基本能力。</p>
            <p>真正難的是找到問題，</p>
            <p className="highlight-line violet">再對結果負責。</p>
          </div>
          <div className="thesis-note reveal">
            <p>
              技術能力沒有消失。它只是回到更合理的位置：幫助我們執行、測試與修正。
              至於目標該往哪裡走，仍然要由人決定。
            </p>
          </div>
        </section>

        <section className="story-section journey-section" id="journey">
          <div className="section-heading reveal">
            <div>
              <span className="section-index">02 / ONE SEMESTER</span>
              <h2>三個專案，<br />三次不同判斷。</h2>
            </div>
            <p>
              這不是成功作品排行榜。每個案例保留當時的限制，
              也保留我改變方向的原因。
            </p>
          </div>
          <ol className="journey-line reveal">
            {publishedCases.map((project) => (
              <li key={project.id}>
                <a href={`#case-${project.id === "workflow" ? "workflow" : project.id}`}>
                  <span>{project.order}</span>
                  <small>{project.period}</small>
                  <h3>{project.title}</h3>
                  <p>{project.role}</p>
                  <strong>{project.question}</strong>
                </a>
              </li>
            ))}
          </ol>
        </section>

        <section className="story-section case-section case-pdf" id="case-pdf">
          <header className="case-heading reveal">
            <div>
              <span className="case-number">{pdfCase.order}</span>
              <span className="mono-label">{pdfCase.period} / ACTIVE STOP</span>
            </div>
            <h2>{pdfCase.title}</h2>
            <p>{pdfCase.question}</p>
          </header>
          <div className="case-story-grid reveal">
            <article>
              <span>起點</span>
              <h3>我想保留論文排版，再翻成繁體中文。</h3>
              <p>{pdfCase.problem}</p>
            </article>
            <article className="case-result">
              <span>做到哪裡</span>
              <h3>翻譯成功，排版沒有穩定下來。</h3>
              <p>{pdfCase.result}</p>
            </article>
          </div>
          <ol className="decision-path reveal" aria-label="PDF 翻譯專案的決策流程">
            {["發現閱讀需求", "做出翻譯原型", "測試排版", "比較既有工具", "差異不足", "決定停止"].map(
              (step, index) => (
                <li key={step} className={index === 5 ? "stop" : ""}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <strong>{step}</strong>
                </li>
              ),
            )}
          </ol>
          <p className="case-limit reveal">{pdfCase.limitation}</p>
        </section>

        <section className="story-section case-section case-credit" id="case-credits">
          <header className="case-heading light reveal">
            <div>
              <span className="case-number">{creditCase.order}</span>
              <span className="mono-label">{creditCase.period} / PROBLEM FIRST</span>
            </div>
            <h2>{creditCase.title}</h2>
            <p>{creditCase.question}</p>
          </header>
          <div className="credit-problem reveal">
            <div>
              <span className="mono-label">THE GAP</span>
              <p>校務系統提供課程與學分</p>
            </div>
            <div aria-hidden="true">≠</div>
            <div>
              <span className="mono-label">WHAT STUDENTS NEED</span>
              <p>我還缺什麼才能畢業？</p>
            </div>
          </div>
          <div className="case-responsibility reveal">
            <article>
              <span>AI 協助</span>
              <ul>{creditCase.aiWork.map((item) => <li key={item}>{item}</li>)}</ul>
            </article>
            <article>
              <span>人要確認</span>
              <ul>{creditCase.humanWork.map((item) => <li key={item}>{item}</li>)}</ul>
            </article>
          </div>
          <div className="credit-limit reveal">
            <strong>目前限制</strong>
            <p>{creditCase.limitation}</p>
            <p>正式畢業資格仍以學校與系所審核為準。</p>
          </div>
          <div className="reveal">
            <ExternalEmbed
              title={siteConfig.externalSpaces.creditCalculator.label}
              description="這是獨立運作的 Streamlit Space。本站只負責嵌入畫面，不會取得你在外部 Demo 輸入的內容。"
              embedUrl={siteConfig.externalSpaces.creditCalculator.embedUrl}
              pageUrl={siteConfig.externalSpaces.creditCalculator.pageUrl}
              buttonLabel="我了解風險，載入外部 Demo"
              sensitive
              warnings={[
                "帳號、密碼、成績單與修課資料會傳送到 Hugging Face Space 伺服器處理。",
                "請勿在投影、錄影或他人可見的環境中顯示帳密與完整修課資料。",
                "計算結果可能有分類錯誤，不能取代校方正式審查。",
              ]}
            />
          </div>
        </section>

        <section className="story-section workflow-section" id="case-workflow">
          <div className="section-heading light reveal">
            <div>
              <span className="section-index">03 / FAMILY REQUEST</span>
              <h2>{workflowCase.title}</h2>
            </div>
            <p>
              {workflowCase.problem}
              我先做出能跑的版本，再把資料筆數、重試與輸出檢查補進流程。
            </p>
          </div>
          <blockquote className="family-quote reveal">
            <span>需求不是從工具開始</span>
            <p>「每天都要自己找資料、拉表格，能不能讓 AI 幫忙？」</p>
          </blockquote>
          <div className="reveal"><WorkflowExplorer /></div>
          <div className="workflow-proof-heading reveal">
            <span className="mono-label">PROOF OF WORK</span>
            <h3>完成不是一句回覆。檔案要能打開，資料也要對得起來。</h3>
          </div>
          <div className="reveal"><ArtifactShowcase /></div>
          <p className="disclaimer">
            {workflowCase.limitation}
          </p>
        </section>

        <section className="story-section responsibility-section" id="responsibility">
          <div className="section-heading reveal">
            <div>
              <span className="section-index">04 / WHO OWNS WHAT</span>
              <h2>AI 可以執行。<br />責任不能外包。</h2>
            </div>
            <p>
              三個案例的差別不在模型，而在我如何設定目標、驗證與停止條件。
            </p>
          </div>
          <div className="responsibility-map reveal">
            <article>
              <span>AI 的工作</span>
              <ul>
                <li>讀取檔案與資料</li>
                <li>產生程式和介面</li>
                <li>整理表格與報告</li>
                <li>重複執行固定流程</li>
              </ul>
            </article>
            <div className="responsibility-axis" aria-hidden="true">
              <span>執行</span><i /><strong>交界</strong><i /><span>負責</span>
            </div>
            <article>
              <span>人的工作</span>
              <ul>
                <li>選擇值得解決的問題</li>
                <li>比較現有方案</li>
                <li>設定限制與驗證方式</li>
                <li>承擔最後的結果</li>
              </ul>
            </article>
          </div>
        </section>

        <section className="story-section reflection-section" id="question">
          <div className="section-heading reveal">
            <div>
              <span className="section-index">05 / YOUR QUESTION</span>
              <h2>先別急著回答。<br />停一下，想想看。</h2>
            </div>
            <p>
              這一段不用填表，也沒有標準答案。我只想帶大家用幾個問題，
              想想自己真正想處理的是什麼。
            </p>
          </div>
          <ReflectionPrompt />
        </section>

        <section className="story-section portfolio-section" id="portfolio">
          <div className="section-heading reveal">
            <div>
              <span className="section-index">06 / ONE SEMESTER</span>
              <h2>報告、網站、<br />感測器與模擬。</h2>
            </div>
            <p>
              114-2 地震學成果網站整理了整學期的互動作業、書面報告、活動心得與地震波模擬。
            </p>
          </div>
          <div className="reveal">
            <ExternalEmbed
              title={siteConfig.externalSpaces.semesterPortfolio.label}
              description="完整作品集保留原本的互動、影片、PDF 與內嵌作業。"
              embedUrl={siteConfig.externalSpaces.semesterPortfolio.embedUrl}
              pageUrl={siteConfig.externalSpaces.semesterPortfolio.pageUrl}
              buttonLabel="載入完整學期作品集"
              desktopRecommended
              warnings={[
                "完整作品集包含多個互動頁面、影片與大型 PDF，載入時間取決於網路速度。",
                "手機可以瀏覽，但完整操作建議使用桌機。",
              ]}
            />
          </div>
        </section>

        <section className="story-section tools-bridge" id="tools">
          <div className="tools-bridge-copy reveal">
            <span className="section-index">07 / TOOL LAB</span>
            <h2>工具還是要學。<br />只是別讓它變成起點。</h2>
            <p>
              現有的 Antigravity CLI、Codex、Skills 與 TempoTerm 教學完整保留。
              當你已經知道要解決什麼，再去挑工具會快很多。
            </p>
          </div>
          <div className="tools-bridge-links reveal">
            <a href={siteConfig.routes.lab}>
              <span>01</span>
              <strong>進入工具實驗室</strong>
              <p>安裝、終端模擬、Skills 來源與風險。</p>
              <i>→</i>
            </a>
            <a href={siteConfig.routes.tempo}>
              <span>02</span>
              <strong>認識 TempoTerm</strong>
              <p>先學終端機，再決定是否需要整合工作區。</p>
              <i>→</i>
            </a>
          </div>
        </section>

        <section className="story-section closing-section" id="closing">
          <div className="closing-copy reveal">
            <span className="section-index">08 / LEAVE WITH THIS</span>
            <p>AI 已經可以快速幫你實現很多東西。</p>
            <h2>你真正想解決的是<br />什麼問題？</h2>
            <a className="button button-dark" href="#question">
              回到提問環節 <span>↑</span>
            </a>
          </div>
        </section>

        <footer className="site-footer">
          <div>
            <span className="brand-mark">AI</span>
            <p>
              <strong>{siteConfig.name}</strong><br />
              {siteConfig.speakerName}／{siteConfig.speakerFullName} · {siteDisplayDate}
            </p>
          </div>
          <p>
            <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a><br />
            公開案例依現有素材整理，限制與外部服務均已標示
          </p>
        </footer>
      </main>
    </>
  );
}
