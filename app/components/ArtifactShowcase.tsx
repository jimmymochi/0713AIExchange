"use client";

import {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";
import Image from "next/image";
import DownloadLink from "./DownloadLink";

type Sheet = { name: string; rows: Array<Array<string | number>> };
type ArtifactView = "mail" | "excel" | "pdf";

const artifactTabs: Array<{
  id: ArtifactView;
  number: string;
  label: string;
}> = [
  { id: "mail", number: "01", label: "完成通知" },
  { id: "excel", number: "02", label: "Excel / 2 sheets" },
  { id: "pdf", number: "03", label: "PDF / 3 pages" },
];

function excelRowClass(sheetIndex: number, rowIndex: number) {
  if (sheetIndex === 1 && rowIndex === 0) return "excel-header excel-header-gray";
  if (sheetIndex !== 0) return "";
  if ([4, 13, 18, 23, 78].includes(rowIndex)) return "excel-header";
  if ([0, 3, 11, 22, 77].includes(rowIndex)) return "excel-section";
  return "";
}

function excelCellClass(
  sheetIndex: number,
  rowIndex: number,
  cellIndex: number,
  value: string | number,
) {
  if (
    sheetIndex === 0 &&
    rowIndex >= 24 &&
    rowIndex < 77 &&
    [4, 7].includes(cellIndex) &&
    typeof value === "number"
  ) {
    if (value > 0) return "excel-change-positive";
    if (value < 0) return "excel-change-negative";
  }
  return "";
}

function displayExcelCell(
  sheetIndex: number,
  rowIndex: number,
  cellIndex: number,
  value: string | number,
) {
  if (typeof value !== "number") return String(value);

  if (sheetIndex === 0 && rowIndex >= 24 && rowIndex < 77) {
    if ([2, 3].includes(cellIndex)) return value.toLocaleString("zh-TW");
    if (cellIndex === 4) {
      const sign = value > 0 ? "+" : "";
      return `${sign}${value.toLocaleString("zh-TW")}`;
    }
    if ([5, 6].includes(cellIndex)) return `${(value * 100).toFixed(2)}%`;
    if (cellIndex === 7) {
      const sign = value > 0 ? "+" : "";
      return `${sign}${(value * 100).toFixed(2)}%`;
    }
  }

  if (sheetIndex === 0 && rowIndex >= 79) {
    if (cellIndex === 3) return value.toLocaleString("zh-TW");
    if (cellIndex === 4) return `${(value * 100).toFixed(2)}%`;
  }

  if (sheetIndex === 1 && rowIndex > 0) {
    if (cellIndex === 3) return value.toLocaleString("zh-TW");
    if (cellIndex === 4) return `${(value * 100).toFixed(2)}%`;
  }

  return value.toLocaleString("zh-TW");
}

export default function ArtifactShowcase() {
  const [view, setView] = useState<ArtifactView>("mail");
  const [pill, setPill] = useState({ left: 0, width: 0 });
  const [zoomed, setZoomed] = useState(false);
  const [sheets, setSheets] = useState<Sheet[]>([]);
  const [sheetIndex, setSheetIndex] = useState(0);
  const [query, setQuery] = useState("");
  const [pdfPage, setPdfPage] = useState(1);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<Record<ArtifactView, HTMLButtonElement | null>>({
    mail: null,
    excel: null,
    pdf: null,
  });

  useEffect(() => {
    fetch("/case/excel-data.json")
      .then((response) => response.json())
      .then((data) => setSheets(data.sheets ?? []))
      .catch(() => setSheets([]));
  }, []);

  useEffect(() => {
    if (!zoomed) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setZoomed(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [zoomed]);

  useLayoutEffect(() => {
    const activeButton = tabRefs.current[view];
    if (!activeButton) return;

    const syncPill = () => {
      setPill({
        left: activeButton.offsetLeft,
        width: activeButton.offsetWidth,
      });
    };

    syncPill();
    const observer = new ResizeObserver(syncPill);
    if (tabsRef.current) observer.observe(tabsRef.current);
    artifactTabs.forEach(({ id }) => {
      const button = tabRefs.current[id];
      if (button) observer.observe(button);
    });
    return () => observer.disconnect();
  }, [view]);

  const handleTabKeyDown = (
    event: ReactKeyboardEvent<HTMLButtonElement>,
    index: number,
  ) => {
    let nextIndex = index;
    if (event.key === "ArrowLeft") nextIndex = (index - 1 + artifactTabs.length) % artifactTabs.length;
    else if (event.key === "ArrowRight") nextIndex = (index + 1) % artifactTabs.length;
    else if (event.key === "Home") nextIndex = 0;
    else if (event.key === "End") nextIndex = artifactTabs.length - 1;
    else return;

    event.preventDefault();
    tabRefs.current[artifactTabs[nextIndex].id]?.focus();
    tabRefs.current[artifactTabs[nextIndex].id]?.click();
  };

  const rows = useMemo(() => {
    const source = sheets[sheetIndex]?.rows ?? [];
    const indexed = source.map((cells, sourceIndex) => ({ cells, sourceIndex }));
    if (!query.trim()) return indexed;
    const needle = query.trim().toLowerCase();
    return indexed.filter(({ cells }) =>
      cells.some((cell) => String(cell).toLowerCase().includes(needle)),
    );
  }, [query, sheetIndex, sheets]);

  return (
    <div className="artifact-shell">
      <div
        ref={tabsRef}
        className="artifact-tabs"
        role="tablist"
        aria-label="成果類型"
      >
        <span
          className="artifact-tab-pill"
          style={{ left: pill.left, width: pill.width }}
          aria-hidden="true"
        />
        {artifactTabs.map(({ id, number, label }, index) => (
          <button
            ref={(button) => {
              tabRefs.current[id] = button;
            }}
            type="button"
            role="tab"
            aria-selected={view === id}
            aria-controls={`artifact-panel-${id}`}
            id={`artifact-tab-${id}`}
            tabIndex={view === id ? 0 : -1}
            className={view === id ? "active" : ""}
            onClick={(event) => {
              setPill({
                left: event.currentTarget.offsetLeft,
                width: event.currentTarget.offsetWidth,
              });
              setView(id);
            }}
            onKeyDown={(event) => handleTabKeyDown(event, index)}
            key={id}
          >
            <span>{number}</span>{label}
          </button>
        ))}
        <div className="snapshot-badge">VERIFIED SNAPSHOT · 2026/07/28</div>
      </div>

      {view === "mail" && (
        <div
          className="mail-view"
          id="artifact-panel-mail"
          role="tabpanel"
          aria-labelledby="artifact-tab-mail"
        >
          <div className="viewer-toolbar">
            <span>AgentMail 完成通知（地址已遮蔽）</span>
            <button type="button" onClick={() => setZoomed(true)}>放大檢視 ↗</button>
          </div>
          <button className="image-stage" type="button" onClick={() => setZoomed(true)}>
            <Image
              src="/case/00981a-email-redacted.png"
              width={1778}
              height={888}
              unoptimized
              alt="00981A 分析完成通知郵件，寄件地址已遮蔽"
            />
          </button>
        </div>
      )}

      {view === "excel" && (
        <div
          className="excel-view"
          id="artifact-panel-excel"
          role="tabpanel"
          aria-labelledby="artifact-tab-excel"
        >
          <div className="viewer-toolbar excel-toolbar">
            <div className="sheet-tabs" role="tablist" aria-label="Excel 工作表">
              {sheets.map((sheet, index) => (
                <button
                  type="button"
                  role="tab"
                  aria-selected={sheetIndex === index}
                  className={sheetIndex === index ? "active" : ""}
                  onClick={() => setSheetIndex(index)}
                  key={sheet.name}
                >
                  {sheet.name}
                </button>
              ))}
            </div>
            <label className="sheet-search">
              <span className="sr-only">搜尋工作表</span>
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="搜尋股票、代碼或數值"
              />
              <span>{rows.length} 列</span>
            </label>
          </div>
          <div className="sheet-frame" tabIndex={0}>
            <table>
              <tbody>
                {rows.map(({ cells, sourceIndex }) => (
                  <tr
                    className={excelRowClass(sheetIndex, sourceIndex)}
                    key={`${sourceIndex}-${cells.join("-")}`}
                  >
                    <th>{sourceIndex + 1}</th>
                    {cells.map((cell, cellIndex) => (
                      <td
                        className={excelCellClass(sheetIndex, sourceIndex, cellIndex, cell)}
                        key={`${sourceIndex}-${cellIndex}`}
                      >
                        {displayExcelCell(sheetIndex, sourceIndex, cellIndex, cell)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {view === "pdf" && (
        <div
          className="pdf-view"
          id="artifact-panel-pdf"
          role="tabpanel"
          aria-labelledby="artifact-tab-pdf"
        >
          <div className="pdf-thumbs" aria-label="PDF 頁面">
            {[1, 2, 3].map((page) => (
              <button
                type="button"
                className={pdfPage === page ? "active" : ""}
                data-tooltip={`切換到第 ${page} 頁`}
                aria-label={`切換到 PDF 第 ${page} 頁`}
                onClick={() => setPdfPage(page)}
                key={page}
              >
                <Image
                  src={`/case/00981a-report-page-${page}.jpg`}
                  width={982}
                  height={1389}
                  unoptimized
                  alt={`PDF 第 ${page} 頁縮圖`}
                />
                <span>PAGE {page}</span>
              </button>
            ))}
          </div>
          <button className="pdf-stage" type="button" onClick={() => setZoomed(true)}>
            <Image
              src={`/case/00981a-report-page-${pdfPage}.jpg`}
              width={982}
              height={1389}
              unoptimized
              alt={`00981A PDF 報告第 ${pdfPage} 頁`}
            />
          </button>
          <div className="pdf-controls">
            <button type="button" onClick={() => setPdfPage(Math.max(1, pdfPage - 1))} disabled={pdfPage === 1}>← 上一頁</button>
            <span>{pdfPage} / 3</span>
            <button type="button" onClick={() => setPdfPage(Math.min(3, pdfPage + 1))} disabled={pdfPage === 3}>下一頁 →</button>
          </div>
        </div>
      )}

      <div className="artifact-downloads">
        <div>
          <strong>完整原始成果</strong>
          <span>下載後可用 Excel 或 PDF 閱讀器開啟</span>
        </div>
        <DownloadLink
          href="/downloads/20260728_00981A持股分析.xlsx"
          download
          toastMessage="Excel 下載開始"
        >
          下載 Excel · 12 KB
        </DownloadLink>
        <DownloadLink
          href="/downloads/20260728_00981A持股分析.pdf"
          download
          toastMessage="PDF 下載開始"
        >
          下載 PDF · 23.4 MB
        </DownloadLink>
      </div>

      {zoomed && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label="放大成果預覽">
          <button
            ref={closeButtonRef}
            className="lightbox-close"
            type="button"
            data-tooltip="按 Esc 也可以關閉"
            onClick={() => setZoomed(false)}
          >
            關閉 ×
          </button>
          <Image
            src={view === "mail" ? "/case/00981a-email-redacted.png" : `/case/00981a-report-page-${pdfPage}.jpg`}
            width={view === "mail" ? 1778 : 982}
            height={view === "mail" ? 888 : 1389}
            unoptimized
            alt={view === "mail" ? "放大的完成通知郵件" : `放大的 PDF 第 ${pdfPage} 頁`}
          />
        </div>
      )}
    </div>
  );
}
