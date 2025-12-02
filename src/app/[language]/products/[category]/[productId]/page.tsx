import { getLanguage } from "@/lib/getLanguage";
import { Language } from "@/types/language";
import Image from "next/image";

interface IProps {
  params: Promise<{ language: string; category: string; productId: string }>;
}

export default async function ProductPage({ params }: IProps) {
  const { language, category, productId } = await params;
  const dict = await getLanguage(language as Language);
  const product = dict.product.featured.find(
    (item) => item.id.toString() === productId,
  )!;

  return (
    <section>
      <div className="relative h-[calc(100vh-4rem)] bg-black">
        <Image
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          src={product.href}
          alt={product.name}
          width={1200}
          height={1000}
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-5 bg-black/55 px-4">
          <h1 className="text-xl font-bold text-white sm:text-2xl md:text-3xl xl:text-4xl">
            {product.name}
          </h1>
        </div>
      </div>
    </section>
  );
}
