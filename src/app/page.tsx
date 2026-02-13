// Root page: redirect to locale based on browser language
import { Locale } from "@/types/locale";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function RootPage() {
  const headersList = await headers();
  const acceptLanguage = headersList.get("accept-language") || "";

  // Supported locales
  const supportedLocales: Locale[] = ["zh-CN", "en-US"];
  const defaultLocale = "zh-CN";

  // Parse accept-language header to find best match
  let targetLocale = defaultLocale;

  // Check for Chinese variants
  if (acceptLanguage.includes("zh-CN") || acceptLanguage.includes("zh-Hans")) {
    targetLocale = "zh-CN";
  } else if (acceptLanguage.includes("zh")) {
    targetLocale = "zh-CN";
  } else if (acceptLanguage.includes("en")) {
    targetLocale = "en-US";
  } else {
    // Try to find any supported locale in accept-language
    for (const locale of supportedLocales) {
      if (acceptLanguage.toLowerCase().includes(locale.toLowerCase())) {
        targetLocale = locale;
        break;
      }
    }
  }

  redirect(`/${targetLocale}`);
}
