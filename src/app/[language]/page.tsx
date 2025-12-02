import { getLanguage } from "@/lib/getLanguage";
import { Language } from "@/types/language";
import Image from "next/image";
import FeaturedProducts from "@/components/FeaturedProducts";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/components/ui/item";
import Link from "next/link";

/**
 * SSG
 * @returns
 */
export const generateStaticParams = async (): Promise<
  { language: Language }[]
> => {
  return [{ language: "en" }, { language: "zh-CN" }];
};

export default async function Page({
  params,
}: {
  params: Promise<{ language: string }>;
}) {
  const { language } = await params;

  const dict = await getLanguage(language as Language);

  const newsItems = dict.new.featured.map((item) => (
    <Item key={item.id} variant="outline" className="mb-2.5" asChild>
      <Link href="#">
        <ItemContent>
          <ItemTitle>{item.title}</ItemTitle>
        </ItemContent>
        <ItemContent>
          <ItemDescription>{item.date}</ItemDescription>
        </ItemContent>
      </Link>
    </Item>
  ));

  return (
    <section>
      <section className="relative overflow-hidden">
        <video
          className="absolute inset-0 -z-10 h-full w-full object-cover"
          autoPlay
          muted
          loop
        >
          <source src="https://www.medtronic.com/content/dam/medtronic-wide/public/brand-corporate-assets/imagery/concept/26-dtc-masterbrand-home-page-abstract-bnr-desktop-1440-700-web.mp4" />
        </video>
        <div className="mx-auto px-4 py-4 xl:container xl:px-26 xl:py-16">
          <div className="grid h-full w-full grid-cols-1 gap-3 rounded-2xl bg-white/70 px-4 py-6 md:grid-cols-2 xl:gap-24 xl:px-9 xl:py-12">
            <div>
              <div className="mb-4">
                <Image
                  className="border-b-2 border-b-gray-400 pb-4"
                  src="/hand-holding-heart.svg"
                  alt="hand-holding-heart"
                  width={50}
                  height={50}
                ></Image>
              </div>
              <h2 className="mb-5 text-4xl font-bold">{dict.home.one.title}</h2>
              {/* <h2 className="mb-5 text-4xl font-bold text-gray-900"></h2> */}
              {dict.home.one.description.map((paragraph, index) => (
                <p key={index} className="indent-8 text-base leading-9">
                  {paragraph}
                </p>
              ))}
            </div>
            <div className="flex flex-col justify-center">
              <Image
                style={{
                  boxShadow:
                    "7px 7px 10px rgba(0,0,0,0.15), 7px 7px 10px rgba(0,0,0,0.15), 7px 7px 10px rgba(0,0,0,0.15)",
                }}
                className="-right-24 w-full rounded-2xl object-cover xl:relative"
                src={"/images/banner.webp"}
                alt="Logo"
                width={500}
                height={500}
              ></Image>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container mx-auto px-4 py-12 sm:px-6 sm:py-16 lg:px-28">
          <div className="mb-12 sm:mb-16">
            <h1 className="mb-6 text-center text-3xl font-medium text-foreground sm:text-4xl">
              {dict.site.title}
            </h1>

            <div className="mx-auto max-w-4xl">
              {dict.home.two.description.map((paragraph, index) => (
                <p className="mb-5 indent-8 italic" key={index}>
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 sm:gap-12 lg:grid-cols-4">
            {dict.home.two.shows.map((show, index) => (
              <div
                key={show.description}
                className="flex flex-col items-center gap-3 py-6"
                style={{
                  boxShadow: "0 1px 0 rgba(171, 171, 171, 0.4)",
                }}
              >
                <div className="grid min-w-48 grid-cols-2 items-center justify-center">
                  <Image
                    src={show.image}
                    alt={show.description + " 图标"}
                    width={50}
                    height={50}
                    className="icon-sm"
                  />
                  <span className="card-text text-2xl font-semibold text-foreground">
                    {show.num}
                    {show.unit}
                  </span>
                </div>
                <div className="card-text text-lg text-foreground sm:text-2xl">
                  {show.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FeaturedProducts language={language as Language}></FeaturedProducts>

      <section className="mx-auto px-4 py-12 xl:container">
        <h2 className="mb-6 text-3xl font-extrabold tracking-tight">
          {dict.home.four.title}
        </h2>
        <p className="mb-8 max-w-2xl text-sm text-muted-foreground">
          {dict.home.four.description}
        </p>

        <div className="grid gap-x-6 xl:grid-cols-2">
          <div className="hidden w-full items-center xl:flex">
            <Image
              className="w-full"
              src="/images/message-banner.webp"
              alt="Message Banner"
              width={600}
              height={300}
            />
          </div>
          <ScrollArea className="hidden h-[500px] w-full xl:block">
            {newsItems}
          </ScrollArea>
          <div className="xl:hidden">{newsItems}</div>
        </div>
      </section>
    </section>
  );
}
