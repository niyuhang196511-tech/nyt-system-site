import products from "@/data/products";
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
import InfiniteMarquee from "@/components/InfiniteMarquee";
import { Language } from "@/types/language";
import { getLanguage } from "@/lib/getLanguage";

export default async function FeaturedProducts({
  language,
}: {
  language: Language;
}) {
  const dict = await getLanguage(language);
  const productCards = dict.product.featured.map((item) => (
    <Card key={item.id} className="w-sm">
      <CardContent>
        <Image
          className="w-full"
          src={item.href}
          alt={item.name}
          width={200}
          height={200}
        />
      </CardContent>
      <CardHeader>
        <CardTitle>{item.name}</CardTitle>
        <CardDescription className="indent-8 text-wrap">
          {item.description}
        </CardDescription>
      </CardHeader>
    </Card>
  ));

  const productCarouselCards = products.map((item) => (
    <CarouselItem key={item.id} className="md:basis-1/2 lg:basis-1/3">
      <div className="h-full">
        <Card key={item.id} className="h-full w-full">
          <CardContent>
            <Image
              className="w-full"
              src={item.href}
              alt={item.name}
              width={200}
              height={200}
            />
          </CardContent>
          <CardHeader>
            <CardTitle>{item.name}</CardTitle>
            <CardDescription className="indent-8 text-wrap">
              {item.description}
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    </CarouselItem>
  ));
  return (
    <section className="py-12">
      <div className="mx-auto px-4 xl:container">
        <h2 className="mb-6 text-3xl font-extrabold tracking-tight">
          {dict.home.three.title}
        </h2>
        <p className="mb-8 max-w-2xl text-sm text-muted-foreground">
          {dict.home.three.description}
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
