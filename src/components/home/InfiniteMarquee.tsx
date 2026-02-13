"use client";

import { cloneElement, isValidElement } from "react";
import { useMemo } from "react";

export default function InfiniteMarquee({
  children,
  className = "",
  speed = 30,
}: {
  children: React.ReactNode;
  className?: string;
  speed?: number;
}) {
  // React 方式复制 children，而不是 cloneNode(true)
  const duplicated = useMemo(() => {
    if (Array.isArray(children)) {
      return [
        ...children,
        ...children.map((c, i) => {
          return isValidElement(c) ? cloneElement(c, { key: `clone-${i}` }) : c;
        }),
      ];
    }

    // 单个 children
    return [
      children,
      isValidElement(children)
        ? cloneElement(children, { key: "clone" })
        : children,
    ];
  }, [children]);

  return (
    <div className={`w-full overflow-hidden ${className}`}>
      <div
        className="animate-marquee gap flex wrap-break-word whitespace-normal"
        style={{ animationDuration: `${speed}s` }}
      >
        <div className="flex gap-4">{duplicated}</div>
      </div>
    </div>
  );
}
