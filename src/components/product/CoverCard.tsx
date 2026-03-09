"use client";

import { Locale } from "@/types/locale";
import { Product } from "@/types/product";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toMediaUrl } from "@/lib/utils";
import clsx from "clsx";
import { ArrowRight } from "lucide-react"; // 引入图标增强视觉

interface IProps {
  product: Product;
  direction: "left" | "right";
  locale: Locale;
  more: string;
  index: number;
}

export default function CoverCard({
  product,
  direction,
  locale,
  more,
  index,
}: IProps) {
  const isLeft = direction === "left";

  return (
    <section
      className={clsx(
        "relative overflow-hidden py-10 md:py-16",
        // 使用更细腻的交替背景
        // "bg-linear-to-b from-slate-50/50 to-white",
      )}
    >
      {/* 背景装饰：大屏下的装饰性文字或色块 */}
      <div className="pointer-events-none absolute -top-24 left-1/2 -z-10 -translate-x-1/2 opacity-[0.1] select-none">
        <span className="text-[20rem] font-bold tracking-tighter text-slate-900">
          {(index + 1).toString().padStart(2, "0")}
        </span>
      </div>

      <div className="mx-auto max-w-7xl px-6">
        <div
          className={clsx(
            "grid items-center gap-16 lg:grid-cols-2 lg:gap-24",
            isLeft ? "direction-ltr" : "",
          )}
        >
          {/* 图片区域：增加层级感 */}
          <div
            className={clsx(
              "group relative order-1",
              isLeft ? "lg:order-2" : "lg:order-1",
            )}
          >
            {/* 装饰边框 */}
            <div
              className={clsx(
                "absolute -inset-4 rounded-[2.5rem] border border-slate-100 transition-transform duration-500 group-hover:scale-105",
                isLeft
                  ? "translate-x-2 translate-y-2"
                  : "-translate-x-2 translate-y-2",
              )}
            />

            {/* 主图容器 */}
            <div className="relative z-10 overflow-hidden rounded-4xl bg-slate-200 shadow-2xl transition-all duration-700 ease-out group-hover:shadow-primary/20">
              <Image
                src={toMediaUrl(product.cover)}
                alt={product.name}
                width={800}
                height={600}
                className="aspect-4/3 w-full object-cover transition-transform duration-1000 group-hover:scale-110"
                priority={index === 0}
              />
              {/* 图片上的遮罩层，提升质感 */}
              <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            </div>
          </div>

          {/* 文本内容：优化排版逻辑 */}
          <div
            className={clsx(
              "order-2 flex flex-col space-y-8",
              isLeft ? "lg:order-1" : "lg:order-2",
            )}
          >
            <div className="space-y-4">
              {/* 顶部标签式数字 */}
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold tracking-widest text-primary uppercase">
                  Step {(index + 1).toString().padStart(2, "0")}
                </span>
                <div className="h-px w-12 bg-primary/30" />
              </div>

              <h2 className="text-2xl leading-tight font-extrabold tracking-tight break-all md:text-3xl lg:text-4xl">
                {product.name}
              </h2>
            </div>

            {/* 描述文字：增加行高和字间距 */}
            <p className="max-w-lg text-lg leading-relaxed break-all text-slate-600/90">
              {product.description}
            </p>

            {/* 特征标签：改用更精致的幽灵样式 */}
            {product.characteristics.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {product.characteristics.map((item) => (
                  <Badge
                    key={item.id}
                    variant="secondary"
                    className="rounded-lg border-none bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-600 transition-colors hover:bg-primary hover:text-white"
                  >
                    {item.name}
                  </Badge>
                ))}
              </div>
            )}

            {/* 按钮：增加动画效果 */}
            <div className="pt-4">
              <Link
                href={`/${locale}/products/${product.categoryId}/${product.id}`}
                className="group/btn inline-flex"
              >
                <Button
                  size="lg"
                  className="relative cursor-pointer items-center overflow-hidden rounded-full px-8 py-6 text-base font-semibold transition-all hover:pr-12"
                >
                  <span className="relative z-10">{more}</span>
                  <ArrowRight className="absolute right-4 -translate-x-2 opacity-0 transition-all duration-300 group-hover/btn:translate-x-0 group-hover/btn:opacity-100" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
