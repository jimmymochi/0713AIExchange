import type { Metadata } from "next";
import "./globals.css";
import { siteConfig, siteUrl } from "./site";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.canonicalUrl),
  title: {
    default: `${siteConfig.name}｜從問題到可靠成果`,
    template: `%s｜${siteConfig.name}`,
  },
  description:
    "Jimmy 的 AI 實作分享：從 PDF 翻譯、畢業學分自我審查到 00981A 自動報告，拆解如何找問題、做判斷並驗證成果。",
  alternates: {
    canonical: siteUrl("/"),
  },
  manifest: "/site.webmanifest",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
  openGraph: {
    title: `${siteConfig.name}｜從問題到可靠成果`,
    description: "三個真實案例，拆解 AI 做了什麼、人做了哪些關鍵判斷，以及成果如何被驗證。",
    type: "website",
    locale: "zh_TW",
    url: siteUrl("/"),
    siteName: siteConfig.name,
    images: [{ url: "/og.png", width: 1200, height: 630, alt: siteConfig.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name}｜從問題到可靠成果`,
    description: "從值得解決的問題出發，把 AI 變成可檢查、可改進的實作。",
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang={siteConfig.locale}>
      <body>{children}</body>
    </html>
  );
}
