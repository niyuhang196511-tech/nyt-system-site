"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

gsap.registerPlugin(ScrollTrigger);

// ================================
// 配置（替换为真实 API 地址）
// ================================
const API_URL = "/api/news"; // <- 替换为你的真实接口
const CATEGORIES = ["全部", "公司新闻", "产品动态"];
const PAGE_SIZE = 6;
const SEARCH_DEBOUNCE = 350; // ms

// 简单本地缓存： key => { total, itemsByPage: Map<page, items> }
const cache = new Map<
  string,
  { total: number; itemsByPage: Map<number, any[]> }
>();

export default function NewsAdvancedPage() {
  const [searchRaw, setSearchRaw] = useState("");
  const [search, setSearch] = useState(""); // debounced search used for requests
  const [category, setCategory] = useState("全部");

  const [items, setItems] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  const observerRef = useRef<HTMLDivElement | null>(null);
  const abortRef = useRef<AbortController | null>(null);
  const inFlightRef = useRef(false); // 防止并发重复请求
  const gsapContextRef = useRef<gsap.Context | null>(null);

  // --------------------
  // 生成缓存 key
  // --------------------
  const mkKey = (s: string, c: string) => `${s}||${c}`;

  // --------------------
  // 防抖 search 输入 -> 更新 search
  // --------------------
  useEffect(() => {
    const t = setTimeout(() => setSearch(searchRaw.trim()), SEARCH_DEBOUNCE);
    return () => clearTimeout(t);
  }, [searchRaw]);

  // --------------------
  // 当 search/category 改变时：重置列表并请求第一页
  // - 取消上一次未完成请求
  // - 使用缓存优先
  // --------------------
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

  // --------------------
  // Load more when page increases (infinite scroll)
  // --------------------
  useEffect(() => {
    if (page === 1) return; // already handled by previous effect
    fetchPage(page).finally(() => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  // --------------------
  // IntersectionObserver -> 自动翻页
  // --------------------
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

  // --------------------
  // fetchPage 实现：支持取消、缓存、并发保护
  // options.reset: 是否替换 items（第一页）还是追加
  // --------------------
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
      setHasMore((prev) => {
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
      if (category && category !== "全部") params.set("category", category);

      const url = `${API_URL}?${params.toString()}`;

      const res = await fetch(url, { signal: controller.signal });
      if (!res.ok) {
        // Treat non-2xx as empty result but don't crash UI
        console.warn("news fetch failed:", res.status);
        setHasMore(false);
        return;
      }
      const body = await res.json();
      // Expected body shape: { total: number, items: Array }
      const total =
        typeof body.total === "number" ? body.total : (body.items?.length ?? 0);
      const pageItems = Array.isArray(body.items) ? body.items : [];

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
    } catch (err: any) {
      if (err.name === "AbortError") {
        // aborted - expected when user types quickly or changes filters
        // no need to set error state
      } else {
        console.error("fetch error", err);
      }
    } finally {
      inFlightRef.current = false;
      setLoading(false);
      abortRef.current = null;
    }
  }

  // --------------------
  // GSAP 动画：使用 gsap.context，并且只动画未动画化元素（加 data-animated）
  // - 能避免重复动画或闪烁（只对新节点运行动画）
  // --------------------
  useEffect(() => {
    // cleanup previous context before creating a new one (prevents duplicates)
    if (gsapContextRef.current) {
      gsapContextRef.current.revert();
      gsapContextRef.current = null;
    }

    // create a new context scoped to the container
    gsapContextRef.current = gsap.context(() => {
      // Select items that are not yet animated
      const nodes = Array.from(
        document.querySelectorAll<HTMLElement>(".news-item"),
      ).filter((n) => n.getAttribute("data-animated") !== "1");

      if (nodes.length === 0) return;

      // Mark them immediately to avoid duplicate animations when layout shifts
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

    // cleanup on unmount
    return () => {
      if (gsapContextRef.current) {
        gsapContextRef.current.revert();
        gsapContextRef.current = null;
      }
    };
  }, [items]); // 仅在 items 更改时运行

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
  }, [search, category]);

  // --------------------
  // UI
  // --------------------
  return (
    <div className="min-h-screen w-full bg-gray-50 p-6 md:p-12">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-6">
          <h1 className="mb-2 text-4xl font-bold">新闻资讯</h1>
          <p className="text-muted-foreground">
            实时汇聚医疗器械行业的法规动态、政策解读与集采信息……
          </p>
        </div>

        {/* Search + Sticky 分类 Tabs */}
        <div className="mb-6">
          <div className="flex items-center gap-3">
            <Input
              placeholder="搜索新闻标题…"
              value={searchRaw}
              onChange={(e) => setSearchRaw(e.target.value)}
              className="max-w-md"
            />
            <Button onClick={onSearchNow}>搜索</Button>
          </div>

          {/* Sticky Tabs: 固定顶部（会在父容器滚动到顶部后吸顶） */}
          <div
            className="sticky top-20 z-40 mt-4 bg-white/60 py-3 backdrop-blur-sm"
            // small shadow to separate from content
            style={{ boxShadow: "0 2px 6px rgba(16,24,40,0.04)" }}
          >
            <div className="flex gap-3">
              {CATEGORIES.map((c) => (
                <Button
                  key={c}
                  variant={c === category ? "default" : "outline"}
                  onClick={() => {
                    if (c === category) return;
                    // cancel running request & reset
                    if (abortRef.current) abortRef.current.abort();
                    setCategory(c);
                    // Note: effect watching category will trigger fetch
                  }}
                >
                  {c}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Masonry Grid */}
        <div className="columns-1 gap-6 space-y-6 sm:columns-2 lg:columns-3">
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
              {/* Next/Image requires static import domain config if external. */}
              <Image
                src={item.image || "/images/logo.webp"}
                alt={item.title}
                width={400}
                height={192}
                className="h-48 w-full object-cover"
              />

              <CardHeader>
                <div className="mb-2 flex items-center justify-between">
                  <Badge variant="outline">{item.category}</Badge>
                  <span className="text-sm text-muted-foreground">
                    {item.date}
                  </span>
                </div>
                <CardTitle className="text-lg leading-tight">
                  {item.title}
                </CardTitle>
              </CardHeader>

              <CardContent>
                <p className="mb-3 text-sm text-muted-foreground">
                  {item.desc}
                </p>
                <Button asChild className="w-full rounded-xl">
                  <Link href={`/news/${item.id}`}>阅读详情</Link>
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
        <div ref={observerRef} className="h-20 w-full"></div>

        {!hasMore && !initialLoading && (
          <p className="py-10 text-center text-muted-foreground">
            已加载全部内容
          </p>
        )}
      </div>
    </div>
  );
}
