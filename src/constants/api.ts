export const BASE_API =
  process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:48080/app-api";

export const TENANT_ID = process.env.NEXT_PUBLIC_TENANT_ID || "1";

export const MINIO_REMOTE =
  process.env.NEXT_PUBLIC_MINIO_REMOTE || "http://192.168.0.33:9000";

/** 默认请求超时时间（毫秒） */
export const FETCH_TIMEOUT = 10_000;

/** 带超时和错误处理的 fetch 封装 */
export async function apiFetch(
  url: string,
  init?: RequestInit & { next?: NextFetchRequestConfig },
): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT);

  try {
    const res = await fetch(url, {
      ...init,
      signal: controller.signal,
      headers: {
        "tenant-id": TENANT_ID,
        ...init?.headers,
      },
    });
    return res;
  } finally {
    clearTimeout(timer);
  }
}

type NextFetchRequestConfig = {
  revalidate?: number | false;
  tags?: string[];
};
