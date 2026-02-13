import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
  NavigationMenuContent,
} from "@/components/ui/navigation-menu";
import { Locale } from "@/types/locale";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { getProductCategory } from "@/lib/product-category";
import { getNewsCategory } from "@/lib/news-category";

interface IProps {
  locale: Locale;
}

export default async function Nav({ locale }: IProps) {
  const homeDict = await getTranslations("home");
  const productDict = await getTranslations("product");
  const newsDict = await getTranslations("news");
  const aboutDict = await getTranslations("about");
  const contactDict = await getTranslations("contact");

  const productCategories = await getProductCategory(locale);
  const newsCategories = await getNewsCategory(locale);

  return (
    <NavigationMenu className="hidden h-full flex-1 px-2 md:flex">
      <NavigationMenuList className="grid h-full w-full grid-cols-5">
        {/* 首页 */}
        <NavigationMenuItem>
          <NavigationMenuLink
            className="flex h-16 items-center justify-center"
            href={`/${locale}`}
            title={homeDict("title")}
          >
            {homeDict("title")}
          </NavigationMenuLink>
        </NavigationMenuItem>

        {/* 产品 */}
        <NavigationMenuItem>
          <NavigationMenuTrigger className="h-16">
            {/* <NavigationMenuLink
              href={`/${language}/products`}
              title={dict.product.title}
            > */}
            {productDict("title")}
            {/* </NavigationMenuLink> */}
          </NavigationMenuTrigger>
          <NavigationMenuContent className="p-0">
            <div className="fixed top-16 right-0 left-0 z-10 w-screen bg-primary-foreground">
              <div className="mx-auto flex gap-x-8 p-5 xl:container">
                {/* 左侧介绍 */}
                <div className="hidden w-96 xl:block">
                  <h2 className="mb-4 text-4xl leading-16 font-bold text-gray-900">
                    <Link href={`/${locale}/products`}>
                      {productDict("title")}
                    </Link>
                  </h2>
                  <h3 className="text-2xl leading-snug text-gray-700">
                    {productDict("description-1")}
                  </h3>
                  <h3 className="mt-2 text-2xl leading-snug text-gray-700">
                    {productDict("description-2")}
                  </h3>
                </div>

                {/* 产品列表 - 去掉列表标记并重置间距 */}
                <ul className="m-0 grid flex-1 list-none grid-cols-2 gap-3 pl-0">
                  {productCategories.map((item) => (
                    <li
                      key={item.id}
                      className="group cursor-pointer rounded-xl p-4 transition-colors hover:bg-gray-50"
                    >
                      <Link
                        href={`/${locale}/products/${item.id}`}
                        className="no-underline"
                      >
                        <h4 className="text-xl font-semibold text-gray-900 transition-colors group-hover:text-primary">
                          {item.name}
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
            href={`/${locale}/about`}
            title={aboutDict("title")}
          >
            {aboutDict("title")}
          </NavigationMenuLink>
        </NavigationMenuItem>

        {/* 新闻资讯 */}
        <NavigationMenuItem>
          <NavigationMenuTrigger className="h-16">
            {/* <NavigationMenuLink
              href={`/${language}/news`}
              title={dict.new.title}
            > */}
            {newsDict("title")}
            {/* </NavigationMenuLink> */}
          </NavigationMenuTrigger>
          <NavigationMenuContent className="p-0">
            <div className="fixed top-16 right-0 left-0 z-10 w-screen bg-primary-foreground">
              <div className="mx-auto flex gap-x-8 p-5 xl:container">
                {/* 左侧介绍 */}
                <div className="hidden w-96 xl:block">
                  <h2 className="mb-4 text-4xl leading-16 font-bold text-gray-900">
                    <Link href={`/${locale}/news`}>{newsDict("title")}</Link>
                  </h2>
                  <h3 className="text-2xl leading-snug text-gray-700">
                    {newsDict("description-1")}
                  </h3>
                  <h3 className="mt-2 text-2xl leading-snug text-gray-700">
                    {newsDict("description-2")}
                  </h3>
                </div>

                {/* 新闻列表 - 去掉列表标记并重置间距 */}
                <ul className="m-0 grid flex-1 list-none grid-cols-2 gap-3 pl-0">
                  {newsCategories.map((category) => (
                    <li
                      key={category.id}
                      className="group cursor-pointer rounded-xl p-4 transition-colors hover:bg-gray-50"
                    >
                      <Link
                        href={`/${locale}/news#${category.id}`}
                        className="no-underline"
                      >
                        <h4 className="text-xl font-semibold text-gray-900 transition-colors group-hover:text-primary">
                          {category.name}
                        </h4>
                      </Link>
                      <p className="mt-1 text-sm leading-6 text-gray-600">
                        {category.description}
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
            href={`/${locale}/contact`}
            title={contactDict("title")}
          >
            {contactDict("title")}
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
