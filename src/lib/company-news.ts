import { BASE_API, apiFetch } from "@/constants/api";
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

  try {
    const res = await (
      await apiFetch(
        `${BASE_API}/site/company-news/list?${searchParams.toString()}`,
        {
          next: { revalidate: 60 },
        },
      )
    ).json();

    if (res.code === 0 && res.data.list) {
      return {
        list: res.data.list,
        total: res.data.total,
      };
    }
  } catch (e) {
    console.error("[getCompanyNewsList]", e);
  }
  return { list: [], total: 0 };
};

export const getCompanyNews = async (id: number): Promise<CompanyNews> => {
  try {
    const res = await (
      await apiFetch(`${BASE_API}/site/company-news/${id}`, {
        next: { revalidate: 60 },
      })
    ).json();

    if (res.code === 0 && res.data) {
      return res.data;
    }
  } catch (e) {
    console.error("[getCompanyNews]", e);
  }
  return {} as CompanyNews;
};
