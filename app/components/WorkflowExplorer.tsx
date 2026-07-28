"use client";

import { useState } from "react";
import { workflowNodes } from "../data";

export default function WorkflowExplorer() {
  const [mode, setMode] = useState<"failure" | "success">("success");
  const [selected, setSelected] = useState(1);
  const node = workflowNodes[selected];

  return (
    <div className={`workflow-explorer ${mode}`}>
      <div className="workflow-toolbar">
        <div>
          <span className="mono-label">00981A / 2026-07-28</span>
          <strong>{mode === "success" ? "修正後成功流程" : "原本失敗流程"}</strong>
        </div>
        <div className="mode-toggle" role="group" aria-label="工作流狀態">
          <button
            type="button"
            className={mode === "failure" ? "active" : ""}
            onClick={() => {
              setMode("failure");
              setSelected(1);
            }}
          >
            原本失敗
          </button>
          <button
            type="button"
            className={mode === "success" ? "active" : ""}
            onClick={() => setMode("success")}
          >
            修正成功
          </button>
        </div>
      </div>

      <div className="workflow-track" aria-label="00981A 自動化工作流">
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
