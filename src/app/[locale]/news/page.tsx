import { Locale } from "@/types/locale";
import { routing } from "@/i18n/routing";

export const revalidate = 60;

export const generateStaticParams = async (): Promise<{ locale: Locale }[]> => {
  const locales = routing.locales as readonly Locale[];
  return locales.map((locale) => ({ locale }));
};

export const dynamicParams = false;
export const dynamic = "force-static";

export default function NewsPage() {
  return <div>...</div>;
}
