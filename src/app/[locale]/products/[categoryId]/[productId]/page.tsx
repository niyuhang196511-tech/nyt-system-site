import { Locale } from "@/types/locale";
import Image from "next/image";
import VideoPlayer from "@/components/VideoPlayer";
import HeroModel from "@/components/product/HeroModel";
import DetailInfo from "@/components/product/DetailInfo";
import { getProductById } from "@/lib/product";
import { getProductCategoryById } from "@/lib/product-category";
import { toMediaUrl } from "@/lib/utils";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

interface IParams {
  locale: Locale;
  categoryId: string;
  productId: string;
}

export const generateMetadata = async ({
  params,
}: {
  params: Promise<IParams>;
}): Promise<Metadata> => {
  const { locale, categoryId, productId } = await params;

  const siteDict = await getTranslations("site");

  const category = await getProductCategoryById(categoryId, locale);
  const product = await getProductById(productId, locale);

  const title = ` ${product.name} | ${category.name}`;
  const description = product.description;

  return {
    title,
    description,
    keywords: [
      product.name,
      category.name,
      ...product.characteristics.map((char) => char.name),
      ...product.videos.map((vid) => vid.title),
    ],
    openGraph: {
      type: "website",
      title,
      description,
      url: `https://www.jundaoxin.com/${locale}/products/${categoryId}/${productId}`,
      siteName: siteDict("title"),
      locale,
    },
    alternates: {
      canonical: `https://www.jundaoxin.com/${locale}/products/${categoryId}/${productId}`,
      languages: {
        "zh-CN": `https://www.jundaoxin.com/zh-CN/products/${categoryId}/${productId}`,
        "en-US": `https://www.jundaoxin.com/en-US/products/${categoryId}/${productId}`,
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
        name: product.name,
        description: description,
        url: "https://www.jundaoxin.com",
        logo: "/images/logo.webp",
        foundingDate: "2015",
        industry: "Medical Devices",
      }),
    },
  };
};

export default async function ProductPage({
  params,
}: {
  params: Promise<IParams>;
}) {
  const { locale, categoryId, productId } = await params;

  const category = await getProductCategoryById(categoryId, locale);
  const product = await getProductById(productId, locale);

  return (
    <section className="space-y-5 xl:space-y-10">
      <HeroModel modelSrc={product.heroVideo}></HeroModel>

      <DetailInfo
        product={product}
        category={category}
        locale={locale}
        carouselImages={product.images}
      ></DetailInfo>

      {/* ========== Color Page ========== */}
      <section className="mx-auto px-4 xl:container">
        <Image
          className="h-auto w-full rounded-lg object-cover shadow-md"
          src={toMediaUrl(product.colorPage)}
          alt="color page"
          width={1200}
          height={800}
        />
      </section>

      {/* ========== Video Grid ========== */}
      <section className="mx-auto grid gap-10 px-4 py-10 md:grid-cols-2 xl:container xl:grid-cols-3">
        {product.videos.map((video) => (
          <VideoPlayer
            videoName={video.title}
            key={video.id}
            sources={[
              {
                url: video.address,
                label: "标准清晰度",
                value: "HD",
              },
            ]}
          />
        ))}
      </section>
    </section>
  );
}
