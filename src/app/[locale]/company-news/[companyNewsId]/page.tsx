import { routing } from "@/i18n/routing";
import { getCompanyNews, getCompanyNewsList } from "@/lib/company-news";
import { Locale } from "@/types/locale";
import { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Link from "next/link";
import { notFound } from "next/navigation";
import CompanyArticleClient from "@/components/company-news/CompanyArticleClient";

interface IParams {
  locale: Locale;
  companyNewsId: string;
}

export const revalidate = 60;

export const generateStaticParams = async () => {
  const params: { locale: Locale; companyNewsId: string }[] = [];
  const locales = routing.locales as readonly Locale[];

  for (const locale of locales) {
    const list = await getCompanyNewsList(locale, 1, 500);
    for (const item of list.list) {
      params.push({
        locale,
        companyNewsId: String(item.id),
      });
    }
  }

  return params;
};

export const generateMetadata = async ({
  params,
}: {
  params: Promise<IParams>;
}): Promise<Metadata> => {
  const { locale, companyNewsId } = await params;

  const companyNewsDict = await getTranslations({
    locale,
    namespace: "company-news",
  });

  const companyNews = await getCompanyNews(Number(companyNewsId));

  const title = `${companyNews.title}`;
  const description = companyNews.subtitle;

  return {
    title,
    description,
    keywords: [companyNews.title, companyNews.subtitle],
    openGraph: {
      type: "website",
      title,
      description,
      url: `https://www.jundaoxin.com/${locale}/company-news/${companyNewsId}`,
      siteName: companyNewsDict("title"),
      locale,
    },
    alternates: {
      canonical: `https://www.jundaoxin.com/${locale}/company-news/${companyNewsId}`,
      languages: {
        "zh-CN": `https://www.jundaoxin.com/zh-CN/company-news/${companyNewsId}`,
        "en-US": `https://www.jundaoxin.com/en-US/company-news/${companyNewsId}`,
      },
    },
    robots: {
      index: true,
      follow: true,
    },
    other: {
      "script:ld+json": JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Product",
        name: companyNews.title,
        description: description,
        url: "https://www.jundaoxin.com",
        logo: "/images/logo.webp",
        foundingDate: "2015",
        industry: "Medical Devices",
      }),
    },
  };
};

export default async function CompanyArticlePage({
  params,
}: {
  params: Promise<IParams>;
}) {
  const { locale, companyNewsId } = await params;
  setRequestLocale(locale);

  const homeDict = await getTranslations({ locale, namespace: "home" });
  const companyNewsDict = await getTranslations({
    locale,
    namespace: "company-news",
  });

  const companyNews = await getCompanyNews(Number(companyNewsId));

  if (!companyNews && !Object.keys(companyNews).length) return notFound();

  return (
    <main className="min-h-screen bg-gray-50 p-6 md:p-12">
      <div className="mx-auto xl:container">
        {/* Header hero */}
        <header>
          <nav className="mb-3 text-sm text-muted-foreground">
            <Link href={`/${locale}`}>{homeDict("title")}</Link>
            <span className="mx-2">/</span>
            <Link href={`/${locale}/company-news`}>
              {companyNewsDict("title")}
            </Link>
          </nav>

          <h1 className="text-3xl leading-tight font-bold">
            {companyNews.title}
          </h1>
          <p className="mt-2 text-muted-foreground">{companyNews.subtitle}</p>
        </header>

        <CompanyArticleClient news={companyNews} locale={locale} />
      </div>
    </main>
  );
}
