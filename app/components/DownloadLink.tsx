"use client";

import type { AnchorHTMLAttributes, ReactNode } from "react";
import { showSiteToast } from "./ToastRegion";

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode;
  toastMessage?: string;
};

export default function DownloadLink({
  children,
  onClick,
  toastMessage = "下載開始",
  ...props
}: Props) {
  return (
    <a
      {...props}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented) showSiteToast(toastMessage, "info");
      }}
    >
      {children}
    </a>
  );
}
