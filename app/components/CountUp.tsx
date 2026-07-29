"use client";

import { useEffect, useRef, useState } from "react";

export default function CountUp({
  value,
  duration = 760,
}: {
  value: number;
  duration?: number;
}) {
  const [display, setDisplay] = useState(value);
  const elementRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    let frame = 0;
    let startedAt = 0;
    const animate = (now: number) => {
      if (!startedAt) startedAt = now;
      const progress = Math.min(1, (now - startedAt) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(value * eased));
      if (progress < 1) frame = window.requestAnimationFrame(animate);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setDisplay(0);
        frame = window.requestAnimationFrame(animate);
        observer.disconnect();
      },
      { threshold: 0.6 },
    );
    observer.observe(element);

    return () => {
      observer.disconnect();
      window.cancelAnimationFrame(frame);
    };
  }, [duration, value]);

  return <span ref={elementRef}>{display}</span>;
}
