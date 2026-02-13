"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { useEffect, useRef, useState, useCallback } from "react";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import gsap from "gsap";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

import { Locale } from "@/types/locale";
import { ProductCategory } from "@/types/product";
import { getProductCategory } from "@/lib/product-category";
import { NewsCategory } from "@/types/news";
import { getNewsCategory } from "@/lib/news-category";

interface IProps {
  locale: Locale;
}

export default function MobileMenu({ locale }: IProps) {
  const pathname = usePathname();

  const tNav = useTranslations("nav");
  const tHome = useTranslations("home");
  const tProduct = useTranslations("product");
  const tNews = useTranslations("news");
  const tAbout = useTranslations("about");
  const tContact = useTranslations("contact");

  const [open, setOpen] = useState(false);
  const [productLoading, setProductLoading] = useState(true);
  const [productCategories, setProductCategories] = useState<ProductCategory[]>(
    [],
  );
  const [newsLoading, setNewsLoading] = useState(true);
  const [newsCategories, setNewsCategories] = useState<NewsCategory[]>([]);

  const menuRef = useRef<HTMLUListElement>(null);

  const closeMenu = useCallback(() => setOpen(false), []);

  /* ---------------- 获取产品分类 ---------------- */
  useEffect(() => {
    let cancelled = false;

    async function fetchCategories() {
      setProductLoading(true);
      try {
        const data = await getProductCategory(locale);
        if (!cancelled) setProductCategories(data);
      } finally {
        if (!cancelled) setProductLoading(false);
      }
    }

    fetchCategories();
    return () => {
      cancelled = true;
    };
  }, [locale]);

  /* ---------------- 获取新闻资讯分类 ---------------- */
  useEffect(() => {
    let cancelled = false;

    async function fetchCategories() {
      setNewsLoading(true);
      try {
        const data = await getNewsCategory(locale);
        if (!cancelled) setNewsCategories(data);
      } finally {
        if (!cancelled) setNewsLoading(false);
      }
    }

    fetchCategories();

    return () => {
      cancelled = true;
    };
  }, [locale]);

  /* ---------------- GSAP 菜单动画 ---------------- */
  useEffect(() => {
    if (!open || !menuRef.current) return;

    gsap.fromTo(
      menuRef.current.children,
      { opacity: 0, y: 12 },
      {
        opacity: 1,
        y: 0,
        duration: 0.45,
        stagger: 0.06,
        ease: "power2.out",
      },
    );
  }, [open]);

  /* ---------------- 当前路由判断 ---------------- */
  const isActive = (href: string) => {
    if (href === pathname && href === `/${locale}`) {
      return true;
    } else if (href !== `/${locale}`) {
      return pathname === href || pathname.startsWith(href + "/");
    } else {
      return false;
    }
  };

  const productActive = pathname.startsWith(`/${locale}/products`);
  const newsActive = pathname.startsWith(`/${locale}/news`);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button
          aria-label="Open menu"
          className="rounded-lg p-2 transition hover:bg-accent md:hidden"
        >
          <Menu className="h-5 w-5" />
        </button>
      </SheetTrigger>

      <SheetContent side="right" className="w-full max-w-sm p-0">
        {/* 标题区 */}
        <div className="border-b px-5 py-6">
          <div className="text-lg font-bold tracking-wide">
            {tNav("hamburger-nav-title")}
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            {tNav("hamburger-nav-description")}
          </p>
        </div>

        <ScrollArea className="h-[calc(100vh-96px)]">
          <nav className="px-2 py-4">
            <ul ref={menuRef} className="space-y-1">
              <NavItem
                href={`/${locale}`}
                active={isActive(`/${locale}`)}
                onClick={closeMenu}
              >
                {tHome("title")}
              </NavItem>

              {/* 产品 */}
              <Accordion
                type="single"
                collapsible
                defaultValue={productActive ? "products" : undefined}
              >
                <AccordionItem value="products" className="border-none">
                  <AccordionTrigger className="rounded-xl px-4 py-4 text-[17px] font-semibold hover:bg-slate-100">
                    {tProduct("title")}
                  </AccordionTrigger>

                  <AccordionContent>
                    <ul className="mt-2 space-y-2 rounded-xl bg-slate-50 p-2">
                      {productLoading
                        ? Array.from({ length: 3 }).map((_, i) => (
                            <Skeleton
                              key={i}
                              className="h-14 w-full rounded-lg"
                            />
                          ))
                        : productCategories.map((item) => {
                            const href = `/${locale}/products/${item.id}`;
                            const active = pathname === href;

                            return (
                              <li key={item.id}>
                                <Link
                                  href={href}
                                  onClick={closeMenu}
                                  className={cn(
                                    "block rounded-lg px-3 py-3 transition",
                                    "hover:bg-white hover:shadow-sm",
                                    active &&
                                      "bg-white shadow-sm ring-1 ring-primary/20",
                                  )}
                                >
                                  <div className="font-medium">{item.name}</div>
                                  <p className="mt-1 text-sm text-slate-500">
                                    {item.description}
                                  </p>
                                </Link>
                              </li>
                            );
                          })}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              <NavItem
                href={`/${locale}/about`}
                active={isActive(`/${locale}/about`)}
                onClick={closeMenu}
              >
                {tAbout("title")}
              </NavItem>

              {/* 新闻 */}
              <Accordion
                type="single"
                collapsible
                defaultValue={newsActive ? "news" : undefined}
              >
                <AccordionItem value="news" className="border-none">
                  <AccordionTrigger className="rounded-xl px-4 py-4 text-[17px] font-semibold hover:bg-slate-100">
                    {tNews("title")}
                  </AccordionTrigger>

                  <AccordionContent>
                    <ul className="mt-2 space-y-2 rounded-xl bg-slate-50 p-2">
                      {/* {newCategoriesConstants[locale].map((c) => (
                        <li key={c.id}>
                          <Link
                            href={`/${locale}/news#${c.id}`}
                            onClick={closeMenu}
                            className="block rounded-lg px-3 py-3 transition hover:bg-white hover:shadow-sm"
                          >
                            <div className="font-medium">{c.name}</div>
                            <p className="mt-1 text-sm text-slate-500">
                              {c.description}
                            </p>
                          </Link>
                        </li>
                      ))} */}

                      {newsLoading
                        ? Array.from({ length: 3 }).map((_, i) => (
                            <Skeleton
                              key={i}
                              className="h-14 w-full rounded-lg"
                            />
                          ))
                        : newsCategories.map((item) => {
                            const href = `/${locale}/news/${item.id}`;
                            const active = pathname === href;

                            return (
                              <li key={item.id}>
                                <Link
                                  href={href}
                                  onClick={closeMenu}
                                  className={cn(
                                    "block rounded-lg px-3 py-3 transition",
                                    "hover:bg-white hover:shadow-sm",
                                    active &&
                                      "bg-white shadow-sm ring-1 ring-primary/20",
                                  )}
                                >
                                  <div className="font-medium">{item.name}</div>
                                  <p className="mt-1 text-sm text-slate-500">
                                    {item.description}
                                  </p>
                                </Link>
                              </li>
                            );
                          })}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              <NavItem
                href={`/${locale}/contact`}
                active={isActive(`/${locale}/contact`)}
                onClick={closeMenu}
              >
                {tContact("title")}
              </NavItem>
            </ul>
          </nav>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}

/* ---------------- 一级导航组件 ---------------- */

function NavItem({
  href,
  children,
  active,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <li>
      <Link
        href={href}
        onClick={onClick}
        className={cn(
          "relative flex items-center rounded-xl px-4 py-4 text-[17px] font-medium transition",
          "hover:bg-slate-100",
          active ? "bg-primary/5 font-semibold text-primary" : "text-slate-700",
        )}
      >
        {active && (
          <span className="absolute top-2 bottom-2 left-0 w-[3px] rounded-r bg-primary" />
        )}
        {children}
      </Link>
    </li>
  );
}
