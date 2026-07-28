"use client";

import { useMemo, useState } from "react";
import { cliSkills, codexSkills, type Skill, type SourceKind } from "../data";
import CopyButton from "./CopyButton";

const sources: Array<"全部" | SourceKind> = ["全部", "官方", "第三方", "Jimmy 客製"];

export default function SkillsLab() {
  const [family, setFamily] = useState<"Antigravity CLI" | "Codex">("Antigravity CLI");
  const [source, setSource] = useState<(typeof sources)[number]>("全部");
  const [selected, setSelected] = useState<Skill | null>(cliSkills[0]);

  const skills = useMemo(() => {
    const list = family === "Antigravity CLI" ? cliSkills : codexSkills;
    return source === "全部" ? list : list.filter((skill) => skill.sourceKind === source);
  }, [family, source]);

  const chooseFamily = (next: typeof family) => {
    setFamily(next);
    setSource("全部");
    setSelected(next === "Antigravity CLI" ? cliSkills[0] : codexSkills[0]);
  };

  return (
    <div className="skills-lab">
      <div className="skills-toolbar">
        <div className="family-switch" role="tablist" aria-label="Skill 平台">
          <button type="button" className={family === "Antigravity CLI" ? "active" : ""} onClick={() => chooseFamily("Antigravity CLI")}>
            Antigravity CLI <span>6</span>
          </button>
          <button type="button" className={family === "Codex" ? "active" : ""} onClick={() => chooseFamily("Codex")}>
            Codex <span>6＋3</span>
          </button>
        </div>
        <div className="source-filters" aria-label="來源篩選">
          {sources.map((item) => (
            <button type="button" className={source === item ? "active" : ""} onClick={() => setSource(item)} key={item}>
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="skills-grid">
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
              <a href={selected.sourceUrl} target="_blank" rel="noreferrer">{selected.sourceLabel} ↗</a>
              {selected.download && <a href={selected.download} download>下載本站客製原始檔 ↓</a>}
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
