import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import InfiniteMarquee from "@/components/home/InfiniteMarquee";
import { Product } from "@/types/product";
import Link from "next/link";
import { Locale } from "@/types/locale";
import { toMediaUrl } from "@/lib/utils";

interface IProps {
  title: string;
  description: string;
  featured: Product[];
  locale: Locale;
}

export default async function RecommendProducts({
  title,
  description,
  featured,
  locale,
}: IProps) {
  const productCards = featured.map((item) => (
    <Card key={item.id} className="w-sm">
      <CardContent>
        <Image
          className="w-full"
          src={toMediaUrl(item.cover)}
          alt={item.name}
          width={200}
          height={200}
        />
      </CardContent>
      <CardHeader>
        <Link href={`/${locale}/products/${item.categoryId}/${item.id}`}>
          <CardTitle className="mb-2">{item.name}</CardTitle>
          <CardDescription className="indent-8 text-wrap">
            {item.description}
          </CardDescription>
        </Link>
      </CardHeader>
    </Card>
  ));

  const productCarouselCards = featured.map((item) => (
    <CarouselItem key={item.id} className="md:basis-1/2 lg:basis-1/3">
      <Link href={`/${locale}/${item.id}`} className="h-full">
        <Card key={item.id} className="h-full w-full">
          <CardContent>
            <Image
              className="w-full"
              src={toMediaUrl(item.cover)}
              alt={item.name}
              width={200}
              height={200}
            />
          </CardContent>
          <CardHeader>
            <CardTitle className="mb-2">{item.name}</CardTitle>
            <CardDescription className="indent-8 text-wrap">
              {item.description}
            </CardDescription>
          </CardHeader>
        </Card>
      </Link>
    </CarouselItem>
  ));

  return (
    <section className="py-6">
      <div className="mx-auto px-4 xl:container">
        <h2 className="mb-6 text-3xl font-extrabold tracking-tight">{title}</h2>
        <p className="mb-8 max-w-2xl text-sm text-muted-foreground">
          {description}
        </p>
      </div>

      <InfiniteMarquee className="hidden xl:block">
        {productCards}
      </InfiniteMarquee>

      <div className="relative px-10">
        <Carousel
          opts={{
            align: "start",
          }}
          className="static block xl:hidden"
        >
          <CarouselContent>{productCarouselCards}</CarouselContent>
          <CarouselNext className="absolute top-1/2 right-0 hidden h-10 w-10 md:flex" />
          <CarouselPrevious className="absolute top-1/2 left-0 hidden h-10 w-10 md:flex" />
        </Carousel>
      </div>
    </section>
  );
}

/**

import Image from "next/image";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import InfiniteMarquee from "@/components/home/InfiniteMarquee";
import { Product } from "@/types/product";
import { Locale } from "@/types/locale";
import { toMediaUrl } from "@/lib/utils";


interface IProps {
  title: string;
  description: string;
  featured: Product[];
  locale: Locale;
}


function ProductCard({
  item,
  locale,
  className = "",
}: {
  item: Product;
  locale: Locale;
  className?: string;
}) {
  return (
    <Card className={className}>
      <CardContent>
        <Image
          className="w-full object-cover"
          src={toMediaUrl(item.cover)}
          alt={item.name}
          width={200}
          height={200}
        />
      </CardContent>
      <CardHeader>
        <Link href={`/${locale}/products/${item.categoryId}/${item.id}`}>
          <CardTitle className="line-clamp-1">
            {item.name}
          </CardTitle>
          <CardDescription className="indent-8 line-clamp-2">
            {item.description}
          </CardDescription>
        </Link>
      </CardHeader>
    </Card>
  );
}

export default async function RecommendProducts({
  title,
  description,
  featured,
  locale,
}: IProps) {
  const MARQUEE_MIN_COUNT = 5;
  const useMarquee = featured.length >= MARQUEE_MIN_COUNT;

  return (
    <section className="py-12">
      <div className="mx-auto px-4 xl:container">
        <h2 className="mb-6 text-3xl font-extrabold tracking-tight">
          {title}
        </h2>
        <p className="mb-8 max-w-2xl text-sm text-muted-foreground">
          {description}
        </p>
      </div>

      <div className="hidden xl:block">
        {useMarquee ? (
          <InfiniteMarquee>
            {featured.map((item) => (
              <ProductCard
                key={item.id}
                item={item}
                locale={locale}
                className="w-sm mx-4"
              />
            ))}
          </InfiniteMarquee>
        ) : (
          <div className="mx-auto flex max-w-6xl justify-center gap-6 px-10">
            {featured.map((item) => (
              <ProductCard
                key={item.id}
                item={item}
                locale={locale}
                className="w-sm"
              />
            ))}
          </div>
        )}
      </div>

      <div className="relative px-10 xl:hidden">
        <Carousel opts={{ align: "start" }}>
          <CarouselContent>
            {featured.map((item) => (
              <CarouselItem
                key={item.id}
                className="md:basis-1/2 lg:basis-1/3"
              >
                <ProductCard
                  item={item}
                  locale={locale}
                  className="h-full"
                />
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious className="absolute left-0 top-1/2 hidden h-10 w-10 md:flex" />
          <CarouselNext className="absolute right-0 top-1/2 hidden h-10 w-10 md:flex" />
        </Carousel>
      </div>
    </section>
  );
}


 */
