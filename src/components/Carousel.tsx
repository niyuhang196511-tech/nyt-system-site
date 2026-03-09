"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { cn, toMediaUrl } from "@/lib/utils";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight } from "lucide-react";

const AUTOPLAY_INTERVAL = 4000;

export default function ProductCarousel({ images }: { images: string[] }) {
  const [active, setActive] = useState(0);
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [zoomOpen, setZoomOpen] = useState(false);
  const [isFading, setIsFading] = useState<boolean>(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const count = images.length;

  /* ----------------------------- */
  /*         统一自动播放            */
  /* ----------------------------- */
  const resetTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    timerRef.current = setInterval(() => {
      setActive((prev) => (prev + 1) % count);
    }, AUTOPLAY_INTERVAL);
  }, [count]);

  useEffect(() => {
    resetTimer();
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [resetTimer]);

  /* ----------------------------- */
  /*     同步 active → Embla        */
  /* ----------------------------- */
  useEffect(() => {
    if (!carouselApi) return;
    carouselApi.scrollTo(active);
  }, [active, carouselApi]);

  /* ----------------------------- */
  /*     同步 Embla → active        */
  /* ----------------------------- */
  useEffect(() => {
    if (!carouselApi) return;

    const onSelect = () => {
      const idx = carouselApi.selectedScrollSnap();
      setActive(idx);
      resetTimer();
    };

    carouselApi.on("select", onSelect);
    return () => {
      carouselApi.off("select", onSelect);
    };
  }, [carouselApi, resetTimer]);

  /* ----------------------------- */
  /*        桌面端淡入动画           */
  /* ----------------------------- */
  useEffect(() => {
    // schedule the state change to avoid calling setState synchronously inside the effect
    const raf = requestAnimationFrame(() => setIsFading(true));
    const t = setTimeout(() => setIsFading(false), 400);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(t);
    };
  }, [active]);

  /* ----------------------------- */
  /*          切换操作              */
  /* ----------------------------- */
  const goTo = (idx: number) => {
    setActive(idx);
    resetTimer();
  };

  const goPrev = () => goTo((active - 1 + count) % count);
  const goNext = () => goTo((active + 1) % count);

  return (
    <div className="flex w-full flex-col items-center">
      {/* ===================== */}
      {/*       移动端轮播      */}
      {/* ===================== */}
      <div className="w-full xl:hidden">
        <Carousel opts={{ loop: true }} setApi={setCarouselApi}>
          <CarouselContent>
            {images.map((img, idx) => (
              <CarouselItem key={idx}>
                <div
                  onClick={() => setZoomOpen(true)}
                  className="relative aspect-4/2 w-full cursor-zoom-in bg-linear-to-br from-blue-50 via-white to-blue-100"
                >
                  <Image
                    src={toMediaUrl(img)}
                    alt="product-image"
                    fill
                    sizes="100vw"
                    className="object-contain"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        {/* 移动端指示器 */}
        <div className="mt-4 flex justify-center gap-2">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={cn(
                "h-2 rounded-full transition-all duration-300",
                active === i ? "w-5 bg-gray-800" : "w-2 bg-gray-300",
              )}
            />
          ))}
        </div>
      </div>

      {/* ===================== */}
      {/*   桌面端：大图 + 缩略图 */}
      {/* ===================== */}
      <div className="hidden w-full flex-col items-center xl:flex">
        {/* 大图区域 */}
        <div className="group relative mb-6 w-full max-w-3xl">
          <div
            className={cn(
              "relative aspect-4/2 w-full cursor-zoom-in overflow-hidden rounded-lg bg-linear-to-br from-blue-50 via-white to-blue-100 shadow-md transition-opacity duration-400",
              isFading ? "opacity-0" : "opacity-100",
            )}
            onClick={() => setZoomOpen(true)}
          >
            <Image
              src={toMediaUrl(images[active])}
              alt="product image"
              fill
              sizes="(max-width: 1280px) 100vw, 768px"
              className="object-contain p-4"
            />
          </div>

          {/* 左右切换按钮 */}
          {count > 1 && (
            <>
              <button
                onClick={goPrev}
                className="absolute top-1/2 left-2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 opacity-0 shadow-md transition-opacity group-hover:opacity-100 hover:bg-white"
              >
                <ChevronLeft className="h-5 w-5 text-gray-700" />
              </button>
              <button
                onClick={goNext}
                className="absolute top-1/2 right-2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 opacity-0 shadow-md transition-opacity group-hover:opacity-100 hover:bg-white"
              >
                <ChevronRight className="h-5 w-5 text-gray-700" />
              </button>
            </>
          )}
        </div>

        {/* 缩略图列表 */}
        <div className="flex gap-3">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => goTo(idx)}
              className={cn(
                "relative aspect-square w-20 overflow-hidden rounded-lg border-2 shadow-md transition-all duration-200",
                active === idx
                  ? "scale-105 border-primary-foreground shadow-sm"
                  : "border-transparent opacity-60 hover:opacity-100",
              )}
            >
              <Image
                src={toMediaUrl(img)}
                alt={`thumb-${idx}`}
                fill
                sizes="80px"
                className="object-contain p-1.5"
              />
            </button>
          ))}
        </div>
      </div>

      {/* ===================== */}
      {/*      放大镜 Modal       */}
      {/* ===================== */}
      <Dialog open={zoomOpen} onOpenChange={setZoomOpen}>
        <DialogContent className="max-w-4xl bg-white p-0">
          <div className="relative h-[70vh] w-full">
            <Image
              src={toMediaUrl(images[active])}
              alt="zoom-image"
              fill
              sizes="(max-width: 896px) 100vw, 896px"
              className="object-contain"
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
