"use client";

import { useMemo, useState } from "react";
import CopyButton from "./CopyButton";

const prompts = [
  ["problem", "我看見的問題", "哪一件事一直很麻煩？"],
  ["people", "誰會遇到", "具體是哪一群人？"],
  ["current", "現在怎麼處理", "目前的方法卡在哪裡？"],
  ["difference", "我的做法", "和現有方案有什麼不同？"],
  ["proof", "如何驗證", "看到什麼才算有效？"],
  ["stop", "何時停止", "出現什麼情況就不再投入？"],
] as const;

type FieldId = (typeof prompts)[number][0];
type CanvasValues = Record<FieldId, string>;

const initialValues: CanvasValues = {
  problem: "",
  people: "",
  current: "",
  difference: "",
  proof: "",
  stop: "",
};

export default function ProblemCanvas() {
  const [values, setValues] = useState(initialValues);

  const summary = useMemo(
    () =>
      prompts
        .map(([, label]) => {
          const id = prompts.find((item) => item[1] === label)?.[0];
          return `${label}：${id ? values[id] || "尚未填寫" : "尚未填寫"}`;
        })
        .join("\n"),
    [values],
  );

  const completed = Object.values(values).filter((value) => value.trim()).length;

  return (
    <div className="problem-canvas">
      <div className="canvas-status" aria-live="polite">
        <span>{completed} / {prompts.length}</span>
        <div aria-hidden="true">
          <i style={{ width: `${(completed / prompts.length) * 100}%` }} />
        </div>
      </div>
      <div className="canvas-fields">
        {prompts.map(([id, label, placeholder], index) => (
          <label key={id}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <strong>{label}</strong>
            <textarea
              value={values[id]}
              onChange={(event) =>
                setValues((current) => ({ ...current, [id]: event.target.value }))
              }
              placeholder={placeholder}
              rows={3}
            />
          </label>
        ))}
      </div>
      <div className="canvas-actions">
        <p>內容只保留在目前頁面，不會上傳或儲存。</p>
        <div>
          <button type="button" onClick={() => setValues(initialValues)}>
            清除內容
          </button>
          <CopyButton text={summary} label="複製我的問題畫布" />
        </div>
      </div>
    </div>
  );
}
