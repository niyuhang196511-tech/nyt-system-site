import BackToTop from "@/components/BackToTop";
import { Metadata } from "next";
import type { Locale } from "@/types/locale";
import { getTranslations } from "next-intl/server";
import CompanyNewsList from "@/components/company-news/CompanyNewsList";

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> => {
  const { locale } = await params;
  const companyNewsDict = await getTranslations({
    locale,
    namespace: "company-news",
  });

  const title = companyNewsDict("title");
  const description = companyNewsDict("description");

  return {
    title,
    description,
    keywords: [title, description],
    openGraph: {
      type: "website",
      title,
      description,
      url: `https://www.jundaoxin.com/${locale}/company-news`,
      siteName: companyNewsDict("title"),
      locale,
    },
    alternates: {
      canonical: `https://www.jundaoxin.com/${locale}/company-news`,
      languages: {
        "zh-CN": "https://www.jundaoxin.com/zh-CN/company-news",
        "en-US": "https://www.jundaoxin.com/en-US/company-news",
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
        name: companyNewsDict("title"),
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

export const revalidate = 60;
export const dynamicParams = false;
export const dynamic = "force-static";

interface IParams {
  locale: Locale;
}

export default async function CompanyNewsPage({
  params,
}: {
  params: Promise<IParams>;
}) {
  const { locale } = await params;

  const companyNewsDict = await getTranslations({
    locale,
    namespace: "company-news",
  });

  return (
    <div className="min-h-[calc(100vh-10rem)] w-full bg-gray-50 p-6 md:p-12">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-6">
          <h1 className="mb-2 text-4xl font-bold">
            {companyNewsDict("title")}
          </h1>
          <p className="text-muted-foreground">
            {companyNewsDict("description")}
          </p>
        </div>

        <CompanyNewsList locale={locale} />

        <BackToTop threshold={360} showOnDesktop={true} />
      </div>
    </div>
  );
}
