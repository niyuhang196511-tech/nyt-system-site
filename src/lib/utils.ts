import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { MINIO_REMOTE } from "@/constants/api";
import type { TocItem } from "@/types/toc";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function toMediaUrl(url?: string) {
  if (!url) return "";

  // 只处理 MinIO 返回的地址
  if (url.startsWith(`${MINIO_REMOTE}/`)) {
    return url
      .replace(`${MINIO_REMOTE}/`, "/media/")
      .split("/")
      .map(encodeURIComponent)
      .join("/");
  }

  return url;
}

export function parseTocFromHtml(html: string): TocItem[] {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");

  const headings = doc.querySelectorAll("h1,h2,h3,h4,h5,h6");

  const toc: TocItem[] = [];

  headings.forEach((heading, index) => {
    const level = Number(heading.tagName.substring(1));
    const text = heading.textContent?.trim() ?? "";

    if (!text) return;

    // 如果没有 id，自动生成
    let id = heading.id;
    if (!id) {
      id = `${text
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^\w\-]/g, "")}-${index}`;
      heading.id = id;
    }

    toc.push({ id, text, level });
  });

  return toc;
}
