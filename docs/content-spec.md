# 0731 AI 分享：內容與實作規格

## 核心主張

AI 的執行能力正在快速普及。會操作工具仍然重要，但真正稀缺的是發現值得解決的問題、提出不同想法、判斷是否值得繼續，以及設計可靠的驗證方式。

網站最後要留下的問題是：

> 當 AI 已經可以快速幫你實現很多東西，你真正想解決的是什麼問題？

## 目標觀眾與分享條件

- 對象：大學生與老師，多數用過 AI，但不熟悉代理型工作方式。
- 場合：課堂分享。
- 總時間：60 分鐘，網站也是主要展示介面。
- 語氣：正式但不生硬，保留學生實作者的第一人稱。
- 公開身分：主要稱呼 Jimmy；講者介紹與頁尾顯示陳柏亘。

## 網站故事線

1. 提出核心觀點：AI 能做更多事，不代表每件做得出來的事都值得做。
2. 以個人時間軸帶出三個案例。
3. PDF 翻譯：做出原型、比較方案、主動停止。
4. 畢業學分：從學生的真實困難出發，把資料轉成能理解的結果。
5. 00981A：從家人的重複工作出發，加入資料驗證、錯誤處理與交付。
6. 整理 AI 與人的責任分工。
7. 讓觀眾使用問題畫布思考自己的題目。
8. 串接完整學期作品集，再導向工具實驗室。
9. 以核心問題收束。

## 60 分鐘節奏

- 核心觀點與個人歷程：7 分鐘
- PDF 翻譯：6 分鐘
- 畢業學分：15 分鐘
- 00981A：15 分鐘
- 工具實驗室：8 分鐘
- 問題畫布與收束：6 分鐘
- 緩衝：3 分鐘

## 資訊架構

- `/`：個人故事、三個案例、責任分工、問題畫布、作品集與收束。
- `/lab`：Antigravity CLI、Codex、Skills 與安全操作教學。
- `/tempo`：TempoTerm 深度介紹。
- 靜態輸出同時提供 `/lab/index.html`、`/tempo/index.html`、`lab.html`、`tempo.html`。

## 案例規格

### PDF 翻譯工具

- 定位：「主動停止的專案」，不包裝成成熟產品或失敗。
- 已知事實：完成一份 PDF 翻譯；排版穩定性低；比較既有工具後認為差異不足。
- 呈現方式：需求、原型、測試、比較、停止、學習的文字流程圖。
- 素材策略：在沒有公開檔案前不製作假畫面；日後可補一組去識別化的前後頁面。

### 畢業學分計算網站

- 定位：把校務資料與畢業規則轉成學生能理解的結果。
- 公開 Demo：點擊風險說明後，載入外部 Hugging Face Space。
- 必須標示：帳密與成績資料會經過外部 Hugging Face 伺服器；本站不接收或保存輸入。
- 正確性限制：可能仍有分類錯誤；可持續修正；未經教務處認證；不適用所有學生；正式資格以校方審核為準。
- 不宣稱：完全安全、百分之百正確、適用全校或取代正式審查。

### 00981A

- 起點：家人每天需要手動找資料並整理表格。
- 網站重點：資料來源、完整性驗證、失敗重試、Excel／PDF、通知與停止條件。
- 網站素材：2026/07/28 的郵件、Excel、PDF 與工作流快照。
- 必須標示：特定日期教學案例、非即時資訊、不構成投資建議。

#### 網站內容與口頭內容分工

- 公開網站只寫「家人」，避免替家人公開更多身分資訊。
- 現場分享可由 Jimmy 口頭補充需求來自爸爸。
- 公開網站負責呈現可驗證的工作流、輸出檔案與限制；講者筆記負責提醒故事節奏，不加入網站沒有證據的效率或投資成果。

## 其他作品

- 完整嵌入 `Sapphirejimmy/seismology_final`。
- 先顯示介紹與「建議使用桌機」提示，訪客點擊後才建立 iframe。
- 不複製該 Space 的大型影片與 PDF 到此 repository。
- 提供另開完整網站的備援連結。

### 小型作品資料格式

本次不另外複製或重寫學期作品內容，而以既有公開 Space 作為事實來源。若日後需要建立可篩選作品牆，每筆資料至少包含：

- `title`：公開作品名稱。
- `kind`：報告、網站、AI 實作或模擬。
- `status`：`published`、`draft`、`hidden` 或 `needs-assets`。
- `summary`：有來源、適合公開的簡短說明。
- `sourceUrl`：原始作品或公開說明網址。
- `asset`：經確認可公開的圖片；沒有素材時留空，不製作假畫面。
- `limitation`：已知限制或使用條件。

只有 `published` 可以當作完成作品呈現；`draft` 必須明確標示未完成，`hidden` 不輸出，`needs-assets` 隱藏或標示內容整理中。

### 素材缺口

- PDF 翻譯沒有可公開 Repository、Demo 或畫面，因此只保留文字決策流程。
- 畢業學分規則沒有經教務處確認的完整規則表，不能在本站重建一套看似正式的假資料 Demo。
- 學期作品的細項素材保留在既有 Space；本 repository 不重複下載大型影片與 PDF。
- 若日後補素材，建議檔名為 `content-input/assets/pdf-translator/before-after-redacted.*`、`content-input/assets/credit-calculator/demo-fake-data.*`，且需先確認不含帳密、學號、成績或本機路徑。

