"use client";

import { useId, useState } from "react";

type CopyState = "idle" | "copied" | "error";

function legacyCopy(text: string) {
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.select();
  const copied = document.execCommand("copy");
  textarea.remove();
  if (!copied) throw new Error("copy command failed");
}

export default function CopyButton({
  text,
  label = "複製",
  className = "",
}: {
  text: string;
  label?: string;
  className?: string;
}) {
  const [state, setState] = useState<CopyState>("idle");
  const errorId = useId();

  const copy = async () => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        legacyCopy(text);
      }
      setState("copied");
    } catch {
      setState("error");
    }
    window.setTimeout(() => setState("idle"), 2200);
  };

  return (
    <span className="copy-control">
      <button
        className={`copy-button ${className}`}
        type="button"
        onClick={copy}
        aria-describedby={state === "error" ? errorId : undefined}
      >
        <span aria-hidden="true">
          {state === "copied" ? "✓" : state === "error" ? "!" : "⧉"}
        </span>
        {state === "copied" ? "已複製" : state === "error" ? "複製失敗" : label}
      </button>
      <span className="sr-only" aria-live="polite">
        {state === "copied"
          ? "內容已複製"
          : state === "error"
            ? "無法存取剪貼簿，請手動選取內容"
            : ""}
      </span>
      {state === "error" && (
        <span className="copy-error" id={errorId}>
          請手動選取內容
        </span>
      )}
    </span>
  );
}
