import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://sapphirejimmy-0713aiexchange.static.hf.space"),
  title: {
    default: "0731 AI 分享｜Antigravity CLI × Codex",
    template: "%s｜0731 AI 分享",
  },
  description:
    "互動認識 Antigravity CLI、Codex、Agent Skills，以及每天自動產生 00981A 持股分析報告的真實工作流。",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
  openGraph: {
    title: "0731 AI 分享｜Antigravity CLI × Codex",
    description: "兩種 AI 代理入口、一組可追溯 Skills，以及一個每天自動完成的 00981A 工作流。",
    type: "website",
    locale: "zh_TW",
  },
  twitter: {
    card: "summary",
    title: "0731 AI 分享｜Antigravity CLI × Codex",
    description: "從 AI 開發工具到可驗證的 00981A 自動化工作流。",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-Hant">
      <body>{children}</body>
    </html>
  );
}
