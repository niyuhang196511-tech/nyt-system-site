import { BASE_API, TENANT_ID } from "@/constants/api";
import { Locale } from "@/types/locale";
import { CompanyNews } from "@/types/company-news";

export const getCompanyNewsList = async (
  locale: Locale,
  pageNo: number,
  pageSize: number,
  search?: string,
): Promise<{
  list: CompanyNews[];
  total: number;
}> => {
  const searchParams = new URLSearchParams({
    lang: locale,
    pageNo: pageNo.toString(),
    pageSize: pageSize.toString(),
  });

  if (search) {
    searchParams.append("title", search);
  }

  const res = await (
    await fetch(
      `${BASE_API}/site/company-news/list?${searchParams.toString()}`,
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
      list: res.data.list,
      total: res.data.total,
    };
  }
  return {
    list: [],
    total: 0,
  };
};

export const getCompanyNews = async (id: number): Promise<CompanyNews> => {
  const res = await (
    await fetch(`${BASE_API}/site/company-news/${id}`, {
      next: { revalidate: 60 },
      headers: {
        "tenant-id": TENANT_ID,
      },
    })
  ).json();

  if (res.code === 0) {
    return res.data;
  } else {
    return {} as CompanyNews;
  }
};
