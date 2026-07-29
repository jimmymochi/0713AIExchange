"use client";

import { useEffect, useState } from "react";
import { siteConfig } from "../site";

type Props = {
  page: "home" | "process" | "tutorial" | "tempo";
  sectionIds: string[];
};

function isEditableTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) return false;
  return (
    target.isContentEditable ||
    ["INPUT", "TEXTAREA", "SELECT", "BUTTON"].includes(target.tagName)
  );
}

export default function SiteNav({ page, sectionIds }: Props) {
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState(sectionIds[0] ?? "");
  const [presenting, setPresenting] = useState(false);
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setPresenting(new URLSearchParams(window.location.search).get("present") === "1");
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

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
      if (event.key === "Escape") {
        setPresenting(false);
        setElapsed(0);
        return;
      }
      if (!["ArrowRight", "ArrowDown", "ArrowLeft", "ArrowUp"].includes(event.key)) return;
      if (
        isEditableTarget(event.target) ||
        isEditableTarget(document.activeElement)
      ) {
        return;
      }
      event.preventDefault();
      const current = Math.max(0, sectionIds.indexOf(active));
      const direction = ["ArrowRight", "ArrowDown"].includes(event.key) ? 1 : -1;
      const next = Math.min(sectionIds.length - 1, Math.max(0, current + direction));
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      document
        .getElementById(sectionIds[next])
        ?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active, presenting, sectionIds]);

  useEffect(() => {
    if (!presenting) return;
    const startedAt = Date.now();
    const timer = window.setInterval(
      () => setElapsed(Math.floor((Date.now() - startedAt) / 1000)),
      1000,
    );
    return () => window.clearInterval(timer);
  }, [presenting]);

  const elapsedLabel = `${String(Math.floor(elapsed / 60)).padStart(2, "0")}:${String(
    elapsed % 60,
  ).padStart(2, "0")}`;

  return (
    <>
      <a className="skip-link" href="#main-content">
        跳到主要內容
      </a>
      <div className="reading-progress" aria-hidden="true">
        <span style={{ width: `${progress}%` }} />
      </div>
      <nav className="site-nav" aria-label="主要導覽">
        <a className="brand" href={siteConfig.routes.home}>
          <span className="brand-mark">AI</span>
          <span className="brand-copy">
            <strong>{siteConfig.name}</strong>
            <small>IDEA × JUDGMENT × PROOF</small>
          </span>
        </a>
        <div className="nav-center" aria-label="頁面切換">
          <a className={page === "home" ? "active" : ""} href={siteConfig.routes.home}>
            實作故事
          </a>
          <a
            className={page === "process" ? "active" : ""}
            href={siteConfig.routes.processAlias}
          >
            製作歷程
          </a>
          <a
            className={page === "tutorial" ? "active" : ""}
            href={siteConfig.routes.labAlias}
          >
            工具實驗室
          </a>
          <a
            className={page === "tempo" ? "active" : ""}
            href={siteConfig.routes.tempoAlias}
          >
            TempoTerm
          </a>
        </div>
        <div className="nav-actions">
          <span className="active-section">{active.replaceAll("-", " / ")}</span>
          <button
            className={`present-button ${presenting ? "on" : ""}`}
            type="button"
            onClick={() =>
              setPresenting((value) => {
                if (value) setElapsed(0);
                return !value;
              })
            }
            aria-pressed={presenting}
          >
            <span aria-hidden="true">{presenting ? "●" : "▶"}</span>
            {presenting ? "展示中" : "展示模式"}
          </button>
        </div>
      </nav>
      {presenting && (
        <div className="present-hint" role="status">
          <strong>{elapsedLabel}</strong>
          使用方向鍵切換章節 · Esc 結束
        </div>
      )}
    </>
  );
}
