import NewsList from "@/components/news/NewsList";
import { getNewsCategory } from "@/lib/news-category";
import { Locale } from "@/types/locale";
import { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import BackToTop from "@/components/BackToTop";
import { routing } from "@/i18n/routing";

interface IParams {
  locale: Locale;
  categoryId: string;
}

export const revalidate = 60;

export const generateStaticParams = async () => {
  const params: { locale: Locale; categoryId: string }[] = [];
  const locales = routing.locales as readonly Locale[];

  for (const locale of locales) {
    const categories = await getNewsCategory(locale);
    // include "0" (all) and every category id
    params.push({ locale, categoryId: "0" });
    for (const c of categories) {
      params.push({ locale, categoryId: String(c.id) });
    }
  }

  return params;
};

export const generateMetadata = async ({
  params,
}: {
  params: Promise<IParams>;
}): Promise<Metadata> => {
  const { locale } = await params;

  const siteDict = await getTranslations({ locale, namespace: "site" });
  const newsDict = await getTranslations({ locale, namespace: "news" });
  const categories = await getNewsCategory(locale);

  const title = `${newsDict("title")}`;
  const description =
    newsDict("description-1") + " " + newsDict("description-2");

  return {
    title,
    description,
    keywords: [title, ...categories.map((cat) => cat.name)],
    openGraph: {
      type: "website",
      title,
      description,
      url: `https://www.jundaoxin.com/${locale}/news`,
      siteName: siteDict("title"),
      locale,
    },
    alternates: {
      canonical: `https://www.jundaoxin.com/${locale}/news`,
      languages: {
        "zh-CN": `https://www.jundaoxin.com/zh-CN/news`,
        "en-US": `https://www.jundaoxin.com/en-US/news`,
      },
    },
    robots: {
      index: true,
      follow: true,
    },
    other: {
      "script:ld+json": JSON.stringify({
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: newsDict("title"),
        description,
        url: "https://www.jundaoxin.com",
        logo: "/images/logo.webp",
        foundingDate: "2015",
        industry: "Medical Devices",
      }),
    },
  };
};

export default async function NewsPage({
  params,
}: {
  params: Promise<IParams>;
}) {
  const { locale, categoryId } = await params;
  setRequestLocale(locale);

  const newsDict = await getTranslations({ locale, namespace: "news" });
  const categories = await getNewsCategory(locale);

  categories.unshift({
    id: 0,
    lang: locale,
    name: newsDict("all-categories"),
    description: "",
  });

  return (
    <div className="min-h-[calc(100vh-10rem)] w-full bg-gray-50 p-6 md:p-12">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-6">
          <h1 className="mb-2 text-4xl font-bold">{newsDict("title")}</h1>
          <p className="text-muted-foreground">{newsDict("description-1")}</p>
          <p className="text-muted-foreground">{newsDict("description-2")}</p>
        </div>

        <NewsList
          locale={locale}
          categories={categories}
          categoryId={Number(categoryId)}
        />

        <BackToTop threshold={360} showOnDesktop={true} />
      </div>
    </div>
  );
}
