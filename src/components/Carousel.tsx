"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { cn, toMediaUrl } from "@/lib/utils";
import gsap from "gsap";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Dialog, DialogContent } from "@/components/ui/dialog";

export default function ProductCarousel({ images }: { images: string[] }) {
  const [active, setActive] = useState(0);
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [zoomOpen, setZoomOpen] = useState(false);

  const imgRef = useRef<HTMLDivElement>(null);

  /* ----------------------------- */
  /*        GSAP 淡入淡出动画       */
  /* ----------------------------- */
  useEffect(() => {
    if (!imgRef.current) return;

    gsap.fromTo(
      imgRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.6, ease: "power2.out" },
    );
  }, [active]);

  /* ----------------------------- */
  /*         同步 Embla 位置        */
  /* ----------------------------- */
  useEffect(() => {
    if (!carouselApi) return;

    // 初始化时同步
    Promise.resolve().then(() => setActive(carouselApi.selectedScrollSnap()));

    const onSelect = () => {
      const current = carouselApi.selectedScrollSnap();
      setActive(current);
    };

    carouselApi.on("select", onSelect);

    return () => {
      carouselApi.off("select", onSelect);
    };
  }, [carouselApi]);

  /* ----------------------------- */
  /*        自动播放 + GSAP         */
  /* ----------------------------- */
  useEffect(() => {
    if (!carouselApi) return;

    const timer = setInterval(() => {
      carouselApi.scrollNext();
    }, 3000);

    return () => clearInterval(timer);
  }, [carouselApi]);

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
                  ref={active === idx ? imgRef : null}
                  onClick={() => setZoomOpen(true)}
                  className="relative aspect-4/2 w-full cursor-zoom-in"
                >
                  <Image
                    src={toMediaUrl(img)}
                    alt="product-image"
                    fill
                    className="object-contain"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        {/* ---- 移动端指示器 (可以点击切换) ---- */}
        <div className="mt-4 flex justify-center gap-3">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => carouselApi?.scrollTo(i)} // ← 添加这句
              className={cn(
                "h-2 rounded-full transition-all",
                active === i ? "w-4 bg-gray-900" : "w-2 bg-gray-300",
              )}
            />
          ))}
        </div>
      </div>

      {/* ===================== */}
      {/*   桌面端：大图 + 缩略图 */}
      {/* ===================== */}
      <div className="hidden flex-col items-center xl:flex">
        <div
          ref={imgRef}
          className="relative mb-6 aspect-4/2 w-full max-w-3xl cursor-zoom-in"
          onClick={() => setZoomOpen(true)}
        >
          <Image
            src={toMediaUrl(images[active])}
            alt="product image"
            fill
            className="object-contain"
          />
        </div>

        {/* 缩略图列表 */}
        <div className="flex gap-4">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => {
                setActive(idx);
                carouselApi?.scrollTo(idx); // ← 添加：保持移动/桌面同步
              }}
              className={cn(
                "relative aspect-square w-24 overflow-hidden rounded-md border-2 transition",
                active === idx
                  ? "scale-110 border-gray-300"
                  : "border-primary-foreground",
              )}
            >
              <Image
                src={toMediaUrl(img)}
                alt={`thumb-${idx}`}
                fill
                className="object-contain p-2"
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
              className="object-contain"
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
