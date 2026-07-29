export type BuildStage = {
  order: string;
  title: string;
  question: string;
  work: string;
  tools: string[];
  output: string;
};

export type ProductionIdea = {
  order: string;
  title: string;
  idea: string;
  reason: string;
  onSite: string;
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
    tools: ["原始任務", "Markdown"],
    output: "一份可追溯的改版任務，而不是一句「幫我做漂亮一點」。",
  },
  {
    order: "01",
    title: "完整盤點 repository",
    question: "現有網站哪些要保留，哪些真的壞了？",
    work:
      "閱讀頁面、元件、資料、CSS、測試、靜態匯出與部署設定，先理解原本設計系統，再決定修改範圍。",
    tools: ["Codex", "rg", "Git"],
    output: "確認保留原有工具教學，主線改成個人實作故事。",
  },
  {
    order: "02",
    title: "一次只問一題",
    question: "缺少的事實，會不會改變故事或公開方式？",
    work:
      "用需求訪談逐步確認核心觀點、案例篇幅、作品嵌入、口頭 Demo、已知限制與提問方式。",
    tools: ["Grill Me", "對話紀錄"],
    output: "把模糊偏好變成可以實作、可以驗收的決定。",
  },
  {
    order: "03",
    title: "把討論寫成規格",
    question: "怎麼避免做著做著又偏回工具展示？",
    work:
      "整理內容規格、資訊架構、案例定位、公開與私人內容分界、測試條件及建議提交順序。",
    tools: ["Markdown", "Humanizer zh-TW"],
    output: "docs/content-spec.md 成為內容與工程共同依據。",
  },
  {
    order: "04",
    title: "先穩住工程底座",
    question: "正式站能不能穩定建置與輸出？",
    work:
      "集中品牌與路由設定，整理 Vinext／Vite 靜態匯出流程，修正 metadata、資產與快取設定。",
    tools: ["TypeScript", "Vinext", "Vite", "Node.js"],
    output: "同一份程式可以本機開發，也可以輸出成 Hugging Face Static Space。",
  },
  {
    order: "05",
    title: "重寫故事與介面",
    question: "每個畫面能不能說明一個判斷？",
    work:
      "重排首頁敘事，讓 PDF、畢業學分與 00981A 分別對應停止、問題發現與可靠驗證；工具教學移到獨立頁。",
    tools: ["React 19", "CSS", "內容規格"],
    output: "案例不再只是作品列表，而是三次不同的決策。",
  },
  {
    order: "06",
    title: "把限制放進成品",
    question: "觀眾看到 Demo 時，會不會誤以為結果已被認證？",
    work:
      "加入外部嵌入告知、桌機建議、學分審查限制、投資資訊免責與私人資料掃描。",
    tools: ["React 元件", "Node test", "敏感資訊掃描"],
    output: "限制不是藏在頁尾，而是放在使用者做決定之前。",
  },
  {
    order: "07",
    title: "測試、部署、再從正式站重點一次",
    question: "測試通過，是否等於公開網站真的可用？",
    work:
      "執行型別、Lint、內容、靜態連結與瀏覽器測試；推送 GitHub 和 Hugging Face 後，再以正式網址操作。",
    tools: ["TypeScript", "ESLint", "Playwright", "GitHub Actions", "Hugging Face"],
    output: "找出 Static Space 的無副檔名路由問題，修正後重新部署與點擊驗證。",
  },
];

