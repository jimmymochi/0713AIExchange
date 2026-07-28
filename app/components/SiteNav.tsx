"use client";

import { useEffect, useState } from "react";

type Props = {
  page: "home" | "tutorial";
  sectionIds: string[];
};

export default function SiteNav({ page, sectionIds }: Props) {
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState(sectionIds[0] ?? "");
  const [presenting, setPresenting] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const height = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(height > 0 ? (window.scrollY / height) * 100 : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActive(visible.target.id);
      },
      { rootMargin: "-28% 0px -58% 0px", threshold: [0, 0.2, 0.6] },
    );
    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });
    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, [sectionIds]);

  useEffect(() => {
    if (!presenting) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (!["ArrowRight", "ArrowDown", "ArrowLeft", "ArrowUp"].includes(event.key)) return;
      event.preventDefault();
      const current = Math.max(0, sectionIds.indexOf(active));
      const direction = ["ArrowRight", "ArrowDown"].includes(event.key) ? 1 : -1;
      const next = Math.min(sectionIds.length - 1, Math.max(0, current + direction));
      document.getElementById(sectionIds[next])?.scrollIntoView({ behavior: "smooth" });
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active, presenting, sectionIds]);

  return (
    <>
      <div className="reading-progress" aria-hidden="true">
        <span style={{ width: `${progress}%` }} />
      </div>
      <nav className="site-nav" aria-label="主要導覽">
        <a className="brand" href="/">
          <span className="brand-mark">AI</span>
          <span className="brand-copy">
            <strong>0731 AI 分享</strong>
            <small>ANTIGRAVITY × CODEX</small>
          </span>
        </a>
        <div className="nav-center" aria-label="頁面切換">
          <a className={page === "home" ? "active" : ""} href="/">故事首頁</a>
          <a className={page === "tutorial" ? "active" : ""} href="/lab.html">互動教學</a>
        </div>
        <div className="nav-actions">
          <span className="active-section">{active.replaceAll("-", " / ")}</span>
          <button
            className={`present-button ${presenting ? "on" : ""}`}
            type="button"
            onClick={() => setPresenting((value) => !value)}
            aria-pressed={presenting}
          >
            <span aria-hidden="true">{presenting ? "●" : "▶"}</span>
            {presenting ? "展示中" : "展示模式"}
          </button>
        </div>
      </nav>
      {presenting && (
        <div className="present-hint" role="status">
          使用方向鍵切換章節 · 再按一次結束
        </div>
      )}
    </>
  );
}
