import { getLanguage } from "@/lib/getLanguage";
import { Language } from "@/types/language";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import HeroBanner from "@/components/home/HeroBanner";
import CompanyIntroduce from "@/components/home/CompanyIntroduce";
import LatestNews from "@/components/home/LatestNews";

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

  return (
    <section>
      {/*  */}
      <HeroBanner
        title={dict.home.heroBanner.title}
        description={dict.home.heroBanner.descriptions}
        imageSrc="/images/banner.webp"
        imageAlt="Logo"
      />

      <CompanyIntroduce
        title={dict.site.title}
        descriptions={dict.about.descriptions}
        strengths={dict.about.strengths}
      ></CompanyIntroduce>

      <FeaturedProducts
        title={dict.home.featuredProducts.title}
        description={dict.home.featuredProducts.description}
        featured={dict.product.featured}
        language={language as Language}
      ></FeaturedProducts>

      <LatestNews
        title={dict.home.latestNews.title}
        description={dict.home.latestNews.description}
        cover={dict.home.latestNews.cover}
        // @ts-ignore
        news={dict.new.latest}
      ></LatestNews>
    </section>
  );
}
