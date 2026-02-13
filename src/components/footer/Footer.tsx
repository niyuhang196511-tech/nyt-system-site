import { Locale } from "@/types/locale";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import Link from "next/link";
import { contactsInfoConstants } from "@/constants/contact";
import { getProductCategory } from "@/lib/product-category";
import { getNewsCategory } from "@/lib/news-category";

interface IProps {
  locale: Locale;
}

export default async function Footer({ locale }: IProps) {
  const contactDict = await getTranslations("contact");
  const productDict = await getTranslations("product");
  const newsDict = await getTranslations("news");
  const footerDict = await getTranslations("footer");

  const productCategories = await getProductCategory(locale);

  const newsCategories = await getNewsCategory(locale);

  return (
    <footer className="bg-primary">
      <div className="mx-auto px-4 py-10 text-white xl:container">
        <div className="mb-10 grid gap-12 md:grid-cols-2 xl:grid-cols-3">
          <div>
            <h3 className="mb-6 text-2xl">{footerDict("contact.title")}</h3>
            <ul className="flex flex-col gap-3">
              {contactsInfoConstants.map((contact, index) => (
                <li key={index} className="my-2 flex items-center gap-2">
                  <Image src={contact.icon} alt="" width={22} height={22} />
                  <span className="text-sm">
                    {contactDict(`${contact.key}`)}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-6 text-2xl">{productDict("title")}</h3>
            <ul className="flex flex-col gap-3">
              {productCategories.map((category, index) => (
                <li
                  key={index}
                  className="my-2 flex items-center gap-2 text-sm"
                >
                  <Link href={`/${locale}/products/${category.id}`}>
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-6 text-2xl">{newsDict("title")}</h3>
            <ul className="flex flex-col gap-3">
              {newsCategories.map((category) => (
                <li
                  key={category.id}
                  className="my-2 flex items-center gap-2 text-sm"
                >
                  <Link href={`/${locale}/news#${category.id}`}>
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <ul className="flex w-full flex-wrap justify-between gap-6">
          <li>{footerDict("icp_license")}</li>
          <li className="flex items-center">
            {footerDict("police_title")}
            <Image
              className="mx-1"
              src="/images/police.png"
              width={16}
              height={16}
              alt="police"
            />
            {footerDict("police_license")}
          </li>
          <li>{footerDict("service_license")}</li>
        </ul>
      </div>
    </footer>
  );
}
