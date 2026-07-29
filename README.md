# 0731 AI 分享

Jimmy（陳柏亘）的繁體中文互動分享網站。主線不是工具清單，而是三個真實專案中的判斷：

- PDF 翻譯：做出原型後，為什麼選擇停止
- 畢業學分自我審查：如何從學生真正的問題出發
- 00981A 自動報告：如何把家人的重複工作變成可檢查的流程

原有 Antigravity CLI、OpenAI Codex、Agent Skills 與 TempoTerm 教學保留在獨立工具頁。

## 頁面

- `/`：個人實作故事、三個案例、引導提問與外部作品嵌入
- `/process.html`：從需求訪談、討論決策、問題修正到部署驗證的完整製作歷程
- `/lab.html`：CLI 安裝、引導式終端模擬與 Skills
- `/tempo.html`：TempoTerm 使用情境與選擇建議
- `/process`、`/lab`、`/tempo`：本機建置使用的來源路由，不作為 Hugging Face 公開連結

集中設定位於 `site.config.json`，內容與公開界線記錄於 `docs/content-spec.md`。
實際瀏覽器驗證與截圖記錄於 `docs/qa-browser-report.md`。

## 本機執行

需要 Node.js 22.13 或更新版本。

```bash
npm install
npm run dev
```

完整驗證與 Hugging Face 靜態匯出：

```bash
npm run verify
npm run export:hf
```

匯出結果位於 `hf-static-output/`。

## 外部嵌入與資料界線

首頁的畢業學分 Demo 與學期作品集來自獨立 Hugging Face Spaces，必須由訪客點擊後才載入。

- 畢業學分 Demo 的登入與修課資料會傳到該 Space 的伺服器；本站不會宣稱資料只留在瀏覽器。
- 試算結果可能有誤，尚未經教務處認證，也不適用所有學生；正式資格以校方審核為準。
- 引導提問是純展示內容，不提供輸入、上傳或儲存功能。
- 私人講者筆記放在 `content-input/private-do-not-publish/`，該目錄已由 Git 排除。

00981A 資料是 2026/07/28 的教學快照，不是即時投資資訊，也不構成投資建議。任何 API Key、Token、帳密或未遮蔽個資都不應提交到此 repository。

## 部署

Hugging Face Space 使用 Static SDK，將 `hf-static-output/` 的內容發佈即可。專案不需要資料庫、容器或常駐後端。
