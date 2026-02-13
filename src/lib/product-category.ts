import { BASE_API, TENANT_ID } from "@/constants/api";
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
  const res = await (
    await fetch(
      `${BASE_API}/site/product-category/list?${searchParams.toString()}`,
      {
        next: { revalidate: 60 },
        headers: {
          "tenant-id": TENANT_ID,
        },
      },
    )
  ).json();

  if (res.code === 0) {
    return res.data;
  } else {
    return [];
  }
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
  const res = await (
    await fetch(
      `${BASE_API}/site/product-category/${id}?${searchParams.toString()}`,
      {
        next: { revalidate: 60 },
        headers: {
          "tenant-id": TENANT_ID,
        },
      },
    )
  ).json();

  if (res.code === 0) {
    return res.data;
  } else {
    return {} as ProductCategory;
  }
};
