"use client";

import { useState, type KeyboardEvent } from "react";
import { workflowNodes } from "../data";
import useSlidingPill from "./useSlidingPill";

const workflowModes = ["failure", "success"] as const;
type WorkflowMode = (typeof workflowModes)[number];

export default function WorkflowExplorer() {
  const [mode, setMode] = useState<WorkflowMode>("success");
  const [selected, setSelected] = useState(1);
  const node = workflowNodes[selected];
  const {
    containerRef,
    pill,
    registerButton,
    movePillTo,
    focusButton,
  } = useSlidingPill(mode, workflowModes);

  const chooseMode = (next: WorkflowMode) => {
    setMode(next);
    if (next === "failure") setSelected(1);
  };

  const handleModeKeyDown = (
    event: KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) => {
    let nextIndex = index;
    if (event.key === "ArrowLeft") nextIndex = (index - 1 + workflowModes.length) % workflowModes.length;
    else if (event.key === "ArrowRight") nextIndex = (index + 1) % workflowModes.length;
    else if (event.key === "Home") nextIndex = 0;
    else if (event.key === "End") nextIndex = workflowModes.length - 1;
    else return;

    event.preventDefault();
    const next = workflowModes[nextIndex];
    chooseMode(next);
    focusButton(next);
  };

  return (
    <div className={`workflow-explorer ${mode}`}>
      <div className="workflow-toolbar">
        <div>
          <span className="mono-label">00981A / 2026-07-28</span>
          <strong>{mode === "success" ? "修正後成功流程" : "原本失敗流程"}</strong>
        </div>
        <div
          ref={containerRef}
          className="mode-toggle"
          role="tablist"
          aria-label="工作流狀態"
        >
          <span
            className="mode-toggle-pill"
            style={{ left: pill.left, width: pill.width }}
            aria-hidden="true"
          />
          {workflowModes.map((item, index) => (
            <button
              ref={registerButton(item)}
              type="button"
              role="tab"
              id={`workflow-mode-${item}`}
              aria-selected={mode === item}
              aria-controls="workflow-mode-panel"
              tabIndex={mode === item ? 0 : -1}
              className={mode === item ? "active" : ""}
              onClick={(event) => {
                movePillTo(event.currentTarget);
                chooseMode(item);
              }}
              onKeyDown={(event) => handleModeKeyDown(event, index)}
              key={item}
            >
              {item === "failure" ? "原本失敗" : "修正成功"}
            </button>
          ))}
        </div>
      </div>

      <div
        className="workflow-track"
        id="workflow-mode-panel"
        role="tabpanel"
        aria-labelledby={`workflow-mode-${mode}`}
        aria-label="00981A 自動化工作流"
      >
        {workflowNodes.map((item, index) => {
          const failed = mode === "failure" && index === 1;
          const blocked = mode === "failure" && index > 1;
          return (
            <button
              type="button"
              className={`${selected === index ? "selected" : ""} ${failed ? "failed" : ""} ${blocked ? "blocked" : ""}`}
              onClick={() => setSelected(index)}
              key={item.id}
            >
              <span className="node-time">{item.time}</span>
              <i className="node-light" aria-hidden="true" />
              <strong>{item.label}</strong>
              <small>{blocked ? "未執行" : failed ? "解析停止" : item.short}</small>
            </button>
          );
        })}
      </div>

      <div className="workflow-detail">
        <div className="detail-index">{String(selected + 1).padStart(2, "0")}</div>
        <div>
          <span className="mono-label">SELECTED NODE</span>
          <h3>{node.label}</h3>
          {mode === "failure" && selected === 1 ? (
            <p className="failure-callout">
              官方頁面的載入狀態改變，第一次嘗試無法解析完整 PCF。舊流程把暫時性失敗當成最終結果，因此後續報告沒有執行。
            </p>
          ) : (
            <p>{node.process}</p>
          )}
        </div>
        <dl>
          <div><dt>輸入</dt><dd>{node.input}</dd></div>
          <div><dt>輸出</dt><dd>{node.output}</dd></div>
          <div><dt>安全檢查</dt><dd>{node.check}</dd></div>
          {mode === "success" && selected === 1 && (
            <div className="fix-row">
              <dt>修正</dt>
              <dd>加入自動重試、延遲等待與資料筆數驗證；18:44 第二次取得成功。</dd>
            </div>
          )}
        </dl>
      </div>
    </div>
  );
}
