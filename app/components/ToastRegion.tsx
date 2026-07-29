"use client";

import { useEffect, useRef, useState } from "react";

type ToastTone = "success" | "error" | "info";
type ToastDetail = {
  message: string;
  tone?: ToastTone;
};

const toastEventName = "site-toast";

export function showSiteToast(message: string, tone: ToastTone = "success") {
  window.dispatchEvent(
    new CustomEvent<ToastDetail>(toastEventName, {
      detail: { message, tone },
    }),
  );
}

export default function ToastRegion() {
  const [toast, setToast] = useState<(ToastDetail & { id: number }) | null>(null);
  const dismissTimer = useRef<number | null>(null);

  useEffect(() => {
    const onToast = (event: Event) => {
      const { message, tone = "success" } = (
        event as CustomEvent<ToastDetail>
      ).detail;

      if (dismissTimer.current) window.clearTimeout(dismissTimer.current);
      setToast({ id: Date.now(), message, tone });
      dismissTimer.current = window.setTimeout(() => setToast(null), 2600);
    };

    window.addEventListener(toastEventName, onToast);
    return () => {
      window.removeEventListener(toastEventName, onToast);
      if (dismissTimer.current) window.clearTimeout(dismissTimer.current);
    };
  }, []);

  return (
    <div className="toast-region" aria-live="polite" aria-atomic="true">
      {toast && (
        <div
          className={`site-toast ${toast.tone}`}
          role={toast.tone === "error" ? "alert" : "status"}
          key={toast.id}
        >
          <span className="toast-mark" aria-hidden="true">
            {toast.tone === "error" ? "!" : toast.tone === "info" ? "↓" : "✓"}
          </span>
          <span>{toast.message}</span>
        </div>
      )}
    </div>
  );
}