## 問題畫布

使用者輸入：

- 我看見的問題
- 誰會遇到這個問題
- 現在怎麼處理
- 我的做法有什麼不同
- 如何驗證
- 何時停止

所有內容只保留在目前瀏覽器頁面，不上傳、不持久化。支援一鍵複製文字摘要與明確錯誤狀態。

## 個人實作原則

三個案例共同整理成六個可轉用的問題：

1. 真正困擾的是誰？
2. 現有方法為什麼不夠？
3. 我的做法有什麼不同？
4. 哪些執行工作適合交給 AI？
5. 看見什麼證據才算有效？
6. 出現什麼情況就應該停止？

首頁的責任分工與問題畫布共同承擔這段內容，不另做抽象口號區塊。

## 展示模式

- `?present=1` 可直接開啟。
- 顯示章節進度、已用時間與方向鍵提示。
- `Escape` 結束；方向鍵切換章節。
- 游標位於輸入、選單或可編輯區域時，不攔截方向鍵。
- 完整講者筆記存放在 `content-input/private-do-not-publish/`，不進入 Git 或靜態輸出。

## 視覺延續

- 延續黃色、紫色、黑色、大字標題、終端機與工作流語彙。
- 使用不同版型呈現時間軸、判斷流程、責任分工、資料證據與互動表單。
- 不把所有內容做成相同卡片，不加入無意義動畫。

## 隱私與公開規則

- 不提交或顯示帳號、密碼、Cookie、Session、Token、API Key、真實學號或未授權學生資料。
- 外部 iframe 必須清楚標示來源、資料流與風險。
- 現有 TempoTerm 圖片需移除本機使用者名稱與 `C:\Users\...` 路徑後才可繼續公開。
- `private-do-not-publish/` 必須保持 Git 忽略。
- 公開聯絡信箱為 `jimmymochi@gmail.com`。

### 學分 Demo 的公開決策

原始規格偏好完全前端假資料 Demo；訪談後，Jimmy 明確選擇直接嵌入現有 Hugging Face Space，並表示現場以自己的帳號操作。這項後續決定取代假資料 Demo，但不代表可以宣稱「本機處理」或「完全安全」。

因此實作必須：

- 預設不載入 iframe，先顯示資料流與風險。
- 明確說明帳密與修課資料會傳到外部 Hugging Face Space 伺服器。
- 不在本站讀取、記錄或保存 iframe 內容。
- 提醒投影與錄影環境不要顯示帳密或完整修課資料。
- 不以自動結果取代校方正式審查。

## 工程修正

- 移除對被 Git 忽略的 `.openai/hosting.json` 與 `build/sites-vite-plugin` 的硬依賴。
- 不建立後端、資料庫、登入系統或 CMS。
- 移除無法在 production runtime 啟動的 Dockerfile，README 改以 Hugging Face Static Space 為正式部署方式。
- 集中品牌、日期、路由、外部 Space、Repository 與聯絡資訊。
- CopyButton 提供 Clipboard API fallback、錯誤訊息與可存取狀態。
- 統一 canonical route 與靜態 alias。

## 測試與驗收

- `npm run lint`、`npm run typecheck`、`npm test`、`npm run export:hf` 全數通過。
- published 案例具備必填內容；hidden 不輸出；不得有 `【請填寫】`。
- 掃描常見 Token、Cookie、Authorization、Email、學號與本機路徑。
- 驗證首頁、`/lab`、`/tempo` 與所有靜態 alias。
- Playwright 驗證導覽、Skills 篩選、終端模擬、工作流、成果燈箱、兩個 iframe gate、問題畫布與展示模式。
- 390px 無水平溢出；鍵盤、焦點、Escape、reduced motion 與狀態提示可用。

## 驗收標準

- 首頁依序呈現核心主張、三個案例、AI／人的責任分工、問題畫布、其他作品與收束問題。
- PDF 案例不出現虛構 Demo；學分與 00981A 限制在首次閱讀時可見。
- 學分 Space 與學期作品 Space 在使用者點擊前都不建立 iframe。
- `/`、`/lab`、`/tempo` 在本機與靜態輸出可開啟，`.html` 相容別名存在。
- 私密講者筆記、原始未遮蔽圖片、`.env` 與 build cache 不出現在 Git 或 `hf-static-output/`。
- 所有 published 案例必填欄位非空，非 published 案例不被包裝成完成品。
- TypeScript、ESLint、render tests、static export tests 與 Secret 掃描全部通過。
- Playwright 實際操作涵蓋導覽、Skills、終端模擬、問題畫布、展示模式、燈箱與 390px 響應式版面。
- QA 截圖保存於 `docs/qa-screenshots/`，不含帳密或學生資料。

## 實作順序

1. 內容規格、集中設定與案例資料。
2. 建置、路由、Docker、CopyButton 與機密掃描基線。
3. 首頁故事線與三個案例。
4. 外部 Space、問題畫布與展示模式。
5. 隱私、SEO、效能、無障礙與文案審查。
6. 靜態輸出、瀏覽器測試、README 與交付。

## 建議 commits

1. `docs: add content and implementation specification`
2. `fix: stabilize build routes and static export`
3. `feat: add personal journey and project cases`
4. `feat: add external demos and problem canvas`
5. `test: expand content export and browser validation`
6. `docs: update usage privacy and deployment guide`
