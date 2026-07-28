"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";

type Sheet = { name: string; rows: Array<Array<string | number>> };

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
  const [view, setView] = useState<"mail" | "excel" | "pdf">("mail");
  const [zoomed, setZoomed] = useState(false);
  const [sheets, setSheets] = useState<Sheet[]>([]);
  const [sheetIndex, setSheetIndex] = useState(0);
  const [query, setQuery] = useState("");
  const [pdfPage, setPdfPage] = useState(1);

  useEffect(() => {
    fetch("/case/excel-data.json")
      .then((response) => response.json())
      .then((data) => setSheets(data.sheets ?? []))
      .catch(() => setSheets([]));
  }, []);

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
      <div className="artifact-tabs" role="tablist" aria-label="成果類型">
        {[
          ["mail", "01", "完成通知"],
          ["excel", "02", "Excel / 2 sheets"],
          ["pdf", "03", "PDF / 3 pages"],
        ].map(([id, number, label]) => (
          <button
            type="button"
            role="tab"
            aria-selected={view === id}
            className={view === id ? "active" : ""}
            onClick={() => setView(id as typeof view)}
            key={id}
          >
            <span>{number}</span>{label}
          </button>
        ))}
        <div className="snapshot-badge">VERIFIED SNAPSHOT · 2026/07/28</div>
      </div>

      {view === "mail" && (
        <div className="mail-view">
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
        <div className="excel-view">
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
        <div className="pdf-view">
          <div className="pdf-thumbs" aria-label="PDF 頁面">
            {[1, 2, 3].map((page) => (
              <button
                type="button"
                className={pdfPage === page ? "active" : ""}
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
        <a href="/downloads/20260728_00981A持股分析.xlsx" download>下載 Excel · 12 KB</a>
        <a href="/downloads/20260728_00981A持股分析.pdf" download>下載 PDF · 23.4 MB</a>
      </div>

      {zoomed && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label="放大成果預覽">
          <button className="lightbox-close" type="button" onClick={() => setZoomed(false)}>關閉 ×</button>
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
