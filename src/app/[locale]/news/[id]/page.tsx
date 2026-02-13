import Link from "next/link";
import { notFound } from "next/navigation";
import ArticleClient from "@/components/news/ArticleClient";
import { Locale } from "@/types/locale";
import { getTranslations } from "next-intl/server";
import { getNews, getRelatedNewsById } from "@/lib/news";
import { getNewsCategoryById } from "@/lib/news-category";
import dayjs from "dayjs";
import { YEAR_MONTH_DAY_HOUR_MINUTE_SECOND } from "@/constants/format";
import { Metadata } from "next";

interface IParams {
  locale: Locale;
  id: number;
}

export const generateMetadata = async ({
  params,
}: {
  params: Promise<IParams>;
}): Promise<Metadata> => {
  const { locale, id } = await params;

  const siteDict = await getTranslations("site");

  const news = await getNews(id);

  const categoryId = news.categoryId;

  const category = await getNewsCategoryById(categoryId, locale);

  const relatedList = (await getRelatedNewsById(id, locale, 1, 10)).list;

  const title = ` ${news.title} | ${category.name}`;
  const description = news.subtitle;

  return {
    title,
    description,
    keywords: [
      news.title,
      category.name,
      ...news.tags.map((tag) => tag.name),
      ...relatedList.map((related) => related.title),
    ],
    openGraph: {
      type: "website",
      title,
      description,
      url: `https://www.jundaoxin.com/${locale}/news/${id}`,
      siteName: siteDict("title"),
      locale,
    },
    alternates: {
      canonical: `https://www.jundaoxin.com/${locale}/news/${id}`,
      languages: {
        "zh-CN": `https://www.jundaoxin.com/zh-CN/news/${id}`,
        "en-US": `https://www.jundaoxin.com/en-US/news/${id}`,
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
        name: news.title,
        description: description,
        url: "https://www.jundaoxin.com",
        logo: "/images/logo.webp",
        foundingDate: "2015",
        industry: "Medical Devices",
      }),
    },
  };
};

export default async function ArticlePage({
  params,
}: {
  params: Promise<IParams>;
}) {
  const { locale, id } = await params;

  const homeDict = await getTranslations("home");
  const newsDict = await getTranslations("news");

  const news = await getNews(id);

  if (!Object.keys(news).length) return notFound();

  const categoryId = news.categoryId;

  const category = await getNewsCategoryById(categoryId, locale);

  const relatedList = (await getRelatedNewsById(id, locale, 1, 10)).list;

  return (
    <main className="min-h-screen bg-gray-50 p-6 md:p-12">
      <div className="mx-auto xl:container">
        {/* Header hero */}
        <header className="mb-6">
          <nav className="mb-3 text-sm text-muted-foreground">
            <Link href={`/${locale}`}>{homeDict("title")}</Link>
            <span className="mx-2">/</span>
            <Link href={`/${locale}/news`}>{newsDict("title")}</Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">{news.title}</span>
          </nav>

          <h1 className="text-3xl leading-tight font-bold">{news.title}</h1>
          {news.subtitle && (
            <p className="mt-2 text-muted-foreground">{news.subtitle}</p>
          )}

          <div className="mt-3 flex items-center gap-4 text-sm text-muted-foreground">
            <span>
              {dayjs(news.date).format(YEAR_MONTH_DAY_HOUR_MINUTE_SECOND)}
            </span>
            <span>·</span>
            <span>{news.author}</span>
            <span>·</span>
            <span>
              {news.views} {newsDict("views")}
            </span>
          </div>
        </header>

        <ArticleClient
          news={news}
          category={category}
          relatedList={relatedList}
          locale={locale}
        />
      </div>
    </main>
  );
}
