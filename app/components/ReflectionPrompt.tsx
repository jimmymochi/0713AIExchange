const prompts = [
  {
    number: "01",
    label: "從生活開始",
    question: "哪一件事一直讓你覺得麻煩？",
  },
  {
    number: "02",
    label: "確認誰需要",
    question: "如果 AI 今天就能做出來，誰真的會需要？",
  },
  {
    number: "03",
    label: "想好怎麼驗證",
    question: "你要看到什麼，才會相信它真的有用？",
  },
] as const;

export default function ReflectionPrompt() {
  return (
    <div className="reflection-prompt">
      <div className="reflection-prompt-top">
        <span>THINKING PAUSE</span>
        <span>不用作答 · 先想 30 秒</span>
      </div>
      <p className="reflection-main-question">
        當 AI 已經可以快速幫你實現很多東西，
        <strong>你真正想解決的是什麼問題？</strong>
      </p>
      <ol className="reflection-questions">
        {prompts.map((prompt) => (
          <li key={prompt.number}>
            <span>{prompt.number}</span>
            <small>{prompt.label}</small>
            <p>{prompt.question}</p>
          </li>
        ))}
      </ol>
      <p className="reflection-cue">
        不用現在說出答案。先記住第一個浮現在腦中的問題。
      </p>
    </div>
  );
}
