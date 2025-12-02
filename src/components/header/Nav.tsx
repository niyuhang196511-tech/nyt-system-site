import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
  NavigationMenuContent,
} from "@/components/ui/navigation-menu";
import { Language } from "@/types/language";
import { getLanguage } from "@/lib/getLanguage";
import Link from "next/link";

export default async function Nav({ language }: { language: Language }) {
  const dict = await getLanguage(language);

  const productClassify = dict.product.classify;

  const newClassify = dict.new.classify;

  return (
    <NavigationMenu className="hidden h-full flex-1 px-2 md:flex">
      <NavigationMenuList className="grid h-full w-full grid-cols-5">
        {/* 首页 */}
        <NavigationMenuItem>
          <NavigationMenuLink
            className="flex h-16 items-center justify-center"
            href={`/${language}`}
            title={dict.home.title}
          >
            {dict.home.title}
          </NavigationMenuLink>
        </NavigationMenuItem>

        {/* 产品 */}
        <NavigationMenuItem>
          <NavigationMenuTrigger className="h-16">
            <NavigationMenuLink
              href={`/${language}/products`}
              title={dict.product.title}
            >
              {dict.product.title}
            </NavigationMenuLink>
          </NavigationMenuTrigger>
          <NavigationMenuContent className="p-0">
            <div className="fixed top-16 right-0 left-0 z-10 w-screen bg-primary-foreground">
              <div className="mx-auto flex gap-x-8 p-5 xl:container">
                {/* 左侧介绍 */}
                <div className="hidden w-96 xl:block">
                  <h2 className="mb-4 text-4xl leading-16 font-bold text-gray-900">
                    <Link href={`/${language}/products`}>
                      {dict.product.title}
                    </Link>
                  </h2>
                  <h3 className="text-2xl leading-snug text-gray-700">
                    {dict.product["description-1"]}
                  </h3>
                  <h3 className="mt-2 text-2xl leading-snug text-gray-700">
                    {dict.product["description-2"]}
                  </h3>
                </div>

                {/* 产品列表 - 去掉列表标记并重置间距 */}
                <ul className="m-0 grid flex-1 list-none grid-cols-2 gap-3 pl-0">
                  {productClassify.map((item) => (
                    <li
                      key={item.href ?? item.label}
                      className="group cursor-pointer rounded-xl p-4 transition-colors hover:bg-gray-50"
                    >
                      <Link
                        href={
                          item.href.startsWith("/")
                            ? item.href
                            : `/${item.href}`
                        }
                        className="no-underline"
                      >
                        <h4 className="text-xl font-semibold text-gray-900 transition-colors group-hover:text-primary">
                          {item.label}
                        </h4>
                        <p className="mt-1 text-sm leading-6 text-gray-600">
                          {item.description}
                        </p>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {/* 关于我们 */}
        <NavigationMenuItem>
          <NavigationMenuLink
            className="flex h-16 items-center justify-center"
            href={`/${language}/about`}
            title={dict.about.title}
          >
            {dict.about.title}
          </NavigationMenuLink>
        </NavigationMenuItem>

        {/* 新闻资讯 */}
        <NavigationMenuItem>
          <NavigationMenuTrigger className="h-16">
            <NavigationMenuLink
              href={`/${language}/news`}
              title={dict.new.title}
            >
              {dict.new.title}
            </NavigationMenuLink>
          </NavigationMenuTrigger>
          <NavigationMenuContent className="p-0">
            <div className="fixed top-16 right-0 left-0 z-10 w-screen bg-primary-foreground">
              <div className="mx-auto flex gap-x-8 p-5 xl:container">
                {/* 左侧介绍 */}
                <div className="hidden w-96 xl:block">
                  <h2 className="mb-4 text-4xl leading-16 font-bold text-gray-900">
                    <Link href={`/${language}/news`}>{dict.new.title}</Link>
                  </h2>
                  <h3 className="text-2xl leading-snug text-gray-700">
                    {dict.new["description-1"]}
                  </h3>
                  <h3 className="mt-2 text-2xl leading-snug text-gray-700">
                    {dict.new["description-2"]}
                  </h3>
                </div>

                {/* 新闻列表 - 去掉列表标记并重置间距 */}
                <ul className="m-0 grid flex-1 list-none grid-cols-2 gap-3 pl-0">
                  {newClassify.map((item) => (
                    <li
                      key={item.href ?? item.label}
                      className="group cursor-pointer rounded-xl p-4 transition-colors hover:bg-gray-50"
                    >
                      <Link
                        href={
                          item.href.startsWith("/")
                            ? item.href
                            : `/${item.href}`
                        }
                        className="no-underline"
                      >
                        <h4 className="text-xl font-semibold text-gray-900 transition-colors group-hover:text-primary">
                          {item.label}
                        </h4>
                      </Link>
                      <p className="mt-1 text-sm leading-6 text-gray-600">
                        {item.description}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {/* 联系我们 */}
        <NavigationMenuItem>
          <NavigationMenuLink
            className="flex h-16 items-center justify-center"
            href={`/${language}/contact`}
            title={dict.contact.title}
          >
            {dict.contact.title}
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
