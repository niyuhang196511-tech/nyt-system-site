"use client";

import { Locale } from "@/types/locale";
import { Input } from "../ui/input";
import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import { PAGE_SIZE, SEARCH_DEBOUNCE } from "@/constants/new";
import { Skeleton } from "../ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import Image from "next/image";
import { Badge } from "lucide-react";
import Link from "next/link";
import { News, NewsCategory } from "@/types/news";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslations } from "next-intl";
import { getNewsList } from "@/lib/news";
import { toMediaUrl } from "@/lib/utils";
import dayjs from "dayjs";
import { YEAR_MONTH_DAY_HOUR_MINUTE_SECOND } from "@/constants/format";
import { Badge as BadgeComponent } from "@/components/ui/badge";

gsap.registerPlugin(ScrollTrigger);

interface IProps {
  locale: Locale;
  categories: NewsCategory[];
}

const cache = new Map<
  string,
  { total: number; itemsByPage: Map<number, News[]> }
>();

export default function NewsList({ locale, categories }: IProps) {
  const newsDict = useTranslations("news");
  // 搜索输入状态
  const [searchRaw, setSearchRaw] = useState("");
  // 防抖后的搜索状态
  const [search, setSearch] = useState("");
  // 分类状态
  const [category, setCategory] = useState(0);
  // 新闻列表状态
  const [items, setItems] = useState<News[]>([]);
  // 分页状态
  const [page, setPage] = useState(1);
  // 是否有更多数据状态
  const [hasMore, setHasMore] = useState(true);

  // 新闻列表状态
  const [loading, setLoading] = useState(false);
  // 新闻列表状态
  const [initialLoading, setInitialLoading] = useState(true);

  // 自动加载触发点引用
  const observerRef = useRef<HTMLDivElement | null>(null);
  // 取消请求的 AbortController 引用
  const abortRef = useRef<AbortController | null>(null);
  const inFlightRef = useRef(false); // 防止并发重复请求
  const gsapContextRef = useRef<gsap.Context | null>(null); // GSAP 上下文引用

  useEffect(() => {
    const hashChange = () => {
      const hash = window.location.hash;
      if (hash.startsWith("#")) {
        const id = hash.slice(1);
        setCategory(Number(id) || 0);
      } else {
        setCategory(0);
      }
    };

    // 初始检查 hash
    hashChange();

    window.addEventListener("hashchange", hashChange);
    return () => window.removeEventListener("hashchange", hashChange);
  }, []);

  /**
   * 生成缓存 key
   * @param s
   * @param c
   * @returns
   */
  const mkKey = (s: string, c: number) => `${s}||${c}`;

  useEffect(() => {
    const t = setTimeout(() => setSearch(searchRaw.trim()), SEARCH_DEBOUNCE);
    return () => clearTimeout(t);
  }, [searchRaw]);

  /**
   * 当 search/category 改变时：重置列表并请求第一页
   *    取消上一次未完成请求
   *    使用缓存优先
   */
  useEffect(() => {
    // reset
    setItems([]);
    setPage(1);
    setHasMore(true);
    setInitialLoading(true);

    // cancel previous fetch
    if (abortRef.current) {
      abortRef.current.abort();
      abortRef.current = null;
    }

    // try load first page
    fetchPage(1, { reset: true }).finally(() => setInitialLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, category]);

  useEffect(() => {
    if (page === 1) return;
    fetchPage(page).finally(() => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  /**
   * IntersectionObserver -> 自动翻页
   */
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

  /**
   * 获取新闻列表页面
   * @param pageToLoad
   * @param options
   * @returns
   */
  async function fetchPage(
    pageToLoad: number,
    options: { reset?: boolean } = {},
  ) {
    const key = mkKey(search, category);

    // If cached and page exists -> use it
    const cached = cache.get(key);
    if (cached && cached.itemsByPage.has(pageToLoad)) {
      const cachedPage = cached.itemsByPage.get(pageToLoad) || [];
      setItems((prev) =>
        options.reset ? [...cachedPage] : [...prev, ...cachedPage],
      );
      setHasMore(() => {
        const totalPages = Math.ceil(cached.total / PAGE_SIZE);
        return pageToLoad < totalPages;
      });
      return Promise.resolve();
    }

    // prevent concurrent same requests
    if (inFlightRef.current) return Promise.resolve();

    inFlightRef.current = true;
    setLoading(true);

    // AbortController for this request
    const controller = new AbortController();
    abortRef.current = controller;

    try {
      // build query params
      const params = new URLSearchParams();
      params.set("page", String(pageToLoad));
      params.set("pageSize", String(PAGE_SIZE));
      if (search) params.set("q", search);
      if (category && category !== 0) params.set("category", String(category));

      const res = await getNewsList(
        pageToLoad,
        PAGE_SIZE,
        search,
        category,
        locale,
      );
      const total = res.total;
      const pageItems = res.list;
      // cache it
      let entry = cache.get(key);
      if (!entry) {
        entry = { total, itemsByPage: new Map() };
        cache.set(key, entry);
      }
      entry.total = total;
      entry.itemsByPage.set(pageToLoad, pageItems);

      // Apply results to state
      setItems((prev) =>
        options.reset ? [...pageItems] : [...prev, ...pageItems],
      );
      const totalPages = Math.ceil(total / PAGE_SIZE);
      setHasMore(pageToLoad < totalPages);
    } finally {
      inFlightRef.current = false;
      setLoading(false);
      abortRef.current = null;
    }
  }

  /**
   * GSAP 列表项进入动画
   */
  useEffect(() => {
    if (gsapContextRef.current) {
      gsapContextRef.current.revert();
      gsapContextRef.current = null;
    }

    gsapContextRef.current = gsap.context(() => {
      const nodes = Array.from(
        document.querySelectorAll<HTMLElement>(".news-item"),
      ).filter((n) => n.getAttribute("data-animated") !== "1");

      if (nodes.length === 0) return;

      nodes.forEach((n) => n.setAttribute("data-animated", "1"));

      gsap.from(nodes, {
        opacity: 0,
        y: 28,
        duration: 0.6,
        stagger: 0.08,
        ease: "power2.out",
        overwrite: true,
      });
    });

    return () => {
      if (gsapContextRef.current) {
        gsapContextRef.current.revert();
        gsapContextRef.current = null;
      }
    };
  }, [items]);

  // --------------------
  // 手动触发刷新（比如点击搜索按钮）
  // --------------------
  const onSearchNow = useCallback(() => {
    // cancel previous fetches
    if (abortRef.current) {
      abortRef.current.abort();
      abortRef.current = null;
    }
    // clear cache for current key to force fresh fetch (optional)
    // cache.delete(mkKey(search, category));
    setItems([]);
    setPage(1);
    setHasMore(true);
    setInitialLoading(true);
    fetchPage(1, { reset: true }).finally(() => setInitialLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, category]);

  return (
    <>
      {/* Search + Sticky 分类 Tabs */}
      <div className="mb-6">
        <div className="mb-4 flex items-center gap-3">
          <Input
            placeholder="搜索新闻标题…"
            value={searchRaw}
            onChange={(e) => setSearchRaw(e.target.value)}
            className="max-w-md"
          />
          <Button onClick={onSearchNow}>{newsDict("search")}</Button>
        </div>

        <div className="flex flex-wrap gap-3">
          {categories.map((c) => (
            <Button
              key={c.id}
              variant={c.id === category ? "default" : "outline"}
              onClick={() => {
                if (c.id === category) return;
                // cancel running request & reset
                if (abortRef.current) abortRef.current.abort();
                window.location.hash = c.id === 0 ? "" : `#${c.id}`;
              }}
            >
              {c.name}
            </Button>
          ))}
        </div>
      </div>

      {/* Masonry Grid 改为 Grid 布局 */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {/* initial loading skeleton */}
        {initialLoading &&
          Array.from({ length: PAGE_SIZE }).map((_, i) => (
            <Skeleton key={`init-${i}`} className="h-64 w-full rounded-xl" />
          ))}

        {items.map((item) => (
          <Card
            key={item.id}
            className="news-item break-inside-avoid overflow-hidden rounded-xl shadow-sm transition-shadow hover:shadow-md"
          >
            <Image
              src={toMediaUrl(item.cover)}
              alt={item.title}
              width={400}
              height={192}
              className="h-48 w-full object-cover"
            />

            <CardHeader>
              <div className="mb-2 flex items-center justify-between">
                <Badge className={item.top ? "text-amber-500" : ""}></Badge>

                <span className="text-sm text-muted-foreground">
                  {dayjs(item.date).format(YEAR_MONTH_DAY_HOUR_MINUTE_SECOND)}
                </span>
              </div>
              <div className="flex flex-row-reverse gap-2">
                {item.tags.map((tag) => {
                  return (
                    <BadgeComponent key={tag.id} className="rounded-sm">
                      {tag.name}
                    </BadgeComponent>
                  );
                })}
              </div>
              <CardTitle className="text-lg leading-tight">
                {item.title}
              </CardTitle>
            </CardHeader>

            <CardContent>
              <p className="mb-3 text-sm text-muted-foreground">
                {item.subtitle}
              </p>
              <Button asChild className="w-full rounded-xl">
                <Link href={`/news/${item.id}`}>{newsDict("detail")}</Link>
              </Button>
            </CardContent>
          </Card>
        ))}

        {/* loading skeleton for incremental loads */}
        {loading &&
          !initialLoading &&
          Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={`load-${i}`} className="h-64 w-full rounded-xl" />
          ))}
      </div>

      {/* 自动加载触发点 */}
      <div ref={observerRef} className="h-10 w-full xl:h-20"></div>

      {!hasMore && !initialLoading && (
        <p className="py-10 text-center text-muted-foreground">
          {newsDict("no_content")}
        </p>
      )}
    </>
  );
}
