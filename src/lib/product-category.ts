import { BASE_API, apiFetch } from "@/constants/api";
import { Locale } from "@/types/locale";
import { ProductCategory } from "@/types/product";

/**
 * 获取产品分类
 * @param locale 语言
 */
export const getProductCategory = async (
  locale: Locale,
): Promise<ProductCategory[]> => {
  const searchParams = new URLSearchParams({
    lang: locale,
  });
  try {
    const res = await (
      await apiFetch(
        `${BASE_API}/site/product-category/list?${searchParams.toString()}`,
        {
          next: { revalidate: 60 },
        },
      )
    ).json();

    if (res.code === 0 && res.data) {
      return res.data;
    }
  } catch (e) {
    console.error("[getProductCategory]", e);
  }
  return [];
};

/**
 * 根据ID获取产品分类
 * @param id
 * @param locale
 * @returns
 */
export const getProductCategoryById = async (
  id: string,
  locale: Locale,
): Promise<ProductCategory> => {
  const searchParams = new URLSearchParams({
    lang: locale,
  });
  try {
    const res = await (
      await apiFetch(
        `${BASE_API}/site/product-category/${id}?${searchParams.toString()}`,
        {
          next: { revalidate: 60 },
        },
      )
    ).json();

    if (res.code === 0 && res.data) {
      return res.data;
    }
  } catch (e) {
    console.error("[getProductCategoryById]", e);
  }
  return {} as ProductCategory;
};
