import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import InfiniteMarquee from "@/components/home/InfiniteMarquee";
import { Product } from "@/types/product";
import Link from "next/link";
import { Locale } from "@/types/locale";
import { toMediaUrl } from "@/lib/utils";
import { getTranslations } from "next-intl/server";

interface IProps {
  title: string;
  description: string;
  featured: Product[];
  locale: Locale;
}

function ProductCard({
  item,
  locale,
  detailText,
}: {
  item: Product;
  locale: Locale;
  detailText: string;
}) {
  return (
    <Link
      href={`/${locale}/products/${item.categoryId}/${item.id}`}
      className="group block h-full"
    >
      <div className="mx-auto flex h-full w-full max-w-[320px] flex-col overflow-hidden rounded-2xl border-0 bg-white shadow-md transition-all duration-500 hover:-translate-y-2 hover:shadow-xl">
        <div className="relative flex h-56 items-center justify-center rounded-t-2xl bg-linear-to-br from-blue-50 via-white to-blue-100 p-6">
          <Image
            src={toMediaUrl(item.cover)}
            alt={item.name}
            width={220}
            height={220}
            className="object-contain transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        <div className="flex flex-1 flex-col px-5 pt-5 pb-6">
          <h3 className="mb-2 line-clamp-1 text-lg font-semibold">
            {item.name}
          </h3>
          <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
            {item.description}
          </p>
          <div className="mt-auto pt-4">
            <span className="text-sm font-medium">{detailText} →</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default async function RecommendProducts({
  title,
  description,
  featured,
  locale,
}: IProps) {
  const homeDict = await getTranslations({ locale, namespace: "home" });
  const detailText = homeDict("recommendProducts.detail");

  return (
    <section className="overflow-x-hidden">
      {/* 防止移动端溢出 */}
      <div className="mx-auto px-4 xl:container">
        <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
          {title}
        </h2>
        <div className="mt-3 h-1 w-16 rounded-full bg-primary" />
        <p className="mt-5 max-w-2xl text-muted-foreground">{description}</p>
      </div>
      {/* 桌面端保持不变 */}
      <div className="mt-10">
        <InfiniteMarquee className="hidden xl:block">
          {featured.map((item) => (
            <div key={item.id} className="px-3">
              {" "}
              {/* 给 Marquee 增加间距 */}
              <ProductCard
                item={item}
                locale={locale}
                detailText={detailText}
              />
            </div>
          ))}
        </InfiniteMarquee>
      </div>
      {/* 移动端/平板：轮播 */}
      <div className="relative mt-10 px-4 md:px-10 xl:hidden">
        <Carousel opts={{ align: "start", loop: true }} className="w-full">
          <CarouselContent className="-ml-4">
            {featured.map((item) => (
              <CarouselItem
                key={item.id}
                // basis-4/5 让用户看到下一个卡片的边缘，增加滑动欲望
                className="basis-[85%] pl-4 md:basis-1/2 lg:basis-1/3"
              >
                <ProductCard
                  item={item}
                  locale={locale}
                  detailText={detailText}
                />
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* 左右按钮在小屏通常隐藏，中屏显示 */}
          <CarouselNext className="absolute top-1/2 right-0 hidden -translate-y-1/2 md:flex" />
          <CarouselPrevious className="absolute top-1/2 left-0 hidden -translate-y-1/2 md:flex" />
        </Carousel>
      </div>
    </section>
  );
}
