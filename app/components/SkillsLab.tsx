"use client";

import { useMemo, useState, type KeyboardEvent } from "react";
import { cliSkills, codexSkills, type Skill, type SourceKind } from "../data";
import CopyButton from "./CopyButton";
import DownloadLink from "./DownloadLink";
import useSlidingPill from "./useSlidingPill";

const sources: Array<"全部" | SourceKind> = ["全部", "官方", "第三方", "Jimmy 客製"];
const families = ["Antigravity CLI", "Codex"] as const;
type Family = (typeof families)[number];

export default function SkillsLab() {
  const [family, setFamily] = useState<Family>("Antigravity CLI");
  const [source, setSource] = useState<(typeof sources)[number]>("全部");
  const [selected, setSelected] = useState<Skill | null>(cliSkills[0]);
  const {
    containerRef,
    pill,
    registerButton,
    movePillTo,
    focusButton,
  } = useSlidingPill(family, families);

  const skills = useMemo(() => {
    const list = family === "Antigravity CLI" ? cliSkills : codexSkills;
    return source === "全部" ? list : list.filter((skill) => skill.sourceKind === source);
  }, [family, source]);

  const chooseFamily = (next: Family) => {
    setFamily(next);
    setSource("全部");
    setSelected(next === "Antigravity CLI" ? cliSkills[0] : codexSkills[0]);
  };

  const handleFamilyKeyDown = (
    event: KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) => {
    let nextIndex = index;
    if (event.key === "ArrowLeft") nextIndex = (index - 1 + families.length) % families.length;
    else if (event.key === "ArrowRight") nextIndex = (index + 1) % families.length;
    else if (event.key === "Home") nextIndex = 0;
    else if (event.key === "End") nextIndex = families.length - 1;
    else return;

    event.preventDefault();
    const next = families[nextIndex];
    chooseFamily(next);
    focusButton(next);
  };

  const chooseSource = (next: (typeof sources)[number]) => {
    setSource(next);
    const list = family === "Antigravity CLI" ? cliSkills : codexSkills;
    setSelected(
      next === "全部"
        ? list[0] ?? null
        : list.find((skill) => skill.sourceKind === next) ?? null,
    );
  };

  return (
    <div className="skills-lab">
      <div className="skills-toolbar">
        <div
          ref={containerRef}
          className="family-switch"
          role="tablist"
          aria-label="Skill 平台"
        >
          <span
            className="family-switch-pill"
            style={{ left: pill.left, width: pill.width }}
            aria-hidden="true"
          />
          {families.map((item, index) => (
            <button
              ref={registerButton(item)}
              type="button"
              role="tab"
              id={`skills-family-${item === "Codex" ? "codex" : "antigravity"}`}
              aria-selected={family === item}
              aria-controls="skills-family-panel"
              tabIndex={family === item ? 0 : -1}
              className={family === item ? "active" : ""}
              onClick={(event) => {
                movePillTo(event.currentTarget);
                chooseFamily(item);
              }}
              onKeyDown={(event) => handleFamilyKeyDown(event, index)}
              key={item}
            >
              {item} <span>{item === "Codex" ? "6＋3" : "6"}</span>
            </button>
          ))}
        </div>
        <div className="source-filters" aria-label="來源篩選">
          {sources.map((item) => (
            <button
              type="button"
              aria-pressed={source === item}
              className={source === item ? "active" : ""}
              onClick={() => chooseSource(item)}
              key={item}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div
        className="skills-grid skill-card-stagger"
        key={`${family}-${source}`}
        id="skills-family-panel"
        role="tabpanel"
        aria-labelledby={`skills-family-${family === "Codex" ? "codex" : "antigravity"}`}
      >
        {skills.map((skill, index) => (
          <button
            type="button"
            className={`skill-card ${selected?.name === skill.name ? "selected" : ""}`}
            onClick={() => setSelected(skill)}
            key={skill.name}
          >
            <div className="skill-card-top">
              <span>{String(index + 1).padStart(2, "0")}</span>
              <span className={`source-tag ${skill.sourceKind.replace(" ", "-")}`}>{skill.sourceKind}</span>
            </div>
            <h3>{skill.name}</h3>
            <p>{skill.summary}</p>
            <div className="skill-meta">
              <span>{"★".repeat(skill.difficulty)}{"☆".repeat(4 - skill.difficulty)}</span>
              <span>{skill.setup}</span>
              <span>{skill.category}</span>
            </div>
          </button>
        ))}
        {skills.length === 0 && (
          <p className="skills-empty" role="status">
            目前沒有符合這組條件的 Skill，請切換來源。
          </p>
        )}
      </div>

      {selected && (
        <article className="skill-detail" aria-live="polite">
          <div className="skill-detail-head">
            <div>
              <span className="mono-label">{selected.family} / {selected.category}</span>
              <h3>{selected.name}</h3>
              <p>{selected.summary}</p>
            </div>
            <div className="source-block">
              <span>{selected.sourceKind}</span>
              <a className="draw-link" href={selected.sourceUrl} target="_blank" rel="noreferrer">{selected.sourceLabel} ↗</a>
              {selected.download && (
                <DownloadLink
                  className="draw-link"
                  href={selected.download}
                  download
                  toastMessage={`${selected.name} 下載開始`}
                >
                  下載本站客製原始檔 ↓
                </DownloadLink>
              )}
            </div>
          </div>
          <div className="skill-detail-grid">
            <div className="detail-code">
              <span>INSTALL / INVOKE</span>
              <pre><code>{selected.install}</code></pre>
              <CopyButton text={selected.install} />
            </div>
            <div className="detail-code prompt-code">
              <span>COPYABLE PROMPT</span>
              <pre><code>{selected.prompt}</code></pre>
              <CopyButton text={selected.prompt} />
            </div>
            <div>
              <span className="detail-label">WORKFLOW</span>
              <ol className="mini-flow">
                {selected.workflow.map((step) => <li key={step}>{step}</li>)}
              </ol>
            </div>
            <div className="output-risk">
              <div><span>預期成果</span><p>{selected.output}</p></div>
              <div><span>風險檢查</span><p>{selected.risk}</p></div>
            </div>
          </div>
        </article>
      )}
    </div>
  );
}
