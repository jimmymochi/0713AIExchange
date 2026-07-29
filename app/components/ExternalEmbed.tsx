"use client";

import { useState } from "react";

type Props = {
  title: string;
  description: string;
  embedUrl: string;
  pageUrl: string;
  buttonLabel: string;
  warnings: string[];
  desktopRecommended?: boolean;
  sensitive?: boolean;
};

export default function ExternalEmbed({
  title,
  description,
  embedUrl,
  pageUrl,
  buttonLabel,
  warnings,
  desktopRecommended = false,
  sensitive = false,
}: Props) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={`external-embed ${sensitive ? "sensitive" : "portfolio"}`}>
      <div className="embed-intro">
        <div>
          <span className="mono-label">EXTERNAL HUGGING FACE SPACE</span>
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
        <a href={pageUrl} target="_blank" rel="noreferrer">
          另開完整網站 ↗
        </a>
      </div>

      {!loaded ? (
        <div className="embed-gate">
          <div className="embed-gate-mark" aria-hidden="true">
            {sensitive ? "DATA" : "FULL"}
          </div>
          <div>
            {desktopRecommended && (
              <strong className="desktop-note">建議使用桌機開啟</strong>
            )}
            <ul>
              {warnings.map((warning) => (
                <li key={warning}>{warning}</li>
              ))}
            </ul>
            <button
              className="button button-primary"
              type="button"
              onClick={() => setLoaded(true)}
            >
              {buttonLabel} <span aria-hidden="true">→</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="embed-frame-shell">
          <div className="embed-frame-bar">
            <span>{title}</span>
            <button type="button" onClick={() => setLoaded(false)}>
              卸載外部內容
            </button>
          </div>
          <iframe
            src={embedUrl}
            title={title}
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            allow="clipboard-read; clipboard-write; fullscreen"
          />
        </div>
      )}
    </div>
  );
}
