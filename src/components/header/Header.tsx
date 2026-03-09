import { Locale } from "@/types/locale";
import Image from "next/image";
import LanguageSwitcher from "./LanguageSwitcher";
import Nav from "./Nav";
import HamburgerNav from "./HamburgerNav";
import { getTranslations } from "next-intl/server";
import { getProductCategory } from "@/lib/product-category";
import { getNewsCategory } from "@/lib/news-category";
import Link from "next/link";

interface IProps {
  locale: Locale;
}

export default async function Header({ locale }: IProps) {
  const siteDict = await getTranslations({ locale, namespace: "site" });
  const homeDict = await getTranslations({ locale, namespace: "home" });
  const productDict = await getTranslations({ locale, namespace: "product" });
  const companyNewsDict = await getTranslations({
    locale,
    namespace: "company-news",
  });
  const newsDict = await getTranslations({ locale, namespace: "news" });
  const aboutDict = await getTranslations({ locale, namespace: "about" });
  const contactDict = await getTranslations({ locale, namespace: "contact" });

  const productCategories = await getProductCategory(locale);
  const newsCategories = await getNewsCategory(locale);

  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/95 backdrop-blur-sm">
      <section className="mx-auto flex h-16 items-center justify-between px-4 xl:container">
        <Link
          href={`/${locale}`}
          className="flex shrink-0 items-center gap-x-3"
        >
          <Image
            src="/images/logo.webp"
            alt={siteDict("logoAlt")}
            width={36}
            height={36}
          />
          <h1 className="hidden text-2xl font-bold tracking-tight text-primary xl:block">
            {siteDict("title")}
          </h1>
        </Link>

        <Nav
          locale={locale}
          labels={{
            home: homeDict("title"),
            product: productDict("title"),
            productDesc1: productDict("description-1"),
            productDesc2: productDict("description-2"),
            companyNews: companyNewsDict("title"),
            news: newsDict("title"),
            newsDesc1: newsDict("description-1"),
            newsDesc2: newsDict("description-2"),
            about: aboutDict("title"),
            contact: contactDict("title"),
          }}
          productCategories={productCategories}
          newsCategories={newsCategories}
        />

        <div className="flex items-center gap-x-1">
          <LanguageSwitcher locale={locale} />
          <HamburgerNav locale={locale} />
        </div>
      </section>
    </header>
  );
}
