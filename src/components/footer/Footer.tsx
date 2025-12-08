import { getLanguage } from "@/lib/getLanguage";
import { Language } from "@/types/language";
import Image from "next/image";
import Link from "next/link";

export default async function Footer({ language }: { language: Language }) {
  const dict = await getLanguage(language);

  const contacts = dict.footer.contact.list;

  const productCategory = dict.product.category;

  const newCategory = dict.new.category;

  return (
    <footer className="bg-primary">
      <div className="mx-auto px-4 py-10 text-white xl:container">
        <div className="mb-10 grid gap-12 md:grid-cols-2 xl:grid-cols-3">
          <div>
            <h3 className="mb-6 text-2xl">{dict.footer.contact.title}</h3>
            <ul className="flex flex-col gap-3">
              {contacts.map((contact, index) => (
                <li key={index} className="my-2 flex items-center gap-2">
                  <Image src={contact.icon} alt="" width={22} height={22} />
                  <span className="text-sm">{contact.info}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-6 text-2xl">{dict.product.title}</h3>
            <ul className="flex flex-col gap-3">
              {productCategory.map((category, index) => (
                <li
                  key={index}
                  className="my-2 flex items-center gap-2 text-sm"
                >
                  <Link href={`${language}/products/${category.id}`}>
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-6 text-2xl">{dict.new.title}</h3>
            <ul className="flex flex-col gap-3">
              {newCategory.map((category) => (
                <li
                  key={category.id}
                  className="my-2 flex items-center gap-2 text-sm"
                >
                  <Link href={`${language}/news#${category.id}`}>
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <ul className="flex w-full flex-wrap justify-between gap-6">
          <li>{dict.footer.icp_license}</li>
          <li className="flex items-center">
            {dict.footer.police_title}
            <Image
              className="mx-1"
              src="/images/police.png"
              width={16}
              height={16}
              alt="police"
            />
            {dict.footer.police_license}
          </li>
          <li>{dict.footer.service_license}</li>
        </ul>
      </div>
    </footer>
  );
}
