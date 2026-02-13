import { Locale } from "@/types/locale";
import HeroBanner from "@/components/product/HeroBanner";
import CoverCard from "@/components/product/CoverCard";
import { getTranslations } from "next-intl/server";
import {
  getProductCategoryById,
  getProductCategory,
} from "@/lib/product-category";
import { getProductsByCategoryId } from "@/lib/product";
import { Metadata } from "next";

interface IParams {
  locale: Locale;
  categoryId: string;
}

export const generateMetadata = async ({
  params,
}: {
  params: Promise<IParams>;
}): Promise<Metadata> => {
  const { locale, categoryId } = await params;
  const productDict = await getTranslations("product");
  const siteDict = await getTranslations("site");

  const categories = await getProductCategory(locale);
  const category = await getProductCategoryById(categoryId, locale);

  const products = await getProductsByCategoryId(categoryId, locale);

  const title = `${category.name}`;
  const description =
    productDict("description-1") + " " + productDict("description-2");

  return {
    title,
    description,
    keywords: [
      title,
      ...categories.map((cat) => cat.name),
      ...products.map((prod) => prod.name),
    ],
    openGraph: {
      type: "website",
      title,
      description,
      url: `https://www.jundaoxin.com/${locale}/products/${categoryId}`,
      siteName: siteDict("title"),
      locale,
    },
    alternates: {
      canonical: `https://www.jundaoxin.com/${locale}/products/${categoryId}`,
      languages: {
        "zh-CN": `https://www.jundaoxin.com/zh-CN/products/${categoryId}`,
        "en-US": `https://www.jundaoxin.com/en-US/products/${categoryId}`,
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
        name: productDict("title"),
        description,
        url: "https://www.jundaoxin.com",
        logo: "/images/logo.webp",
        foundingDate: "2015",
        industry: "Medical Devices",
      }),
    },
  };
};

export default async function CateGoryPage({
  params,
}: {
  params: Promise<IParams>;
}) {
  const { locale, categoryId } = await params;

  const productDict = await getTranslations("product");

  const category = await getProductCategoryById(categoryId, locale);
  const categories = await getProductCategory(locale);

  const products = await getProductsByCategoryId(categoryId, locale);

  return (
    <section>
      <HeroBanner
        category={category}
        categories={categories}
        locale={locale}
      ></HeroBanner>

      <div className="flex flex-col">
        {products.map((product, index) => (
          <CoverCard
            key={product.id}
            product={product}
            direction={index % 2 === 0 ? "left" : "right"}
            locale={locale}
            more={productDict("more")}
            index={index}
          ></CoverCard>
        ))}
      </div>
    </section>
  );
}
