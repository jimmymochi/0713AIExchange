export type BuildStage = {
  order: string;
  title: string;
  question: string;
  work: string;
  output: string;
};

export type ConversationDecision = {
  order: string;
  jimmy: string;
  decision: string;
  effect: string;
};

export type BuildIssue = {
  status: "已解決" | "持續注意";
  title: string;
  symptom: string;
  cause: string;
  response: string;
  proof: string;
};

export const buildStages: BuildStage[] = [
  {
    order: "00",
    title: "先寫清楚，不急著改",
    question: "這場分享真正要留下什麼？",
    work:
      "原始任務先定義聽眾、60 分鐘分享情境、公開範圍、三個案例與不能跨過的隱私界線。",
    output: "一份可追溯的改版任務，而不是一句「幫我做漂亮一點」。",
  },
  {
    order: "01",
    title: "完整盤點 repository",
    question: "現有網站哪些要保留，哪些真的壞了？",
    work:
      "閱讀頁面、元件、資料、CSS、測試、靜態匯出與部署設定，先理解原本設計系統，再決定修改範圍。",
    output: "確認保留原有工具教學，主線改成個人實作故事。",
  },
  {
    order: "02",
    title: "一次只問一題",
    question: "缺少的事實，會不會改變故事或公開方式？",
    work:
      "用需求訪談逐步確認核心觀點、案例篇幅、作品嵌入、口頭 Demo、已知限制與提問方式。",
    output: "把模糊偏好變成可以實作、可以驗收的決定。",
  },
  {
    order: "03",
    title: "把討論寫成規格",
    question: "怎麼避免做著做著又偏回工具展示？",
    work:
      "整理內容規格、資訊架構、案例定位、公開與私人內容分界、測試條件及建議提交順序。",
    output: "docs/content-spec.md 成為內容與工程共同依據。",
  },
  {
    order: "04",
    title: "先穩住工程底座",
    question: "正式站能不能穩定建置與輸出？",
    work:
      "集中品牌與路由設定，整理 Vinext／Vite 靜態匯出流程，修正 metadata、資產與快取設定。",
    output: "同一份程式可以本機開發，也可以輸出成 Hugging Face Static Space。",
  },
  {
    order: "05",
    title: "重寫故事與介面",
    question: "每個畫面能不能說明一個判斷？",
    work:
      "重排首頁敘事，讓 PDF、畢業學分與 00981A 分別對應停止、問題發現與可靠驗證；工具教學移到獨立頁。",
    output: "案例不再只是作品列表，而是三次不同的決策。",
  },
  {
    order: "06",
    title: "把限制放進成品",
    question: "觀眾看到 Demo 時，會不會誤以為結果已被認證？",
    work:
      "加入外部嵌入告知、桌機建議、學分審查限制、投資資訊免責與私人資料掃描。",
    output: "限制不是藏在頁尾，而是放在使用者做決定之前。",
  },
  {
    order: "07",
    title: "測試、部署、再從正式站重點一次",
    question: "測試通過，是否等於公開網站真的可用？",
    work:
      "執行型別、Lint、內容、靜態連結與瀏覽器測試；推送 GitHub 和 Hugging Face 後，再以正式網址操作。",
    output: "找出 Static Space 的無副檔名路由問題，修正後重新部署與點擊驗證。",
  },
];

export const conversationDecisions: ConversationDecision[] = [
  {
    order: "01",
    jimmy:
      "AI 的能力正在快速普及。真正重要的是能否發現值得解決的問題、提出不同的想法，並設計可靠的驗證方式。",
    decision:
      "首頁不從工具名稱開始，改從「人要決定做什麼」開始。工具仍保留，但退到支援角色。",
    effect: "確立整個網站的主張",
  },
  {
    order: "02",
    jimmy: "畢業學分計算網站和 00981A 都要網站篇幅最多、現場分享最深入的核心案例。",
    decision:
      "PDF 翻譯保留為主動停止的案例；畢業學分與 00981A 分別承擔問題發現和可靠交付兩條主線。",
    effect: "重新分配案例篇幅",
  },
  {
    order: "03",
    jimmy:
      "當初是我爸覺得每天都要自己去網站找資料、拉表格，問我有沒有辦法用 AI 完成，所以我才慢慢把它變成現實。",
    decision:
      "00981A 不再被寫成抽象的自動化展示，改從一個家裡真實存在的重複工作開始。",
    effect: "補上專案真正的起點",
  },
  {
    order: "04",
    jimmy: "我希望可以整個嵌入，補上建議用電腦開啟。",
    decision:
      "保留完整外部作品，但在載入前先說明來源與風險；載入後仍呈現原本的完整網站。",
    effect: "兼顧完整 Demo 與告知",
  },
  {
    order: "05",
    jimmy:
      "可能有點錯誤，還可以再修改；尚未經教務處認證，目前也沒有適用所有學生。",
    decision:
      "把這段限制放在學分案例與 Demo 前，不把原型包裝成正式審查工具。",
    effect: "明確標出可信範圍",
  },
  {
    order: "06",
    jimmy:
      "我比較喜歡原來的排版、顏色。有一個提問環節，但不要有可以輸入的文字框，我只需要帶領他們思考一下問題。",
    decision:
      "恢復原本的大字、黑白灰與工作流視覺；移除輸入、複製和保存，留下 30 秒思考提示。",
    effect: "視覺與互動一起收斂",
  },
  {
    order: "07",
    jimmy: "工具實驗室和 TempoTerm 都顯示 Entry not found。",
    decision:
      "不只檢查原始碼，直接用正式網址重現。確認 Static Space 不解析無副檔名路徑後，公開連結統一改用 .html。",
    effect: "從正式環境回推根因",
  },
];

