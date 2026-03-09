"use client";

import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { useTranslations } from "next-intl";

interface Props {
  threshold?: number; // px
  showOnDesktop?: boolean;
  className?: string;
}

export default function BackToTop({
  threshold = 360,
  showOnDesktop = false,
  className = "",
}: Props) {
  const siteDict = useTranslations("site");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const candidates: (EventTarget | null)[] = [
      document.scrollingElement,
      document.getElementById("__next"),
      document.querySelector("main"),
      window,
    ];

    const getY = () => {
      try {
        const el = document.scrollingElement ?? document.documentElement;
        return el.scrollTop || window.scrollY || 0;
      } catch {
        return window.scrollY || 0;
      }
    };

    let last = 0;
    const throttleMs = 100;

    const onScroll = () => {
      const now = Date.now();
      if (now - last < throttleMs) return;
      last = now;
      const y = getY();
      setVisible(y > threshold);
    };

    const add = (t: EventTarget | null) => {
      if (!t) return;
      try {
        (t as EventTarget).addEventListener("scroll", onScroll, {
          passive: true,
        });
      } catch {
        /* ignore */
      }
    };
    const remove = (t: EventTarget | null) => {
      if (!t) return;
      try {
        (t as EventTarget).removeEventListener("scroll", onScroll);
      } catch {
        /* ignore */
      }
    };

    candidates.forEach(add);
    // initial
    onScroll();

    return () => candidates.forEach(remove);
  }, [threshold]);

  if (!visible) return null;

  return (
    <Button
      variant="ghost"
      aria-label={siteDict("back_top")}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={`fixed right-4 bottom-6 z-50 h-12 w-12 items-center justify-center rounded-full p-0 shadow-lg backdrop-blur-sm transition-transform duration-200 hover:scale-105 focus:outline-none ${
        showOnDesktop ? "" : "lg:hidden"
      } ${className}`}
    >
      <span className="sr-only">{siteDict("back_top")}</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="h-5 w-5 text-primary"
        aria-hidden="true"
      >
        <path
          fillRule="evenodd"
          d="M12 4.5a.75.75 0 01.53.22l6 6a.75.75 0 11-1.06 1.06L12.75 7.31V19a.75.75 0 01-1.5 0V7.31L6.53 11.78a.75.75 0 11-1.06-1.06l6-6A.75.75 0 0112 4.5z"
          clipRule="evenodd"
        />
      </svg>
    </Button>
  );
}
