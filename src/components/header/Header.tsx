import { Locale } from "@/types/locale";
import Image from "next/image";
import LanguageSwitcher from "./LanguageSwitcher";
import Nav from "./Nav";
import HamburgerNav from "./HamburgerNav";
import { getTranslations } from "next-intl/server";

interface IProps {
  locale: Locale;
}

export default async function Header({ locale }: IProps) {
  const siteDict = await getTranslations("site");

  return (
    <header className="sticky top-0 z-50 bg-white">
      <section className="mx-auto flex h-16 items-center justify-between pr-2 pl-2 xl:container">
        <div className="flex shrink-0 items-center gap-x-2.5">
          <Image
            src="/images/logo.webp"
            alt={siteDict("logoAlt")}
            width={36}
            height={36}
          />
          <h1 className="hidden text-2xl font-bold xl:block">
            {siteDict("title")}
          </h1>
        </div>

        <Nav locale={locale as Locale}></Nav>

        <div className="flex gap-x-1">
          {/* <Search /> */}
          <LanguageSwitcher locale={locale as Locale} />
          <HamburgerNav locale={locale as Locale}></HamburgerNav>
        </div>
      </section>
    </header>
  );
}
