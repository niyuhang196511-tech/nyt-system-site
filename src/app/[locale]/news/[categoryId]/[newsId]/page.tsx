import Link from "next/link";
import { notFound } from "next/navigation";
import ArticleClient from "@/components/news/ArticleClient";
import { Locale } from "@/types/locale";
import { getTranslations } from "next-intl/server";
import { getNews, getRelatedNewsById, getNewsList } from "@/lib/news";
import { getNewsCategory, getNewsCategoryById } from "@/lib/news-category";
import { Metadata } from "next";
import { routing } from "@/i18n/routing";
import { setRequestLocale } from "next-intl/server";

interface IParams {
  locale: Locale;
  categoryId: string;
  newsId: string;
}

export const revalidate = 60;

export const generateStaticParams = async () => {
  const params: { locale: Locale; categoryId: string; newsId: string }[] = [];
  const locales = routing.locales as readonly Locale[];

  for (const locale of locales) {
    const categories = await getNewsCategory(locale);
    for (const c of categories) {
      // 拉取该分类下的新闻列表，用较大 pageSize 以覆盖现有条目
      const list = await getNewsList(1, 500, "", c.id, locale);
      for (const item of list.list) {
        params.push({
          locale,
          categoryId: String(c.id),
          newsId: String(item.id),
        });
      }
    }
  }

  return params;
};

export const generateMetadata = async ({
  params,
}: {
  params: Promise<IParams>;
}): Promise<Metadata> => {
  const { locale, newsId } = await params;

  const siteDict = await getTranslations({ locale, namespace: "site" });

  const news = await getNews(Number(newsId));

  const categoryId = news.categoryId;

  const category = await getNewsCategoryById(categoryId, locale);

  const relatedList = (await getRelatedNewsById(Number(newsId), locale, 1, 10))
    .list;

  const title = ` ${news.title} | ${category.name}`;
  const description = news.subtitle;

  return {
    title,
    description,
    keywords: [
      news.title,
      news.subtitle,
      category.name,
      ...news.tags,
      ...relatedList.map((related) => related.title),
    ],
    openGraph: {
      type: "website",
      title,
      description,
      url: `https://www.jundaoxin.com/${locale}/news/${categoryId}/${newsId}`,
      siteName: siteDict("title"),
      locale,
    },
    alternates: {
      canonical: `https://www.jundaoxin.com/${locale}/news/${categoryId}/${newsId}`,
      languages: {
        "zh-CN": `https://www.jundaoxin.com/zh-CN/news/${categoryId}/${newsId}`,
        "en-US": `https://www.jundaoxin.com/en-US/news/${categoryId}/${newsId}`,
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
  const { locale, newsId } = await params;
  setRequestLocale(locale);

  const homeDict = await getTranslations({ locale, namespace: "home" });
  const newsDict = await getTranslations({ locale, namespace: "news" });

  const news = await getNews(Number(newsId));

  if (!news && !Object.keys(news).length) return notFound();

  const categoryId = news.categoryId;

  const category = await getNewsCategoryById(categoryId, locale);

  const relatedList = (await getRelatedNewsById(Number(newsId), locale, 1, 10))
    .list;

  return (
    <main className="min-h-screen bg-gray-50 p-6 md:p-12">
      <div className="mx-auto xl:container">
        {/* Header hero */}
        <header className="mb-6">
          <nav className="mb-3 text-sm text-muted-foreground">
            <Link href={`/${locale}`}>{homeDict("title")}</Link>
            <span className="mx-2">/</span>
            <Link href={`/${locale}/news/0`}>{newsDict("title")}</Link>
          </nav>

          <h1 className="text-3xl leading-tight font-bold">{news.title}</h1>
          {news.subtitle && (
            <p className="mt-2 text-muted-foreground">{news.subtitle}</p>
          )}
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
