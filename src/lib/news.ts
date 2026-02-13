import { Locale } from "next-intl";
import { BASE_API, TENANT_ID } from "@/constants/api";
import { News } from "@/types/news";

export const getNewsLatest = async (
  locale: Locale,
  pageNo: number,
  pageSize: number,
): Promise<News[]> => {
  const searchParams = new URLSearchParams({
    lang: locale,
    pageNo: pageNo.toString(),
    pageSize: pageSize.toString(),
  });
  const res = await (
    await fetch(`${BASE_API}/site/news/latest?${searchParams.toString()}`, {
      next: { revalidate: 60 },
      headers: {
        "tenant-id": TENANT_ID,
      },
    })
  ).json();

  if (res.code === 0 && res.data.list) {
    return res.data.list;
  } else {
    return [];
  }
};

export const getNewsList = async (
  pageNo: number,
  pageSize: number,
  title: string,
  categoryId: number,
  locale: Locale,
) => {
  const searchParams = new URLSearchParams({
    lang: locale,
    pageNo: pageNo.toString(),
    pageSize: pageSize.toString(),
    title,
  });

  if (categoryId) {
    searchParams.append("categoryId", categoryId.toString());
  }

  const res = await (
    await fetch(`${BASE_API}/site/news/list?${searchParams.toString()}`, {
      next: { revalidate: 60 },
      headers: {
        "tenant-id": TENANT_ID,
      },
    })
  ).json();

  if (res.code === 0 && res.data.list) {
    return {
      list: res.data.list,
      total: res.data.total,
    };
  } else {
    return {
      list: [],
      total: 0,
    };
  }
};

export const getNews = async (id: number): Promise<News> => {
  const res = await (
    await fetch(`${BASE_API}/site/news/${id}`, {
      next: { revalidate: 60 },
      headers: {
        "tenant-id": TENANT_ID,
      },
    })
  ).json();

  if (res.code === 0) {
    return res.data;
  } else {
    return {} as News;
  }
};

export const getRelatedNewsById = async (
  id: number,
  locale: Locale,
  pageNo: number,
  pageSize: number,
) => {
  const searchParams = new URLSearchParams({
    lang: locale,
    pageNo: pageNo.toString(),
    pageSize: pageSize.toString(),
  });

  const res = await (
    await fetch(
      `${BASE_API}/site/news/related/${id}?${searchParams.toString()}`,
      {
        next: { revalidate: 60 },
        headers: {
          "tenant-id": TENANT_ID,
        },
      },
    )
  ).json();

  if (res.code === 0 && res.data.list) {
    return {
      list: res.data.list as News[],
      total: res.data.total,
    };
  } else {
    return {
      list: [] as News[],
      total: 0,
    };
  }
};
