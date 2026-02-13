import { Locale } from "@/types/locale";
import { Product } from "@/types/product";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toMediaUrl } from "@/lib/utils";
import clsx from "clsx";

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
    <section className="bg-accent py-8 xl:py-16">
      <div className="container mx-auto grid grid-cols-1 items-center gap-8 px-6 xl:grid-cols-2">
        {/* 文本内容 */}
        <div
          className={clsx(
            "order-2 space-y-6",
            isLeft ? "xl:order-1" : "xl:order-2",
          )}
        >
          <h2 className="flex items-center gap-4 text-2xl font-bold xl:text-3xl">
            <span className="bg-linear-to-br` flex h-9 w-9 items-center justify-center rounded-full bg-primary from-primary to-primary/70 text-sm font-semibold text-white shadow">
              {index + 1}
            </span>
            {product.name}
          </h2>

          <p className="line-clamp-4 leading-8">{product.description}</p>

          {product.characteristics.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {product.characteristics.map((item) => (
                <Badge key={item.id}>{item.name}</Badge>
              ))}
            </div>
          )}

          <Link
            href={`/${locale}/products/${product.categoryId}/${product.id}`}
          >
            <Button size="lg" className="cursor-pointer rounded-full px-8">
              {more}
            </Button>
          </Link>
        </div>

        {/* 图片 */}
        <div
          className={clsx(
            "order-1 xl:order-0",
            isLeft ? "xl:order-2" : "xl:order-1",
          )}
        >
          <Image
            src={toMediaUrl(product.cover)}
            alt={product.name}
            width={600}
            height={420}
            className="w-full rounded-3xl object-cover shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
            priority={index === 0}
          />
        </div>
      </div>
    </section>
  );
}
