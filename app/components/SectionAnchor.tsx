"use client";

import type { MouseEvent, ReactNode } from "react";

type Props = {
  children: ReactNode;
  href: `#${string}`;
};

export default function SectionAnchor({ children, href }: Props) {
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    if (
      event.button !== 0 ||
      event.altKey ||
      event.ctrlKey ||
      event.metaKey ||
      event.shiftKey
    ) {
      return;
    }

    const target = document.querySelector<HTMLElement>(href);
    if (!target) return;

    event.preventDefault();
    window.history.pushState(null, "", href);
    target.scrollIntoView({ behavior: "auto", block: "start" });
  };

  return (
    <button
      type="button"
      aria-controls={href.slice(1)}
      data-section-anchor
      onClick={handleClick}
    >
      {children}
    </button>
  );
}
