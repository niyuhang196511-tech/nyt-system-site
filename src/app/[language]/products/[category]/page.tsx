import { getLanguage } from "@/lib/getLanguage";
import { Language } from "@/types/language";
import Image from "next/image";
export const dynamic = "force-dynamic";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface IProps {
  params: Promise<{ language: string; category: string }>;
}

export default async function CateGoryPage({ params }: IProps) {
  const { language, category } = await params;
  const dict = await getLanguage(language as Language);

  const categories = dict.product.classify;

  const categoryItem = categories.find(
    (cat) => cat.id.toString() === category,
  )!;

  const products = dict.product.featured.filter(
    (item) => item.category_id.toString() === category,
  );

  return (
    <section>
      <div className="mx-auto grid grid-cols-1 gap-12 px-4 py-14 md:grid-cols-2 md:px-6 xl:container">
        <div className="flex flex-col justify-center">
          <h1 className="mb-6 text-4xl font-bold">{categoryItem.label}</h1>
          <p>{categoryItem.description}</p>
        </div>

        <Image
          className="w-full rounded-2xl object-cover"
          style={{
            boxShadow:
              "7px 7px 10px rgba(0,0,0,0.15), 7px 7px 10px rgba(0,0,0,0.15), 7px 7px 10px rgba(0,0,0,0.15)",
          }}
          src="/images/product-banner.webp"
          alt="Product Banner"
          width={600}
          height={400}
        />
      </div>
      <div className="flex flex-col">
        {products.map((product, index) => (
          <div key={product.id} className="flex bg-accent py-14">
            <div className="mx-auto grid grid-cols-1 gap-6 px-6 md:grid-cols-2 xl:container">
              {index % 2 === 0 ? (
                <>
                  <div>
                    <h2 className="mb-6 text-3xl font-bold">{product.name}</h2>
                    <div className="mb-6 indent-8 leading-8">
                      {product.description}
                    </div>
                    <Link
                      href={`/${language}/products/${category}/${product.id}`}
                    >
                      <Button className="rounded-3xl">
                        {dict.product.more}
                      </Button>
                    </Link>
                  </div>

                  <Image
                    className="w-full rounded-2xl object-cover"
                    style={{
                      boxShadow: "rgba(0,0,0,0.33) 0px 3px 0px 0px",
                    }}
                    src={product.href}
                    alt={product.name}
                    width={400}
                    height={300}
                  />
                </>
              ) : (
                <>
                  <Image
                    className="w-full rounded-2xl object-cover"
                    style={{
                      boxShadow: "rgba(0,0,0,0.33) 0px 3px 0px 0px",
                    }}
                    src={product.href}
                    alt={product.name}
                    width={400}
                    height={300}
                  />
                  <div>
                    <h2 className="mb-6 text-3xl font-bold">{product.name}</h2>
                    <div className="mb-6 indent-8 leading-8">
                      {product.description}
                    </div>
                    <Link
                      href={`/${language}/products/${category}/${product.id}`}
                    >
                      <Button className="rounded-3xl">
                        {dict.product.more}
                      </Button>
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
