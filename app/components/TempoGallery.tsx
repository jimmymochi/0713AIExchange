"use client";

import Image from "next/image";
import { useState } from "react";

const scenes = {
  codex: {
    label: "Codex CLI",
    image: "/tempo/tempo-codex-public.png",
    width: 1632,
    height: 963,
    alt: "TempoTerm 工作區中執行 Codex CLI，左右分別顯示工作階段與 Git 面板",
    caption: "Codex CLI 留在熟悉的終端機裡；TempoTerm 把工作階段、檔案與 Git 脈絡放到同一個視窗。",
    points: [
      ["01", "工作階段", "左側集中管理多個終端機與 AI Sessions。"],
      ["02", "原生 CLI", "中央仍是真正的終端機，不必改掉 Codex 的使用習慣。"],
      ["03", "Git 脈絡", "右側查看儲存庫狀態，減少在視窗之間來回切換。"],
    ],
  },
  antigravity: {
    label: "Antigravity CLI",
    image: "/tempo/tempo-antigravity-public.png",
    width: 1629,
    height: 965,
    alt: "TempoTerm 工作區中執行 Antigravity CLI 並顯示正體中文 Skills 建議",
    caption: "同一個工作區也能執行 Antigravity CLI，正體中文輸出與長篇 Skill 清單都能保留清楚的閱讀節奏。",
    points: [
      ["01", "相同入口", "照常輸入 agy，TempoTerm 不會取代你原本的 CLI。"],
      ["02", "正體中文", "介面與終端輸出都適合 CJK 字元閱讀。"],
      ["03", "長內容工作", "讓 Skills、研究結果與命令輸出留在可管理的工作階段。"],
    ],
  },
} as const;

type SceneKey = keyof typeof scenes;

export default function TempoGallery() {
  const [active, setActive] = useState<SceneKey>("codex");
  const scene = scenes[active];

  return (
    <div className="tempo-gallery">
      <div className="tempo-gallery-bar">
        <div className="tempo-window-dots" aria-hidden="true"><i /><i /><i /></div>
        <div className="tempo-tabs" role="tablist" aria-label="TempoTerm 使用場景">
          {(Object.keys(scenes) as SceneKey[]).map((key) => (
            <button
              key={key}
              type="button"
              role="tab"
              aria-selected={active === key}
              className={active === key ? "active" : ""}
              onClick={() => setActive(key)}
            >
              {scenes[key].label}
            </button>
          ))}
        </div>
        <span>REAL WORKSPACE</span>
      </div>
      <div className="tempo-screen">
        <Image
          key={scene.image}
          src={scene.image}
          width={scene.width}
          height={scene.height}
          unoptimized
          alt={scene.alt}
        />
      </div>
      <div className="tempo-gallery-caption">
        <p>{scene.caption}</p>
        <div className="tempo-point-list">
          {scene.points.map(([number, title, detail]) => (
            <article key={number}>
              <span>{number}</span>
              <div><strong>{title}</strong><p>{detail}</p></div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
