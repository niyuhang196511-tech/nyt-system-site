import { ProductCategory } from "@/types/product";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Locale } from "@/types/locale";
import Link from "next/link";

interface IProps {
  category: ProductCategory;
  categories: ProductCategory[];
  locale: Locale;
}

export default function HeroBanner({ category, categories, locale }: IProps) {
  return (
    <div className="mx-auto grid grid-cols-1 gap-6 px-4 py-6 md:grid-cols-2 md:px-6 xl:container xl:gap-12 xl:py-14">
      <div className="flex flex-col justify-center">
        <h1 className="mb-6 text-4xl font-bold">{category.name}</h1>
        <p className="mb-6">{category.description}</p>
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <Link href={`/${locale}/products/${c.id}`} key={c.id}>
              <Button
                className="cursor-pointer rounded-3xl"
                variant={c.id === category.id ? "default" : "outline"}
              >
                {c.name}
              </Button>
            </Link>
          ))}
        </div>
      </div>

      <Image
        className="w-full rounded-2xl object-cover"
        style={{
          boxShadow:
            "7px 7px 10px rgba(0,0,0,0.15), 7px 7px 10px rgba(0,0,0,0.15), 7px 7px 10px rgba(0,0,0,0.15)",
        }}
        src="/images/product-banner.webp"
        alt="Product Banner"
        width={600}
        height={400}
      />
    </div>
  );
}
