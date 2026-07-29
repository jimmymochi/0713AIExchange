"use client";

import { useEffect, useId, useRef, useState } from "react";
import { showSiteToast } from "./ToastRegion";

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
  const resetTimer = useRef<number | null>(null);

  useEffect(
    () => () => {
      if (resetTimer.current) window.clearTimeout(resetTimer.current);
    },
    [],
  );

  const copy = async () => {
    if (resetTimer.current) window.clearTimeout(resetTimer.current);
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        legacyCopy(text);
      }
      setState("copied");
      showSiteToast("已複製到剪貼簿");
    } catch {
      setState("error");
      showSiteToast("複製失敗，請手動選取內容", "error");
    }
    resetTimer.current = window.setTimeout(() => setState("idle"), 2200);
  };

  return (
    <span className="copy-control">
      <button
        className={`copy-button ${className}`}
        type="button"
        onClick={copy}
        aria-describedby={state === "error" ? errorId : undefined}
      >
        <span className={`copy-icon ${state}`} aria-hidden="true">
          <svg className="copy-icon-default" viewBox="0 0 20 20">
            <rect x="6" y="6" width="10" height="10" />
            <path d="M4 13H3V3h10v1" />
          </svg>
          <svg className="copy-icon-success" viewBox="0 0 20 20">
            <path d="m4 10 4 4 8-9" />
          </svg>
          <svg className="copy-icon-error" viewBox="0 0 20 20">
            <path d="M10 4v8M10 15.5v.5" />
          </svg>
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
