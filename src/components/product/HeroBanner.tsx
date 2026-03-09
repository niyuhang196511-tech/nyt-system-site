import { ProductCategory } from "@/types/product";
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
    <section className="relative overflow-hidden bg-slate-50 from-slate-50 to-white py-10 md:py-16">
      <div className="relative mx-auto max-w-6xl px-6">
        <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">
          {category.name}
        </h1>

        <p className="mt-6 max-w-2xl leading-8 text-muted-foreground">
          {category.description}
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          {categories.map((c) => (
            <Link href={`/${locale}/products/${c.id}`} key={c.id}>
              <Button
                variant={c.id === category.id ? "default" : "outline"}
                className="rounded-full px-6"
              >
                {c.name}
              </Button>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
