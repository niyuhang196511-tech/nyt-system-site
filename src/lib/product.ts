import { Locale } from "next-intl";
import { BASE_API, apiFetch } from "@/constants/api";
import { Product } from "@/types/product";

export const getProductRecommend = async (
  locale: Locale,
): Promise<Product[]> => {
  const searchParams = new URLSearchParams({
    lang: locale,
  });
  try {
    const res = await (
      await apiFetch(
        `${BASE_API}/site/product/recommend?${searchParams.toString()}`,
        {
          next: { revalidate: 60 },
        },
      )
    ).json();

    if (res.code === 0 && res.data) {
      return res.data;
    }
  } catch (e) {
    console.error("[getProductRecommend]", e);
  }
  return [];
};

export const getProductsByCategoryId = async (
  categoryId: string,
  locale: Locale,
): Promise<Product[]> => {
  const searchParams = new URLSearchParams({
    categoryId,
    lang: locale,
  });
  try {
    const res = await (
      await apiFetch(
        `${BASE_API}/site/product/listByCategoryId?${searchParams.toString()}`,
        {
          next: { revalidate: 60 },
        },
      )
    ).json();

    if (res.code === 0 && res.data) {
      return res.data;
    }
  } catch (e) {
    console.error("[getProductsByCategoryId]", e);
  }
  return [];
};

export const getProductById = async (
  id: string,
  locale: Locale,
): Promise<Product> => {
  const searchParams = new URLSearchParams({
    lang: locale,
  });
  try {
    const res = await (
      await apiFetch(`${BASE_API}/site/product/${id}?${searchParams.toString()}`, {
        next: { revalidate: 60 },
      })
    ).json();

    if (res.code === 0 && res.data) {
      return res.data;
    }
  } catch (e) {
    console.error("[getProductById]", e);
  }
  return {} as Product;
};