export const buildIssues: BuildIssue[] = [
  {
    status: "已解決",
    title: "正式站顯示 Entry not found",
    symptom: "/lab 與 /tempo 在本機路由正常，部署到 Hugging Face 後卻是 404。",
    cause: "Static Space 不會自動把無副檔名路徑解析成資料夾裡的 index.html。",
    response: "保留來源路由，公開導覽、canonical 與 sitemap 統一改成 /lab.html、/tempo.html。",
    proof: "HTTP 200，再從首頁實際點擊兩個入口確認。",
  },
  {
    status: "持續注意",
    title: "完整嵌入與登入資料風險",
    symptom: "畢業學分網站需要登入，直接載入容易讓訪客忽略資料會送到外部 Space。",
    cause: "主網站無法替另一個服務保證它如何處理帳密與修課資料。",
    response: "載入前顯示資料流與限制；使用者確認後才建立 iframe，並保留完整外部頁面。",
    proof: "初始 HTML 不含 iframe；點擊後才載入指定 Hugging Face 網域。",
  },
  {
    status: "已解決",
    title: "原始應用與靜態輸出不是同一種路由",
    symptom: "開發環境使用 /lab，公開檔案則需要 lab.html 與 lab/index.html。",
    cause: "應用路由與純靜態主機的檔案解析規則不同。",
    response: "用單一匯出腳本產生首頁、資料夾路由與相容別名，測試每個實際檔案都存在。",
    proof: "靜態連結測試逐一解析 href 與 src 的目的地。",
  },
  {
    status: "持續注意",
    title: "AI 很容易把未確認內容補得太完整",
    symptom: "案例規則、正確率與隱私描述若只靠推測，會讓原型看起來比實際成熟。",
    cause: "缺少資料時，流暢文字常讓不確定內容被誤認為事實。",
    response: "只使用訪談、素材與可檢查檔案；不確定的地方直接寫限制，不自行補數字。",
    proof: "測試掃描未填欄位、誇大安全宣稱、敏感格式與必要免責文字。",
  },
  {
    status: "已解決",
    title: "部署更新後，資產快取不能一起失效",
    symptom: "每次同步靜態輸出都可能覆蓋 Hugging Face 專用設定，讓快取策略失效。",
    cause: "部署資料夾同時包含建置產物和 Space repository 的控制檔。",
    response: "同步時保留 repository metadata，再驗證長效快取 header 仍存在。",
    proof: "匯出測試確認 _headers 與 immutable 資產規則。",
  },
];

export const toolGroups = [
  {
    order: "01",
    title: "把問題問清楚",
    tools: ["Grill Me", "內容規格", "Humanizer zh-TW"],
    detail:
      "訪談一次只處理一個會影響內容或公開方式的缺口。確認後寫成規格，再把文案改回自然的臺灣繁體中文。",
  },
  {
    order: "02",
    title: "讀懂與修改專案",
    tools: ["OpenAI Codex", "Antigravity CLI", "Git"],
    detail:
      "讀取 repository、修改程式、比較差異並拆分提交。AI 負責加速執行，我決定故事、案例權重與哪些結果可以公開。",
  },
  {
    order: "03",
    title: "做出靜態網站",
    tools: ["React 19", "TypeScript", "Vinext", "Vite", "CSS"],
    detail:
      "沿用原本的 React 架構與設計語言，不加資料庫或登入系統。網站最後輸出成純靜態檔案。",
  },
  {
    order: "04",
    title: "驗證不是靠感覺",
    tools: ["TypeScript", "ESLint", "Node test", "Playwright"],
    detail:
      "從型別與程式品質，到內容、靜態路由、敏感資訊與真實瀏覽器操作，分層檢查同一個成果。",
  },
  {
    order: "05",
    title: "交付到正式環境",
    tools: ["GitHub", "Hugging Face Static Space", "HTTP production check"],
    detail:
      "程式碼與公開網站分開推送。部署後仍用正式網址重跑入口與關鍵互動，因為本機通過不代表主機規則相同。",
  },
];

export const commitTrace = [
  ["cf9220f", "把訪談整理成內容與實作規格"],
  ["2f6b165", "穩定建置、路由與靜態匯出"],
  ["2b96663", "加入個人歷程與三個案例"],
  ["c09a361", "擴充內容、匯出與瀏覽器驗證"],
  ["dede057", "恢復原本視覺並簡化提問環節"],
  ["ecd43b1", "修正 Hugging Face 公開頁面連結"],
] as const;
