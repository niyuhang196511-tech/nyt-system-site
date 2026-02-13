import { Locale } from "next-intl";
import { BASE_API, TENANT_ID } from "@/constants/api";
import { Product } from "@/types/product";

export const getProductRecommend = async (
  locale: Locale,
): Promise<Product[]> => {
  const searchParams = new URLSearchParams({
    lang: locale,
  });
  const res = await (
    await fetch(
      `${BASE_API}/site/product/recommend?${searchParams.toString()}`,
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

export const getProductsByCategoryId = async (
  categoryId: string,
  locale: Locale,
): Promise<Product[]> => {
  const searchParams = new URLSearchParams({
    categoryId,
    lang: locale,
  });
  const res = await (
    await fetch(
      `${BASE_API}/site/product/listByCategoryId?${searchParams.toString()}`,
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

export const getProductById = async (
  id: string,
  locale: Locale,
): Promise<Product> => {
  const searchParams = new URLSearchParams({
    lang: locale,
  });
  const res = await (
    await fetch(`${BASE_API}/site/product/${id}?${searchParams.toString()}`, {
      next: { revalidate: 60 },
      headers: {
        "tenant-id": TENANT_ID,
      },
    })
  ).json();

  if (res.code === 0) {
    return res.data;
  } else {
    return {} as Product;
  }
};
