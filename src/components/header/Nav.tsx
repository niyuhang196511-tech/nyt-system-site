"use client";

import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
  NavigationMenuContent,
} from "@/components/ui/navigation-menu";
import { Locale } from "@/types/locale";
import { ProductCategory } from "@/types/product";
import { NewsCategory } from "@/types/news";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, startTransition } from "react";
import { cn } from "@/lib/utils";

interface NavLabels {
  home: string;
  product: string;
  productDesc1: string;
  productDesc2: string;
  companyNews: string;
  news: string;
  newsDesc1: string;
  newsDesc2: string;
  about: string;
  contact: string;
}

interface IProps {
  locale: Locale;
  labels: NavLabels;
  productCategories: ProductCategory[];
  newsCategories: NewsCategory[];
}

const navLinkClass =
  "relative flex h-16 items-center justify-center text-sm font-medium transition-colors hover:text-primary w-full";

function ActiveIndicator() {
  return (
    <span className="absolute bottom-0 left-1/2 h-0.5 w-8 -translate-x-1/2 rounded-full bg-primary" />
  );
}

export default function Nav({
  locale,
  labels,
  productCategories,
  newsCategories,
}: IProps) {
  // usePathname() can return null during initial render — normalize to empty string
  const pathname = usePathname() ?? "";
  const [menuValue, setMenuValue] = useState<string>("");

  // 路由变化时关闭下拉菜单 — 只有在菜单打开时才调用 setState，避免不必要的重渲染
  useEffect(() => {
    startTransition(() => setMenuValue(""));
  }, [pathname]);

  const isActive = (href: string) => {
    if (href === `/${locale}`) return pathname === href;
    return pathname === href || pathname.startsWith(href + "/");
  };

  const close = () => setMenuValue("");
  const isOpen = menuValue !== "";

  const firstProductCategory = productCategories[0];

  return (
    <>
      {/* 遮罩层 */}
      {isOpen && (
        <div
          className="fixed inset-0 top-16 z-40 overflow-x-hidden bg-black/20 backdrop-blur-[2px]"
          onClick={close}
          aria-hidden
        ></div>
      )}

      <NavigationMenu
        className="hidden h-full flex-1 px-4 md:flex"
        value={menuValue}
        onValueChange={setMenuValue}
        viewport={false}
      >
        <NavigationMenuList className="grid h-full w-full grid-cols-6 gap-x-1">
          {/* 首页 */}
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link
                href={`/${locale}`}
                className={cn(
                  navLinkClass,
                  isActive(`/${locale}`)
                    ? "text-primary"
                    : "text-muted-foreground",
                )}
              >
                {labels.home}
                {isActive(`/${locale}`) && <ActiveIndicator />}
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>

          {/* 产品 */}
          <NavigationMenuItem value="products">
            <NavigationMenuTrigger
              className={cn(
                navLinkClass,
                isActive(`/${locale}/products`)
                  ? "text-primary"
                  : "text-muted-foreground",
              )}
            >
              {labels.product}
              {isActive(`/${locale}/products`) && <ActiveIndicator />}
            </NavigationMenuTrigger>
            <NavigationMenuContent className="p-0">
              <div className="nav-mega-panel fixed top-16 right-0 left-0 z-50 w-full border-t bg-white shadow-lg">
                <div className="mx-auto flex gap-x-10 px-6 py-8 xl:container">
                  <div className="hidden w-80 shrink-0 xl:block">
                    <Link
                      href={`/${locale}/products/${firstProductCategory.id}`}
                      onClick={close}
                      className="group"
                    >
                      <h2 className="text-2xl font-bold transition-colors">
                        {labels.product}
                      </h2>
                    </Link>
                    <p className="mt-3 leading-relaxed">
                      {labels.productDesc1}
                    </p>
                    <p className="mt-1 leading-relaxed">
                      {labels.productDesc2}
                    </p>
                  </div>

                  <div className="hidden w-px self-stretch bg-gray-100 xl:block" />

                  <ul className="m-0 grid flex-1 list-none grid-cols-2 gap-2 pl-0">
                    {productCategories.map((item) => (
                      <li key={item.id}>
                        <Link
                          href={`/${locale}/products/${item.id}`}
                          onClick={close}
                          className={cn(
                            "group block rounded-lg p-4 no-underline transition-colors hover:bg-gray-50",
                            isActive(`/${locale}/products/${item.id}`) &&
                              "bg-primary/5 ring-1 ring-primary/10",
                          )}
                        >
                          <h4 className="text-base font-semibold transition-colors">
                            {item.name}
                          </h4>
                          <p className="mt-1 text-sm leading-relaxed">
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
            <NavigationMenuLink asChild>
              <Link
                href={`/${locale}/about`}
                className={cn(
                  navLinkClass,
                  isActive(`/${locale}/about`)
                    ? "text-primary"
                    : "text-muted-foreground",
                )}
              >
                {labels.about}
                {isActive(`/${locale}/about`) && <ActiveIndicator />}
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>

          {/* 公司新闻 */}
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link
                href={`/${locale}/company-news`}
                className={cn(
                  navLinkClass,
                  isActive(`/${locale}/company-news`)
                    ? "text-primary"
                    : "text-muted-foreground",
                )}
              >
                {labels.companyNews}
                {isActive(`/${locale}/company-news`) && <ActiveIndicator />}
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>

          {/* 新闻资讯 */}
          <NavigationMenuItem value="news">
            <NavigationMenuTrigger
              className={cn(
                navLinkClass,
                "bg-transparent hover:bg-transparent data-[state=open]:bg-transparent",
                isActive(`/${locale}/news`)
                  ? "text-primary"
                  : "text-muted-foreground",
              )}
            >
              {labels.news}
              {isActive(`/${locale}/news`) && <ActiveIndicator />}
            </NavigationMenuTrigger>
            <NavigationMenuContent className="p-0">
              <div className="nav-mega-panel fixed top-16 right-0 left-0 z-50 w-screen border-t border-gray-100 bg-white shadow-lg">
                <div className="mx-auto flex gap-x-10 px-6 py-8 xl:container">
                  <div className="hidden w-80 shrink-0 xl:block">
                    <Link
                      href={`/${locale}/news/0`}
                      onClick={close}
                      className="group"
                    >
                      <h2 className="text-2xl font-bold transition-colors">
                        {labels.news}
                      </h2>
                    </Link>
                    <p className="mt-3 leading-relaxed">{labels.newsDesc1}</p>
                    <p className="mt-1 leading-relaxed">{labels.newsDesc2}</p>
                  </div>

                  <div className="hidden w-px self-stretch bg-gray-100 xl:block" />

                  <ul className="m-0 grid flex-1 list-none grid-cols-2 gap-2 pl-0">
                    {newsCategories.map((category) => (
                      <li key={category.id}>
                        <Link
                          href={`/${locale}/news/${category.id}`}
                          onClick={close}
                          className={cn(
                            "group block rounded-lg p-4 no-underline transition-colors hover:bg-gray-50",
                            isActive(`/${locale}/news/${category.id}`) &&
                              "bg-primary/5 ring-1 ring-primary/10",
                          )}
                        >
                          <h4 className="text-base font-semibold transition-colors">
                            {category.name}
                          </h4>
                          <p className="mt-1 text-sm leading-relaxed">
                            {category.description}
                          </p>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>

          {/* 联系我们 */}
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link
                href={`/${locale}/contact`}
                className={cn(
                  navLinkClass,
                  isActive(`/${locale}/contact`)
                    ? "text-primary"
                    : "text-muted-foreground",
                )}
              >
                {labels.contact}
                {isActive(`/${locale}/contact`) && <ActiveIndicator />}
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </>
  );
}
