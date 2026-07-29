"use client";

import { useEffect } from "react";

export default function MotionEnhancer() {
  useEffect(() => {
    const groups = Array.from(
      document.querySelectorAll<HTMLElement>("[data-stagger]"),
    );
    if (
      groups.length === 0 ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      groups.forEach((group) => group.classList.add("stagger-visible"));
      return;
    }

    groups.forEach((group) => {
      Array.from(group.children).forEach((child, index) => {
        if (child instanceof HTMLElement) {
          child.style.setProperty("--stagger-index", String(index));
        }
      });
      group.classList.add("stagger-ready");
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("stagger-visible");
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.12 },
    );
    groups.forEach((group) => observer.observe(group));
    return () => observer.disconnect();
  }, []);

  return null;
}
