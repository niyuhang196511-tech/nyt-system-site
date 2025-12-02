import { getLanguage } from "@/lib/getLanguage";
import { Language } from "@/types/language";
import Image from "next/image";
import LanguageSwitcher from "./LanguageSwitcher";
import Nav from "./Nav";
// import Search from "./Search";
import HamburgerNav from "./HamburgerNav";

interface IProps {
  language: Language;
}

export default async function Header({ language }: IProps) {
  const dict = await getLanguage(language as Language);

  return (
    <header className="sticky top-0 z-20 bg-white">
      <section className="mx-auto flex h-16 items-center justify-between pr-2 pl-2 xl:container">
        <div className="flex shrink-0 items-center gap-x-2.5">
          <Image
            src="/images/logo.webp"
            alt={dict.site.logoAlt}
            width={36}
            height={36}
          />
          <h1 className="hidden text-2xl font-bold xl:block">
            {dict.site.title}
          </h1>
        </div>

        <Nav language={language as Language}></Nav>

        <div className="flex gap-x-1">
          {/* <Search /> */}
          <LanguageSwitcher language={language as Language} />
          <HamburgerNav language={language as Language}></HamburgerNav>
        </div>
      </section>
    </header>
  );
}
