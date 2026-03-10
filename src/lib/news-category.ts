import { BASE_API, apiFetch } from "@/constants/api";
import { Locale } from "@/types/locale";
import { NewsCategory } from "@/types/news";

/**
 * 获取产品分类
 * @param locale 语言
 */
export const getNewsCategory = async (
  locale: Locale,
): Promise<NewsCategory[]> => {
  const searchParams = new URLSearchParams({
    lang: locale,
  });
  try {
    const res = await (
      await apiFetch(
        `${BASE_API}/site/news-category/list?${searchParams.toString()}`,
        {
          next: { revalidate: 60 },
        },
      )
    ).json();

    if (res.code === 0 && res.data) {
      return res.data;
    }
  } catch (e) {
    console.error("[getNewsCategory]", e);
  }
  return [];
};

/**
 * 根据ID获取产品分类
 * @param id
 * @param locale
 * @returns
 */
export const getNewsCategoryById = async (
  id: number,
  locale: Locale,
): Promise<NewsCategory> => {
  const searchParams = new URLSearchParams({
    lang: locale,
  });
  try {
    const res = await (
      await apiFetch(
        `${BASE_API}/site/news-category/${id}?${searchParams.toString()}`,
        {
          next: { revalidate: 60 },
        },
      )
    ).json();

    if (res.code === 0 && res.data) {
      return res.data;
    }
  } catch (e) {
    console.error("[getNewsCategoryById]", e);
  }
  return {} as NewsCategory;
};
