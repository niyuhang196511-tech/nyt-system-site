import { Locale } from "@/types/locale";
import { Product, ProductCategory } from "@/types/product";
import Image from "next/image";
import Link from "next/link";
import Carousel from "../Carousel";

interface IProps {
  product: Product;
  locale: Locale;
  category: ProductCategory;
  carouselImages: string[];
}

export default function DetailInfo({
  product,
  category,
  locale,
  carouselImages,
}: IProps) {
  return (
    <section className="mx-auto grid grid-cols-1 gap-14 px-4 md:grid-cols-2 md:px-6 xl:container">
      {/* left info */}
      <div className="flex flex-col justify-center">
        <div className="mb-6">
          <div className="inline-flex items-center gap-5 border-b border-gray-300 pb-4">
            <Image
              src="/hand-holding-heart.svg"
              alt="hand-holding-heart"
              width={48}
              height={48}
            />
            <Link href={`/${locale}/products/${product.categoryId}`}>
              <h2 className="text-xl font-semibold transition hover:text-blue-600 xl:text-2xl">
                {category.name}
              </h2>
            </Link>
          </div>
        </div>

        <h1 className="mb-6 text-3xl font-bold tracking-wide xl:text-4xl">
          {product.name}
        </h1>

        <p className="indent-8 leading-8 text-gray-700">
          {product.description}
        </p>
      </div>

      {/* right images */}
      <div>
        <Carousel images={carouselImages} />
      </div>
    </section>
  );
}
