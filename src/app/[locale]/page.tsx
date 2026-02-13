import RecommendProducts from "@/components/home/RecommendProducts";
import HeroBanner from "@/components/home/HeroBanner";
import CompanyIntroduce from "@/components/home/CompanyIntroduce";
import { Locale } from "@/types/locale";
import { getTranslations } from "next-intl/server";
import { strengthsConstants } from "@/constants/about";
import { getProductRecommend } from "@/lib/product";
import { getNewsLatest } from "@/lib/news";
import LatestNews from "@/components/home/LatestNews";
import { Metadata } from "next";

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> => {
  const { locale } = await params;
  const homeDict = await getTranslations("home");
  const siteDict = await getTranslations("site");

  const title = homeDict("heroBanner.title");
  const description =
    homeDict("heroBanner.description-1") +
    " " +
    homeDict("heroBanner.description-2");

  return {
    title,
    description,
    keywords: [
      homeDict("recommendProducts.title"),
      homeDict("recommendProducts.description"),
      homeDict("latestNews.title"),
      homeDict("latestNews.description"),
    ],
    openGraph: {
      type: "website",
      title,
      description,
      url: `https://www.jundaoxin.com/${locale}/`,
      siteName: siteDict("title"),
      locale,
    },
    alternates: {
      canonical: `https://www.jundaoxin.com/${locale}/`,
      languages: {
        "zh-CN": "https://www.jundaoxin.com/zh-CN",
        "en-US": "https://www.jundaoxin.com/en-US",
      },
    },
    robots: {
      index: true,
      follow: true,
    },
    other: {
      "script:ld+json": JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Organization",
        name: siteDict("title"),
        description,
        url: "https://www.jundaoxin.com",
        logo: "/images/logo.webp",
        foundingDate: "2015",
        industry: "Medical Devices",
      }),
    },
  };
};

/**
 * SSG
 * @returns
 */
export const generateStaticParams = async (): Promise<{ locale: Locale }[]> => {
  return [{ locale: "en-US" }, { locale: "zh-CN" }];
};

interface IParams {
  locale: Locale;
}

export default async function Page({ params }: { params: Promise<IParams> }) {
  const { locale } = await params;

  const homeDict = await getTranslations("home");
  const siteDict = await getTranslations("site");
  const aboutDict = await getTranslations("about");

  const productRecommend = await getProductRecommend(locale);
  const newsLatest = await getNewsLatest(locale, 1, 10);

  return (
    <section>
      <HeroBanner
        title={homeDict("heroBanner.title")}
        description={[
          homeDict("heroBanner.description-1"),
          homeDict("heroBanner.description-2"),
        ]}
        imageSrc="/images/banner.webp"
        imageAlt="Logo"
        videoSrc="/videos/hero-banner.mp4"
      />

      <CompanyIntroduce
        title={siteDict("title")}
        descriptions={[aboutDict("description-1"), aboutDict("description-2")]}
        strengths={strengthsConstants[locale]}
      ></CompanyIntroduce>

      <RecommendProducts
        title={homeDict("recommendProducts.title")}
        description={homeDict("recommendProducts.description")}
        featured={productRecommend}
        locale={locale}
      ></RecommendProducts>

      <LatestNews
        title={homeDict("latestNews.title")}
        description={homeDict("latestNews.description")}
        cover={homeDict("latestNews.cover")}
        news={newsLatest}
        locale={locale}
      ></LatestNews>
    </section>
  );
}
