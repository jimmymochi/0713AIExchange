export type ProjectStatus = "published" | "draft" | "hidden" | "needs-assets";

export type ProjectCase = {
  id: "pdf" | "credits" | "workflow";
  order: string;
  status: ProjectStatus;
  period: string;
  title: string;
  role: string;
  question: string;
  problem: string;
  aiWork: string[];
  humanWork: string[];
  result: string;
  limitation: string;
};

export const projectCases: ProjectCase[] = [
  {
    id: "pdf",
    order: "01",
    status: "published",
    period: "4 月—5 月",
    title: "PDF 翻譯工具",
    role: "知道何時停止",
    question: "做得出來，就值得繼續做嗎？",
    problem:
      "課程需要閱讀英文論文。我想在翻成繁體中文的同時，盡量保留原本排版。",
    aiWork: ["協助建立翻譯原型", "完成一份 PDF 的文字翻譯"],
    humanWork: ["檢查排版穩定性", "比較既有工具", "判斷差異是否足夠"],
    result:
      "原型確實能翻譯，但排版不穩。比較市面上的成熟方案後，我決定不再繼續投入。",
    limitation:
      "目前沒有可公開的 Repository、Demo 或畫面。本案例只呈現有來源的決策歷程。",
  },
  {
    id: "credits",
    order: "02",
    status: "published",
    period: "5 月—6 月",
    title: "畢業學分計算網站",
    role: "找到值得解決的問題",
    question: "資料都在，為什麼學生還是不知道自己能不能畢業？",
    problem:
      "校務系統能列出成績和課程，卻不會直接解釋畢業門檻。規則分散、分類複雜，人工核對很容易漏掉。",
    aiWork: ["解析成績單", "整理畢業規則", "協助分類課程與產生報告"],
    humanWork: ["定義學生真正要看的結果", "人工核對分類", "標出不能自動判斷的情況"],
    result:
      "網站能整理已完成與仍缺少的學分類別，支援地生系及部分雙主修／輔系情境。",
    limitation:
      "結果可能仍有分類錯誤，可持續修正；尚未經教務處認證，也不適用所有學生。",
  },
  {
    id: "workflow",
    order: "03",
    status: "published",
    period: "7 月",
    title: "00981A 自動化工作流",
    role: "把成果做得可靠",
    question: "自動產出一份報告，怎樣才算真的完成？",
    problem:
      "家人每天要到網站找資料、整理表格，問我能不能用 AI 接手這段重複工作。",
    aiWork: ["取得兩期資料", "比較持股變化", "產生 Excel 與 PDF", "寄送完成通知"],
    humanWork: ["選擇官方來源", "設定資料筆數檢查", "處理失敗重試", "確認輸出與免責說明"],
    result:
      "流程會依序取得資料、驗證完整性、產生兩種報告，再寄送完成通知。",
    limitation:
      "網站展示的是 2026/07/28 教學快照，不是即時投資資訊，也不構成投資建議。",
  },
];

export const isPublishedCase = (project: Pick<ProjectCase, "status">) =>
  project.status === "published";

export const publishedCases = projectCases.filter(isPublishedCase);
