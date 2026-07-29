import type { Metadata } from "next";
import Image from "next/image";
import CopyButton from "../components/CopyButton";
import SiteNav from "../components/SiteNav";
import SkillsLab from "../components/SkillsLab";
import SpringDetails from "../components/SpringDetails";
import TerminalSimulator from "../components/TerminalSimulator";
import { siteConfig, siteDisplayDate, siteUrl } from "../site";

export const metadata: Metadata = {
  title: "互動教學",
  description: "從安全的唯讀任務開始，互動學習 Antigravity CLI、Codex 與可追溯的 Agent Skills。",
  alternates: { canonical: siteUrl(siteConfig.routes.labAlias) },
};

const labSections = ["tutorial-top", "install", "simulator", "tempo-pick", "skills", "safe-start"];

const installs = {
  antigravity: {
    windows: "irm https://antigravity.google/cli/install.ps1 | iex",
    unix: "curl -fsSL https://antigravity.google/cli/install.sh | bash",
    verify: "agy --version",
  },
  codex: {
    windows: "npm install -g @openai/codex",
    unix: "curl -fsSL https://chatgpt.com/codex/install.sh | sh",
    verify: "codex --version",
  },
};

export default function TutorialPage() {
  return (
    <main>
      <SiteNav page="tutorial" sectionIds={labSections} />

      <section className="tutorial-hero story-section" id="tutorial-top">
        <div className="tutorial-hero-copy reveal">
          <p className="eyebrow"><span className="live-dot" />60 MINUTE FIELD LAB</p>
          <h1>看懂之後，<br /><span>親手跑一次。</span></h1>
          <p>
            這不是任意命令列。選一個安全情境，讓終端機逐步示範真實指令、
            預期輸出與完成條件，再複製到自己的環境。
          </p>
          <a className="button button-primary" href="#simulator">開始互動示範 ↓</a>
        </div>
        <div className="agenda-card reveal">
          <div className="agenda-head"><span>LIVE AGENDA</span><span>60 MIN</span></div>
          <div data-stagger>
          {[
            ["00—10", "理解代理工作方式"],
            ["10—20", "安裝兩套 CLI"],
            ["20—35", "安全的第一個任務"],
            ["35—52", "Skills 深講與實作"],
            ["52—60", "00981A 案例與問答"],
          ].map(([time, title]) => (
            <div className="agenda-row" key={time}><span>{time}</span><strong>{title}</strong></div>
          ))}
          </div>
        </div>
      </section>

      <section className="install-section story-section" id="install">
        <div className="section-heading reveal">
          <div>
            <span className="section-index">01 / INSTALL</span>
            <h2>Windows 優先，<br />三步完成。</h2>
          </div>
          <p>先安裝，再驗證版本，最後登入。不要把 API Key 直接貼進公開對話、程式碼或網站。</p>
        </div>

        <div className="install-cards reveal" data-stagger>
          <article className="install-card antigravity-install">
            <div className="install-card-title"><span>01</span><div><small>GOOGLE</small><h3>Antigravity CLI</h3></div></div>
            <div className="os-command">
              <div><span>WINDOWS · POWERSHELL</span><CopyButton text={installs.antigravity.windows} /></div>
              <pre><code>{installs.antigravity.windows}</code></pre>
            </div>
            <SpringDetails summary="macOS / Linux 指令">
              <div className="details-code"><code>{installs.antigravity.unix}</code><CopyButton text={installs.antigravity.unix} /></div>
            </SpringDetails>
            <div className="verify-command"><span>VERIFY</span><code>{installs.antigravity.verify}</code><CopyButton text={installs.antigravity.verify} /></div>
            <a className="draw-link" href="https://antigravity.google/docs/cli/features" target="_blank" rel="noreferrer">閱讀官方文件 ↗</a>
          </article>

          <article className="install-card codex-install">
            <div className="install-card-title"><span>02</span><div><small>OPENAI</small><h3>Codex CLI</h3></div></div>
            <div className="os-command">
              <div><span>WINDOWS · NPM</span><CopyButton text={installs.codex.windows} /></div>
              <pre><code>{installs.codex.windows}</code></pre>
            </div>
            <SpringDetails summary="macOS / Linux 一鍵安裝">
              <div className="details-code"><code>{installs.codex.unix}</code><CopyButton text={installs.codex.unix} /></div>
            </SpringDetails>
            <div className="verify-command"><span>VERIFY</span><code>{installs.codex.verify}</code><CopyButton text={installs.codex.verify} /></div>
            <a className="draw-link" href="https://developers.openai.com/codex/cli" target="_blank" rel="noreferrer">閱讀官方文件 ↗</a>
          </article>
        </div>
      </section>

      <section className="simulator-section story-section" id="simulator">
        <div className="section-heading light reveal">
          <div>
            <span className="section-index">02 / GUIDED TERMINAL</span>
            <h2>先在安全模擬器裡，<br />看懂每一步。</h2>
          </div>
          <p>按下「執行示範」觀看打字、等待、輸出與完成狀態。網站不會執行任意指令，也不會讀取你的檔案。</p>
        </div>
        <div className="reveal"><TerminalSimulator /></div>
      </section>

      <section className="tempo-pick story-section" id="tempo-pick">
        <div className="tempo-pick-copy reveal">
          <span className="section-index">TOOL PICK / AFTER THE BASICS</span>
          <p className="tempo-pick-kicker">終端機學會之後</p>
          <h2>把 CLI 升級成<br /><span>一個完整工作區。</span></h2>
          <p>
            TempoTerm 把終端機、編輯器、檔案、Git 與 AI Sessions 放在同一個正體中文視窗。
            我仍建議初學者先用原生終端機；當任務與分頁開始變多，再升級最有感。
          </p>
          <a className="button button-primary" href={siteConfig.routes.tempoAlias}>看看 TempoTerm 適不適合你 →</a>
        </div>
        <a className="tempo-pick-image reveal" href={siteConfig.routes.tempoAlias} aria-label="前往 TempoTerm 完整介紹">
          <Image
            src="/tempo/tempo-codex-public.png"
            width={1632}
            height={963}
            unoptimized
            alt="TempoTerm 中執行 Codex CLI 的去識別化工作區畫面"
          />
          <span><strong>CODEX CLI</strong> / TERMINAL + FILES + GIT + AI</span>
        </a>
      </section>

      <section className="skills-section story-section" id="skills">
        <div className="section-heading reveal">
          <div>
            <span className="section-index">03 / SKILLS LAB</span>
            <h2>Skill 不是魔法，<br />是可重用的方法。</h2>
          </div>
          <p>
            依平台與來源篩選，點開卡片查看安裝、提示詞、工作流、成果與風險。
            「Jimmy 客製」與第三方、官方來源會清楚分開。
          </p>
        </div>
        <div className="reveal"><SkillsLab /></div>
      </section>

      <section className="safe-start story-section" id="safe-start">
        <div className="safe-start-grid reveal" data-stagger>
          <div>
            <span className="section-index">04 / FIRST MISSION</span>
            <h2>你的第一個任務：<br />只讀，不修改。</h2>
          </div>
          <div className="mission-card">
            <span className="mono-label">COPY THIS PROMPT</span>
            <p>
              請唯讀分析目前資料夾，不要修改、移動或刪除任何檔案。整理：
              1. 資料夾結構；2. 重要檔案；3. 可能風險；4. 建議的下一步。
              完成後列出你實際讀取過的檔案。
            </p>
            <CopyButton text="請唯讀分析目前資料夾，不要修改、移動或刪除任何檔案。整理：1. 資料夾結構；2. 重要檔案；3. 可能風險；4. 建議的下一步。完成後列出你實際讀取過的檔案。" label="複製第一個任務" />
            <ul>
              <li><strong>安全</strong>：不授權寫入、刪除或外部寄送。</li>
              <li><strong>可驗證</strong>：要求列出實際讀取的證據。</li>
              <li><strong>可延伸</strong>：確認分析後，再決定下一步。</li>
            </ul>
          </div>
        </div>
        <a className="back-home draw-link" href={siteConfig.routes.home}>← 回到實作故事首頁</a>
      </section>

      <footer className="site-footer">
        <div>
          <span className="brand-mark">AI</span>
          <p><strong>{siteConfig.name}</strong><br />互動教學 · {siteDisplayDate}</p>
        </div>
        <p>{siteConfig.speakerFullName} · 所有外部操作都應先確認權限、對象與預期結果</p>
      </footer>
    </main>
  );
}
