"use client";

import { useState } from "react";

export default function CopyButton({
  text,
  label = "複製",
  className = "",
}: {
  text: string;
  label?: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };

  return (
    <button className={`copy-button ${className}`} type="button" onClick={copy}>
      <span aria-hidden="true">{copied ? "✓" : "⧉"}</span>
      {copied ? "已複製" : label}
    </button>
  );
}
