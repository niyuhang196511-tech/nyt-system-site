"use client";

import Image from "next/image";
import Link from "next/link";
import dayjs from "dayjs";
import type { CompanyNews } from "@/types/company-news";
import { Locale } from "@/types/locale";
import { YEAR_MONTH_DAY_HOUR_MINUTE_SECOND } from "@/constants/format";
import { toMediaUrl } from "@/lib/utils";

interface IProps {
  title: string;
  description: string;
  news: CompanyNews[];
  locale: Locale;
}

export default function LatestCompanyNews({
  title,
  description,
  news,
  locale,
}: IProps) {
  if (!news.length) return null;

  const [mainNews, ...restNews] = news;
  const hasList = restNews.length > 0;

  return (
    <section className="bg-white">
      <div className="mx-auto px-4 xl:container">
        <div className="mb-8 md:mb-10">
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
            {title}
          </h2>
          <div className="mt-3 h-1 w-16 rounded-full bg-primary" />
          <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600 md:text-base">
            {description}
          </p>
        </div>

        <div
          className={`grid gap-6 ${
            hasList ? "lg:grid-cols-[1.15fr_0.85fr] lg:gap-8" : "grid-cols-1"
          }`}
        >
          <Link
            href={`/${locale}/company-news/${mainNews.id}`}
            className={`group relative overflow-hidden rounded-3xl bg-slate-100 shadow-sm ring-1 ring-slate-200/70 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl ${
              hasList ? "" : "w-full max-w-3xl"
            }`}
          >
            <Image
              src={toMediaUrl(mainNews.cover)}
              alt={mainNews.title}
              width={700}
              height={500}
              className={`w-full object-cover transition-transform duration-700 group-hover:scale-105 ${
                hasList ? "h-72 md:h-[430px] lg:h-[520px]" : "h-72 md:h-[480px]"
              }`}
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/75 via-black/15 to-transparent" />
            <div className="absolute right-0 bottom-0 left-0 p-5 text-white md:p-7">
              {mainNews.date && (
                <span className="inline-flex rounded-full border border-white/30 bg-white/10 px-3 py-1 text-xs backdrop-blur-sm md:text-sm">
                  {dayjs(mainNews.date).format(
                    YEAR_MONTH_DAY_HOUR_MINUTE_SECOND,
                  )}
                </span>
              )}
              <h3 className="mt-3 line-clamp-2 text-lg font-semibold md:text-2xl">
                {mainNews.title}
              </h3>
              {mainNews.author && (
                <p className="mt-2 text-sm text-white/90 md:text-base">
                  {mainNews.author}
                </p>
              )}
            </div>
            <div className="pointer-events-none absolute -top-12 -right-12 h-40 w-40 rounded-full bg-white/25 blur-2xl transition-all duration-700 group-hover:scale-110" />
          </Link>

          {hasList && (
            <div className="space-y-3 md:space-y-4 lg:max-h-[520px] lg:overflow-y-auto lg:pr-2 lg:[scrollbar-color:rgba(148,163,184,0.65)_transparent] lg:[scrollbar-width:thin] lg:[&::-webkit-scrollbar]:w-1.5 lg:[&::-webkit-scrollbar-thumb]:rounded-full lg:[&::-webkit-scrollbar-thumb]:bg-slate-300/80 lg:[&::-webkit-scrollbar-thumb:hover]:bg-slate-400/90 lg:[&::-webkit-scrollbar-track]:bg-transparent">
              {restNews.map((item) => (
                <Link
                  key={item.id}
                  href={`/${locale}/company-news/${item.id}`}
                  className="group block rounded-2xl border border-slate-200 bg-white p-3 shadow-xs transition-all duration-300 hover:border-primary/40 hover:bg-slate-50 hover:shadow-md md:p-4"
                >
                  <div className="flex gap-3 md:gap-4">
                    <div className="relative h-20 w-28 shrink-0 overflow-hidden rounded-xl md:h-24 md:w-36">
                      <Image
                        src={toMediaUrl(item.cover)}
                        alt={item.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      {item.date && (
                        <span className="text-xs group-hover:text-primary md:text-sm">
                          {dayjs(item.date).format(
                            YEAR_MONTH_DAY_HOUR_MINUTE_SECOND,
                          )}
                        </span>
                      )}
                      <h4 className="mt-1 line-clamp-2 text-sm font-semibold transition-colors group-hover:text-primary md:text-base">
                        {item.title}
                      </h4>
                      {item.author && (
                        <p className="mt-1 line-clamp-1 text-xs group-hover:text-primary md:text-sm">
                          {item.author}
                        </p>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
