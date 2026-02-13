"use client";

import React, { useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import type { Timeline as TimelineType } from "@/types/timeline";
import { useTranslations } from "next-intl";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// ---------------------------
// TimelineItem（单项）
// ---------------------------
const TimelineItem = React.forwardRef<
  HTMLDivElement,
  TimelineType & { index: number }
>(({ date, title, description, index }, ref) => {
  const isLeft = index % 2 === 0;

  return (
    <div
      ref={ref}
      className={cn(
        "relative mb-14 flex flex-col md:flex-row md:items-center",
        // 保持 item 本身不引起横向 overflow
        "overflow-x-hidden",
      )}
    >
      {/* 日期（PC 两侧） */}
      <div
        className={cn(
          "hidden font-semibold text-gray-600 md:block md:w-1/2 dark:text-gray-400",
          isLeft ? "pr-6 text-right" : "pl-6 text-left",
        )}
      >
        {date}
      </div>

      {/* 中心短线（视觉引导） - PC 可见 */}
      <div className="relative hidden w-0 flex-col items-center md:flex">
        <div className="h-20 w-0.5 bg-gray-200 dark:bg-gray-800" />
      </div>

      {/* 卡片 */}
      <div
        className={cn("md:w-1/2 md:px-8", isLeft ? "md:order-1" : "md:order-3")}
      >
        <Card
          className={cn("border transition-shadow", "border-primary shadow-lg")}
        >
          <CardHeader className="p-4 md:p-5">
            <CardTitle className="text-base md:text-lg">{title}</CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0 md:p-5 md:pt-0">
            <p className="text-sm text-muted-foreground">{description}</p>
          </CardContent>
        </Card>

        {/* 移动端日期（卡片下方） */}
        <div className="mt-2 text-sm font-semibold text-gray-600 md:hidden">
          {date}
        </div>
      </div>
    </div>
  );
});

TimelineItem.displayName = "TimelineItem";

// ---------------------------
// 主 Timeline 组件（最终版）
// ---------------------------
const BLUE = "#3b82f6"; // 你选择的 1. 蓝色科技

interface Props {
  timelines: TimelineType[];
}

export const Timeline: React.FC<Props> = ({ timelines }) => {
  const aboutDict = useTranslations("about");

  const containerRef = useRef<HTMLDivElement | null>(null);
  const itemsRef = useRef<Array<HTMLDivElement | null>>([]);
  const flowLightRef = useRef<HTMLDivElement | null>(null);
  const flowTrailRef = useRef<HTMLDivElement | null>(null);
  const mobileGlowRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      // 清理旧的 ScrollTrigger / tween
      ScrollTrigger.getAll().forEach((s) => s.kill());
      // 仅杀掉我们将要使用的元素 tween（避免影响全局）
      gsap.killTweensOf([
        flowLightRef.current,
        flowTrailRef.current,
        ...itemsRef.current.filter(Boolean),
      ]);

      const ctx = gsap.context(() => {
        // --------- 1) Items 统一入场（更顺滑且对性能友好） ----------
        gsap.fromTo(
          itemsRef.current.filter(Boolean),
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            stagger: 0.12,
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top bottom-=120",
            },
          },
        );

        // --------- 2) 流光（仅 PC） ----------
        const isDesktop = window.matchMedia("(min-width: 768px)").matches;
        const container = containerRef.current!;
        if (!container) return;
        // 使用 offsetHeight（像素），放到局部变量
        const totalH = container.offsetHeight || 1000;

        // 确保之前的 tweens 被清理
        if (flowLightRef.current && flowTrailRef.current) {
          gsap.killTweensOf([flowLightRef.current, flowTrailRef.current]);
        }

        if (isDesktop && flowLightRef.current && flowTrailRef.current) {
          const light = flowLightRef.current;
          const trail = flowTrailRef.current;

          // 注意：流光元素被放进了 overflow-hidden 的容器里，
          // 所以下落过程中不会撑开页面高度或产生滚动条。

          // 主循环：光点 + 拖尾一起使用 translateY 下落（只改 transform）
          gsap.fromTo(
            [light, trail],
            { y: 0 },
            {
              y: totalH,
              duration: 4.2,
              ease: "none",
              repeat: -1,
              // 保证 transform 动画不会触发布局
              onRepeat: () => {
                // noop
              },
            },
          );

          // 光点脉冲（只作用 transform / opacity / boxShadow）
          gsap.to(light, {
            scale: 1.9,
            opacity: 0.45,
            duration: 0.9,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
            // 使用 CSS 变量 / inline style 来控制 boxShadow 效果不会触发布局
            onUpdate: function () {
              // 通过 style 更新 boxShadow（不会改变 layout）
              if (light) {
                const t = this.ratio || 1;
                // 可选：根据 t 调整 glow 强度（这里保持简单）
                light.style.boxShadow = `0 0 ${12 * t}px ${BLUE}66`;
              }
            },
          });

          // 尾焰：不要动画 height（会引发布局），用 scaleY 替代
          gsap.fromTo(
            trail,
            { scaleY: 0.28 },
            {
              scaleY: 1,
              duration: 0.9,
              ease: "sine.inOut",
              repeat: -1,
              yoyo: true,
              transformOrigin: "top center",
            },
          );
        }

        // --------- 3) 移动端：淡淡光晕（静态，无下落动画） ----------
        // 不对 mobileGlowRef 做动画，只有一个柔和的静态光晕，节省性能
      }, containerRef);

      return () => {
        ctx.revert();
        ScrollTrigger.getAll().forEach((s) => s.kill());
        gsap.killTweensOf([
          flowLightRef.current,
          flowTrailRef.current,
          ...itemsRef.current.filter(Boolean),
        ]);
      };
    },
    { scope: containerRef, dependencies: [timelines] },
  );

  return (
    // 只隐藏横向溢出，避免干扰纵向滚动条显示
    <div className="overflow-hidden">
      <div
        ref={containerRef}
        className="relative mx-auto max-w-6xl overflow-hidden px-4"
      >
        <h2 className="mb-10 text-center text-xl font-bold tracking-tight md:text-2xl xl:text-3xl">
          {aboutDict("timeline.title")}
        </h2>

        {/* PC 中心线（样式 A：细线 2px、灰色） */}
        <div
          className="absolute top-40 left-1/2 hidden h-[calc(100%-8rem)] -translate-x-1/2 md:block"
          aria-hidden
        >
          <div className="h-full w-0.5 bg-gray-200 dark:bg-gray-800" />
        </div>

        {/* 流光容器：绝对定位，覆盖整个 timeline 区域，overflow-hidden 防止撑开页面 */}
        <div className="pointer-events-none absolute inset-0 z-20 hidden overflow-hidden md:block">
          {/* 主光点（will-change + transformOrigin） */}
          <div
            ref={flowLightRef}
            id="flow-light"
            className="absolute top-0 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full"
            style={{
              backgroundColor: BLUE,
              boxShadow: `0 0 12px ${BLUE}66`,
              willChange: "transform, opacity",
              transformOrigin: "center center",
              // 确保 GPU 合成
              transform: "translateZ(0)",
            }}
          />

          {/* 尾焰（拖尾） - 使用 scaleY，不改变布局 */}
          <div
            ref={flowTrailRef}
            id="flow-trail"
            className="absolute top-0 left-1/2 w-1.5 -translate-x-1/2 rounded-lg"
            style={{
              background: `linear-gradient(to bottom, ${BLUE}AA, rgba(59,130,246,0.18), transparent)`,
              filter: "blur(3px)",
              willChange: "transform, opacity",
              transformOrigin: "top center",
              transform: "scaleY(0.3) translateZ(0)",
            }}
          />
        </div>

        {/* 移动端光晕（静态） */}
        <div
          ref={mobileGlowRef}
          id="mobile-glow"
          className="absolute top-20 left-4 z-10 h-4 w-4 rounded-full md:hidden"
          style={{
            backgroundColor: BLUE,
            opacity: 0.18,
            filter: "blur(6px)",
            willChange: "opacity",
          }}
        />

        {/* timeline items */}
        <div className="relative z-10">
          {timelines.map((line, idx) => (
            <TimelineItem
              key={line.id}
              {...line}
              index={idx}
              // @ts-ignore
              ref={(el) => (itemsRef.current[idx] = el)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Timeline;
