import RecommendProducts from "@/components/home/RecommendProducts";
import HeroBanner from "@/components/home/HeroBanner";
import CompanyIntroduce from "@/components/home/CompanyIntroduce";
import LatestNews from "@/components/home/LatestNews";
import LatestCompanyNews from "@/components/home/LatestCompanyNews";

import { Locale } from "@/types/locale";
import { getTranslations } from "next-intl/server";
import { strengthsConstants } from "@/constants/about";
import { getProductRecommend } from "@/lib/product";
import { getNewsLatest } from "@/lib/news";
import { getCompanyNewsList } from "@/lib/company-news";
import { Metadata } from "next";
import { Cta } from "@/types/home";
import { getProductCategory } from "@/lib/product-category";
import { routing } from "@/i18n/routing";

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> => {
  const { locale } = await params;
  const homeDict = await getTranslations({ locale, namespace: "home" });
  const siteDict = await getTranslations({ locale, namespace: "site" });

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
  const params: { locale: Locale }[] = [];
  const locales = routing.locales as readonly Locale[];

  for (const locale of locales) {
    params.push({ locale });
  }

  return params;
};

export const revalidate = 60;
export const dynamicParams = false;
export const dynamic = "force-static";

interface IParams {
  locale: Locale;
}

export default async function Page({ params }: { params: Promise<IParams> }) {
  const { locale } = await params;

  const homeDict = await getTranslations({ locale, namespace: "home" });
  const siteDict = await getTranslations({ locale, namespace: "site" });
  const aboutDict = await getTranslations({ locale, namespace: "about" });

  const productCategories = await getProductCategory(locale);
  const productRecommend = await getProductRecommend(locale);
  const companyNews = (await getCompanyNewsList(locale, 1, 10)).list;
  const newsLatest = await getNewsLatest(locale, 1, 10);

  const firstCategory = productCategories[0];

  const ctas: Cta[] = [
    {
      title: homeDict("heroBanner.cta-1"),
      link: `/${locale}/products/${firstCategory?.id ?? 0}`,
    },
    {
      title: homeDict("heroBanner.cta-2"),
      link: `/${locale}/about`,
    },
  ];

  return (
    <section className="flex flex-col gap-10 pb-10">
      <HeroBanner
        ctas={ctas}
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

      {!!productRecommend.length && (
        <RecommendProducts
          title={homeDict("recommendProducts.title")}
          description={homeDict("recommendProducts.description")}
          featured={productRecommend}
          locale={locale}
        ></RecommendProducts>
      )}

      {!!(companyNews.length > 1) && (
        <LatestCompanyNews
          title={homeDict("latestCompanyNews.title")}
          description={homeDict("latestCompanyNews.description")}
          news={companyNews}
          locale={locale}
        ></LatestCompanyNews>
      )}

      {!!(newsLatest.length > 1) && (
        <LatestNews
          title={homeDict("latestNews.title")}
          description={homeDict("latestNews.description")}
          news={newsLatest}
          locale={locale}
        ></LatestNews>
      )}
    </section>
  );
}
