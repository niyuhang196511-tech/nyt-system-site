"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { News, NewsCategory } from "@/types/news";
import { Locale } from "@/types/locale";
import { useTranslations } from "next-intl";
import { parseTocFromHtml, toMediaUrl } from "@/lib/utils";
import dayjs from "dayjs";
import { YEAR_MONTH_DAY_HOUR_MINUTE_SECOND } from "@/constants/format";
import HtmlRenderer from "../HtmlRenderer";
import type { TocItem } from "@/types/toc";

gsap.registerPlugin(ScrollTrigger);

interface IProps {
  news: News;
  category: NewsCategory;
  relatedList: News[];
  locale: Locale;
}

export default function ArticleClient({
  news,
  category,
  relatedList,
  locale,
}: IProps) {
  const newsDict = useTranslations("news");
  // const contentRef = useRef<HTMLDivElement | null>(null);
  const tocRef = useRef<HTMLDivElement | null>(null);
  const tabsRef = useRef<HTMLDivElement | null>(null);
  const [toc, setToc] = useState<Array<TocItem>>([]);
  const [activeId] = useState<string | null>(null);

  useEffect(() => {
    if (!tabsRef.current) return;
    const el = tabsRef.current;

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: "top top",
      end: "+=1",
      onEnter: () =>
        gsap.to(el, {
          boxShadow: "0 6px 20px rgba(2,6,23,0.08)",
          backdropFilter: "blur(8px)",
          duration: 0.25,
        }),
      onLeaveBack: () =>
        gsap.to(el, {
          boxShadow: "none",
          backdropFilter: "blur(0px)",
          duration: 0.25,
        }),
    });

    return () => trigger.kill();
  }, []);

  const scrollToId = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    window.scrollTo({
      top: el.getBoundingClientRect().top + window.scrollY - 100,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    setToc(parseTocFromHtml(news.contentHtml));
  }, [news]);

  return (
    <div className="relative grid grid-cols-1 gap-8 lg:grid-cols-3">
      <article
        className="article-body col-span-2 space-y-6"
        aria-labelledby="article-title"
      >
        <div
          ref={tabsRef}
          className="sticky top-20 z-30 rounded-md bg-white/50 px-3 py-2 backdrop-blur-sm"
        >
          <div className="flex flex-wrap items-center justify-between gap-3">
            <Link href={`/${locale}/news#${category.id}`}>
              <Badge variant="outline">{category.name}</Badge>
            </Link>
            <div className="text-sm text-muted-foreground">
              {dayjs(news.date).format(YEAR_MONTH_DAY_HOUR_MINUTE_SECOND)} ·{" "}
              {news.author}
            </div>
            <div className="ml-auto flex gap-2">
              <Button
                className="border"
                variant="ghost"
                size="sm"
                onClick={() => navigator.clipboard?.writeText(location.href)}
              >
                {newsDict("copy_link")}
              </Button>
            </div>
          </div>
        </div>

        <div id="article-title" className="prose max-w-none">
          {/* Title already rendered on server; include entry content here */}
          {/* {article.title} */}
        </div>

        {/* <div
          ref={contentRef}
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: news.contentHtml }}
        /> */}
        <HtmlRenderer html={news.contentHtml} />

        {/* Prev / Next stub */}
        <div className="flex items-center justify-between py-6">
          {news.prev ? (
            <Link href={`/${locale}/news/${news.prev.id}`} className="text-sm">
              ← {newsDict("prev_article")}：{news.prev.title}
            </Link>
          ) : (
            <div></div>
          )}
          {news.next ? (
            <Link href={`/${locale}/news/${news.next.id}`} className="text-sm">
              {newsDict("next_article")}：{news.next.title} →
            </Link>
          ) : (
            <div></div>
          )}
        </div>
      </article>

      {/* Right: TOC + Related */}
      <aside className="col-span-1 hidden lg:block">
        <div className="space-y-6">
          {news.cover && (
            <div className="overflow-hidden rounded-lg shadow-sm">
              <Image
                src={toMediaUrl(news.cover)}
                alt={news.title}
                width={1200}
                height={500}
                className="h-auto w-full object-cover"
              />
            </div>
          )}

          <Card>
            <CardContent>
              <div className="mb-3 flex items-center justify-between">
                <h4 className="text-sm font-medium">{newsDict("catalogue")}</h4>
                <Button
                  variant="link"
                  size="sm"
                  onClick={() =>
                    window.scrollTo({ top: 0, behavior: "smooth" })
                  }
                >
                  {newsDict("back_top")}
                </Button>
              </div>

              <div ref={tocRef} className="space-y-2">
                {toc.length === 0 && (
                  <p className="text-sm text-muted-foreground">
                    {newsDict("catalogue_empty")}
                  </p>
                )}
                {toc.map((t) => (
                  <div
                    key={t.id}
                    className={`cursor-pointer text-sm ${activeId === t.id ? "font-medium text-foreground" : "text-muted-foreground"}`}
                    onClick={() => scrollToId(t.id)}
                  >
                    <div style={{ paddingLeft: `${(t.level - 2) * 12}px` }}>
                      {t.text}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <h4 className="mb-3 text-sm font-medium">{newsDict("toc")}</h4>
              <ul className="space-y-2">
                {relatedList && relatedList.length > 0 ? (
                  relatedList.map((newsItem) => {
                    // @ts-ignore
                    return (
                      <li key={newsItem.id} className="text-sm">
                        <Link
                          href={`/news/${newsItem.id}`}
                          className="hover:underline"
                        >
                          {newsItem.title}
                        </Link>
                      </li>
                    );
                  })
                ) : (
                  <li className="text-sm text-muted-foreground">
                    {newsDict("toc_empty")}
                  </li>
                )}
              </ul>
            </CardContent>
          </Card>
        </div>
      </aside>
    </div>
  );
}