export const productionIdeas: ProductionIdea[] = [
  {
    order: "01",
    title: "先講人的判斷",
    idea: "AI 工具很快會普及，我想談的是怎麼找到問題、決定值不值得做，以及怎麼驗證。",
    reason: "如果首頁只列工具，觀眾記得的會是產品名稱，不是我真正想分享的工作方法。",
    onSite: "首頁先放三次實作判斷，工具教學另開「工具實驗室」。",
  },
  {
    order: "02",
    title: "案例不平均分配",
    idea: "畢業學分與 00981A 是我會在現場完整 Demo 的核心；PDF 翻譯用來說明為什麼有些點子應該停。",
    reason: "每個專案的價值不同。硬把篇幅切成三等份，反而看不出我在哪裡投入最多判斷。",
    onSite: "兩個核心案例有完整作品、限制與流程；PDF 案例保留停止理由。",
  },
  {
    order: "03",
    title: "真實問題要有起點",
    idea: "00981A 是我爸每天都要找資料、拉表格，問我能不能用 AI 處理之後，才慢慢做出來的。",
    reason: "這個背景比「我做了一套自動化」更能說明，為什麼我願意把流程做完整。",
    onSite: "案例從家裡的重複工作開始，再往資料取得、比對、Excel、PDF 與寄送展開。",
  },
  {
    order: "04",
    title: "作品要能直接操作",
    idea: "我希望觀眾看到完整網站，不只是一張截圖；現場也會用自己的帳號操作。",
    reason: "真正的 Demo 才看得到流程，但外部服務、登入資料與適用範圍也必須先說清楚。",
    onSite: "完整嵌入 Hugging Face Space，載入前顯示外部資料流、已知限制與桌機建議。",
  },
  {
    order: "05",
    title: "原型不能假裝成熟",
    idea: "畢業學分工具還可能有分類錯誤，尚未經教務處認證，也沒有適用所有學生。",
    reason: "把限制寫在成果後面，很容易讓觀眾先把原型誤認成正式系統。",
    onSite: "限制放在載入按鈕之前，並明寫正式畢業資格仍以學校與系所審核為準。",
  },
  {
    order: "06",
    title: "互動只做現場需要的事",
    idea: "提問環節是帶大家停下來想一下，不需要輸入框，也不需要網站保存答案。",
    reason: "多一個可輸入功能，會把注意力從現場分享拉到操作表單。",
    onSite: "留下 30 秒思考提示，移除輸入、複製與保存功能。",
  },
  {
    order: "07",
    title: "保留原本的視覺性格",
    idea: "我比較喜歡原來的大字、黑白灰與工作流畫面，不想為了改版換成另一套常見模板。",
    reason: "這套排版和分享主題本來就相合，真正需要改的是內容重心和局部互動。",
    onSite: "沿用原設計系統，調整資訊層級、案例篇幅與 TempoTerm 動態，不重做品牌外觀。",
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
    title: "整理想法與需求",
    tools: ["Grill Me", "內容規格", "Humanizer zh-TW"],
    use:
      "Grill Me 一次追問一個會改變網站的問題；確認後整理成內容規格，再檢查繁中語氣。",
    output: "核心主張、案例權重、公開邊界與 docs/content-spec.md。",
  },
  {
    order: "02",
    title: "盤點與修改程式",
    tools: ["Codex Desktop", "rg", "Git"],
    use:
      "Codex 讀取 repository、修改檔案並執行檢查；rg 找出路由與文案來源；Git 留下每次修改。",
    output: "可追溯的程式變更、差異檢查與分段提交。",
  },
  {
    order: "03",
    title: "建立網站介面",
    tools: ["React 19", "TypeScript", "Vinext", "Vite", "CSS"],
    use:
      "React 組合案例與互動元件，TypeScript 管理資料結構，CSS 延續原本視覺，Vinext 與 Vite 負責建置。",
    output: "可在桌機與手機閱讀、可輸出成純靜態檔案的網站。",
  },
  {
    order: "04",
    title: "檢查內容與操作",
    tools: ["tsc", "ESLint", "Node test", "Playwright"],
    use:
      "檢查型別、程式品質、必要文案、靜態連結、敏感資訊與真實瀏覽器操作。",
    output: "自動化測試結果、桌機與手機畫面，以及正式站點擊紀錄。",
  },
  {
    order: "05",
    title: "建置與公開",
    tools: ["GitHub Actions", "GitHub Pages", "Hugging Face Static Space", "HTTP"],
    use:
      "GitHub 保存原始碼並自動建置 Pages；同一份靜態輸出同步到 Hugging Face，最後用正式網址重測。",
    output: "兩個公開網站、部署紀錄，以及主機路由問題的修正證據。",
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
