"use client";

import { useId, useState, type ReactNode } from "react";

export default function SpringDetails({
  summary,
  children,
}: {
  summary: string;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const contentId = useId();

  return (
    <div className={`spring-details ${open ? "open" : ""}`}>
      <button
        className="spring-details-summary"
        type="button"
        aria-expanded={open}
        aria-controls={contentId}
        onClick={() => setOpen((value) => !value)}
      >
        <span>{summary}</span>
        <span className="spring-chevron" aria-hidden="true">↓</span>
      </button>
      <div className="spring-details-content" id={contentId} aria-hidden={!open}>
        <div>{children}</div>
      </div>
    </div>
  );
}
