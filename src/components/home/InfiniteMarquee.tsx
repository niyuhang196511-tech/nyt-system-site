"use client";

import { useEffect, useRef, useState } from "react";

export default function SmoothInfiniteMarquee({
  children,
  baseSpeed = 0.5,
  className = "",
}: {
  children: React.ReactNode;
  baseSpeed?: number;
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const [repeatCount, setRepeatCount] = useState(2);

  const offset = useRef(0);
  const velocity = useRef(baseSpeed);
  const isDragging = useRef(false);
  const animationRef = useRef<number | null>(null);
  const contentWidth = useRef(0);

  // 计算需要复制几份
  useEffect(() => {
    const update = () => {
      if (!contentRef.current || !containerRef.current) return;

      const singleWidth = contentRef.current.offsetWidth;
      const containerWidth = containerRef.current.offsetWidth;

      contentWidth.current = singleWidth;

      let total = singleWidth;
      let count = 1;

      while (total < containerWidth * 2) {
        total += singleWidth;
        count++;
      }

      setRepeatCount(count);
    };

    update();

    const resizeObserver = new ResizeObserver(update);
    if (contentRef.current) resizeObserver.observe(contentRef.current);
    if (containerRef.current) resizeObserver.observe(containerRef.current);

    return () => resizeObserver.disconnect();
  }, []);

  const normalize = () => {
    const width = contentWidth.current;
    if (!width) return;

    if (offset.current <= -width) offset.current += width;
    if (offset.current > 0) offset.current -= width;
  };

  useEffect(() => {
    const animate = () => {
      if (!isDragging.current) {
        offset.current -= velocity.current;
        normalize();

        if (trackRef.current) {
          trackRef.current.style.transform = `translate3d(${offset.current}px,0,0)`;
        }
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`w-full overflow-hidden ${className}`}
      style={{ touchAction: "none" }}
    >
      <div ref={trackRef} className="flex gap-6 whitespace-nowrap">
        <div ref={contentRef} className="flex gap-6">
          {children}
        </div>

        {Array.from({ length: repeatCount - 1 }).map((_, i) => (
          <div key={i} className="flex gap-6">
            {children}
          </div>
        ))}
      </div>
    </div>
  );
}
