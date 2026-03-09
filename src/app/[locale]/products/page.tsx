import { Locale } from "@/types/locale";
import { routing } from "@/i18n/routing";

export const revalidate = 60;
export const dynamicParams = false;
export const dynamic = "force-static";

// 生成静态路径，确保按 locale 预渲染
export const generateStaticParams = async (): Promise<{ locale: Locale }[]> => {
  const locales = routing.locales as readonly Locale[];
  return locales.map((locale) => ({ locale }));
};

export default function ProductPage() {
  return <div>...</div>;
}
