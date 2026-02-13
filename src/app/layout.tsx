import { Metadata } from "next";
import "./globals.css";
import React from "react";

/**
 * Root layout: wraps all locales. Note: actual page content is in /app/[locale]/...
 */
export const metadata: Metadata = {
  title: {
    default: "济南君道信医疗器械有限公司",
    template: "%s | 济南君道信医疗器械有限公司",
  },
  description:
    "济南君道信医疗器械有限公司是一家专业从事医疗器械研发、生产和销售的企业，致力于为客户提供高质量的医疗解决方案。",
  keywords: [
    "官网",
    "企业官网",
    "医疗器械",
    "研发",
    "生产",
    "销售",
    "医疗解决方案",
  ],
  authors: [{ name: "济南君道信医疗器械有限公司" }],

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
