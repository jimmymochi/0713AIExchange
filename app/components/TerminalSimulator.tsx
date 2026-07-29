"use client";

import { useEffect, useMemo, useState } from "react";
import { terminalScenarios } from "../data";
import { siteConfig } from "../site";
import CopyButton from "./CopyButton";

export default function TerminalSimulator() {
  const [scenarioIndex, setScenarioIndex] = useState(0);
  const [phase, setPhase] = useState<"idle" | "typing" | "running" | "done">("idle");
  const [typed, setTyped] = useState("");
  const [visibleLines, setVisibleLines] = useState<string[]>([]);
  const scenario = terminalScenarios[scenarioIndex];

  useEffect(() => {
    if (phase !== "typing") return;
    if (typed.length < scenario.command.length) {
      const timer = window.setTimeout(
        () => setTyped(scenario.command.slice(0, typed.length + 1)),
        16,
      );
      return () => window.clearTimeout(timer);
    }
    const timer = window.setTimeout(() => setPhase("running"), 260);
    return () => window.clearTimeout(timer);
  }, [phase, scenario.command, typed]);

  useEffect(() => {
    if (phase !== "running") return;
    if (visibleLines.length < scenario.lines.length) {
      const timer = window.setTimeout(
        () => setVisibleLines(scenario.lines.slice(0, visibleLines.length + 1)),
        520,
      );
      return () => window.clearTimeout(timer);
    }
    const timer = window.setTimeout(() => setPhase("done"), 120);
    return () => window.clearTimeout(timer);
  }, [phase, scenario.lines, visibleLines.length]);

  const reset = (nextIndex = scenarioIndex) => {
    setScenarioIndex(nextIndex);
    setTyped("");
    setVisibleLines([]);
    setPhase("idle");
  };

  const status = useMemo(() => {
    if (phase === "idle") return "SAFE DEMO";
    if (phase === "done") return "COMPLETE";
    return "RUNNING";
  }, [phase]);

  return (
    <div className="simulator-grid">
      <div className="scenario-list" role="tablist" aria-label="終端機示範情境">
        {terminalScenarios.map((item, index) => (
          <button
            type="button"
            role="tab"
            aria-selected={scenarioIndex === index}
            className={scenarioIndex === index ? "active" : ""}
            key={item.id}
            onClick={() => reset(index)}
          >
            <span>{String(index + 1).padStart(2, "0")}</span>
            {item.label}
          </button>
        ))}
        <div className="safety-note">
          <strong>安全沙盒</strong>
          這是引導式前端模擬，不會在你的電腦執行指令。
        </div>
      </div>

      <div className="terminal-simulator">
        <div className="terminal-chrome">
          <span className="chrome-dots" aria-hidden="true"><i /><i /><i /></span>
          <span>{siteConfig.shortName} — powershell</span>
          <span className={`terminal-status ${phase}`}>
            {phase === "running" && (
              <span className="status-dots" aria-hidden="true">
                <i /><i /><i />
              </span>
            )}
            {phase === "done" && (
              <svg className="status-check" viewBox="0 0 20 20" aria-hidden="true">
                <path d="m4 10 4 4 8-9" />
              </svg>
            )}
            <span>{status}</span>
          </span>
        </div>
        <div className="terminal-screen" aria-live="polite">
          <p className="terminal-welcome">Microsoft PowerShell · guided simulation</p>
          <div className="command-line">
            <span className="terminal-prompt">PS C:\AI&gt;</span>
            <span>{typed}</span>
            {(phase === "typing" || phase === "idle") && <i className="block-cursor" />}
          </div>
          {visibleLines.map((line, index) => (
            <p className={index === scenario.lines.length - 1 ? "success-line" : "output-line"} key={line}>
              {line}
            </p>
          ))}
          {phase === "running" && visibleLines.length < scenario.lines.length && (
            <p className="thinking-line">處理中<span>...</span></p>
          )}
        </div>
        <div className="terminal-controls">
          <button
            className="run-button"
            type="button"
            onClick={() => {
              setTyped("");
              setVisibleLines([]);
              setPhase("typing");
            }}
            disabled={phase === "typing" || phase === "running"}
          >
            <span aria-hidden="true">▶</span>
            {phase === "done" ? "重新執行" : "執行示範"}
          </button>
          <CopyButton text={scenario.command} label="複製真實指令" />
          <button
            className="next-button"
            type="button"
            onClick={() => reset((scenarioIndex + 1) % terminalScenarios.length)}
          >
            下一個情境 →
          </button>
        </div>
      </div>
    </div>
  );
}
