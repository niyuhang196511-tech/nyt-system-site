"use client";

import { Locale } from "@/types/locale";
import { Input } from "../ui/input";
import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import BackToTop from "@/components/BackToTop";
import { PAGE_SIZE } from "@/constants/new";
import { Skeleton } from "../ui/skeleton";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslations } from "next-intl";
import { toMediaUrl } from "@/lib/utils";
import dayjs from "dayjs";
import { getCompanyNewsList } from "@/lib/company-news";
import { CompanyNews } from "@/types/company-news";

gsap.registerPlugin(ScrollTrigger);

interface IProps {
  locale: Locale;
}

const cache = new Map<
  string,
  { total: number; itemsByPage: Map<number, CompanyNews[]> }
>();

export default function NewsList({ locale }: IProps) {
  const newsDict = useTranslations("company-news");

  const [searchRaw, setSearchRaw] = useState("");
  const [search, setSearch] = useState("");

  const [items, setItems] = useState<CompanyNews[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  const observerRef = useRef<HTMLDivElement | null>(null);
  const abortRef = useRef<AbortController | null>(null);
  const inFlightRef = useRef(false);
  const gsapContextRef = useRef<gsap.Context | null>(null);

  const mkKey = (l: Locale, s: string) => `${l}||${s}`;

  // ---------------------------
  // 搜索按钮触发
  // ---------------------------
  const onSearchNow = useCallback(() => {
    const newSearch = searchRaw.trim();
    setSearch(newSearch);
  }, [searchRaw]);

  // ---------------------------
  // search/category 改变 -> 重置
  // ---------------------------
  useEffect(() => {
    setItems([]);
    setPage(1);
    setHasMore(true);
    setInitialLoading(true);

    if (abortRef.current) {
      abortRef.current.abort();
      abortRef.current = null;
    }

    fetchPage(1, { reset: true }).finally(() => setInitialLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, locale]);

  useEffect(() => {
    if (page === 1) return;
    fetchPage(page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  // ---------------------------
  // 无限滚动
  // ---------------------------
  useEffect(() => {
    if (!observerRef.current) return;

    const io = new IntersectionObserver(
      (entries) => {
        if (
          entries[0].isIntersecting &&
          hasMore &&
          !loading &&
          !inFlightRef.current
        ) {
          setPage((p) => p + 1);
        }
      },
      { threshold: 0.25 },
    );

    io.observe(observerRef.current);
    return () => io.disconnect();
  }, [hasMore, loading]);

  // ---------------------------
  // 数据请求
  // ---------------------------
  async function fetchPage(
    pageToLoad: number,
    options: { reset?: boolean } = {},
  ) {
    const key = mkKey(locale, search);
    const cached = cache.get(key);

    if (cached && cached.itemsByPage.has(pageToLoad)) {
      const cachedPage = cached.itemsByPage.get(pageToLoad) || [];
      setItems((prev) =>
        options.reset ? [...cachedPage] : [...prev, ...cachedPage],
      );

      const totalPages = Math.ceil(cached.total / PAGE_SIZE);
      setHasMore(pageToLoad < totalPages);
      return;
    }

    if (inFlightRef.current) return;

    inFlightRef.current = true;
    setLoading(true);

    try {
      const res = await getCompanyNewsList(
        locale,
        pageToLoad,
        PAGE_SIZE,
        search,
      );

      const total = res.total;
      const pageItems = res.list;

      let entry = cache.get(key);
      if (!entry) {
        entry = { total, itemsByPage: new Map() };
        cache.set(key, entry);
      }

      entry.total = total;
      entry.itemsByPage.set(pageToLoad, pageItems);

      setItems((prev) =>
        options.reset ? [...pageItems] : [...prev, ...pageItems],
      );

      const totalPages = Math.ceil(total / PAGE_SIZE);
      setHasMore(pageToLoad < totalPages);
    } finally {
      inFlightRef.current = false;
      setLoading(false);
    }
  }

  // ---------------------------
  // GSAP 动画
  // ---------------------------
  useEffect(() => {
    if (gsapContextRef.current) {
      gsapContextRef.current.revert();
      gsapContextRef.current = null;
    }

    gsapContextRef.current = gsap.context(() => {
      const nodes = Array.from(
        document.querySelectorAll<HTMLElement>(".news-item"),
      ).filter((n) => n.getAttribute("data-animated") !== "1");

      if (!nodes.length) return;

      nodes.forEach((n) => n.setAttribute("data-animated", "1"));

      gsap.from(nodes, {
        // opacity: 0,
        y: 28,
        duration: 0.6,
        stagger: 0.08,
        ease: "power2.out",
      });
    });

    return () => {
      if (gsapContextRef.current) {
        gsapContextRef.current.revert();
      }
    };
  }, [items]);

  // ---------------------------
  // UI
  // ---------------------------
  return (
    <>
      {/* 搜索 + 分类 */}
      <div className="mb-10 space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex gap-3">
            <Input
              placeholder={newsDict("input_placeholder")}
              value={searchRaw}
              onChange={(e) => setSearchRaw(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  onSearchNow();
                }
              }}
              className="w-64"
            />
            <Button className="cursor-pointer" onClick={onSearchNow}>
              {newsDict("search")}
            </Button>
          </div>
        </div>
      </div>

      {/* 新闻列表 */}
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {initialLoading &&
          Array.from({ length: PAGE_SIZE }).map((_, i) => (
            <Skeleton key={i} className="h-72 rounded-2xl" />
          ))}

        {items.map((item) => (
          <div
            key={item.id}
            className="news-item group overflow-hidden rounded-2xl bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            <div className="overflow-hidden">
              <Image
                src={toMediaUrl(item.cover)}
                alt={item.title}
                width={400}
                height={240}
                className="h-52 w-full object-fill transition-transform duration-700 group-hover:scale-105"
              />
            </div>

            <div className="p-6">
              <div className="mb-3 flex items-center justify-between text-sm text-muted-foreground">
                <span>
                  {item.date ? dayjs(item.date).format("YYYY.MM.DD") : ""}
                </span>
                {item.top && (
                  <span className="rounded-full bg-amber-100 px-3 py-1 text-xs text-amber-600">
                    {newsDict("pinned")}
                  </span>
                )}
              </div>

              <h3 className="mb-3 text-lg leading-snug font-semibold transition-colors group-hover:text-primary">
                {item.title}
              </h3>

              <p className="mb-5 line-clamp-2 text-sm text-muted-foreground">
                {item.subtitle}
              </p>

              <Link
                href={`/${locale}/company-news/${item.id}`}
                className="inline-flex items-center text-sm font-medium text-primary"
              >
                {newsDict("detail")} →
              </Link>
            </div>
          </div>
        ))}

        {loading &&
          !initialLoading &&
          Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-72 rounded-2xl" />
          ))}
      </div>

      <div ref={observerRef} className="h-16 w-full" />

      {/* 全局：返回顶部（移动端美观样式） */}
      <BackToTop threshold={360} />

      {!hasMore && !initialLoading && (
        <p className="py-10 text-center text-muted-foreground">
          {newsDict("no_content")}
        </p>
      )}
    </>
  );
}
