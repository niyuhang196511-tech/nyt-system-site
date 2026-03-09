import type { ReactNode } from "react";
import localFont from "next/font/local";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import { Locale } from "@/types/locale";
import { NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";

// export const dynamic = 'force-static'

const sourceHan = localFont({
  src: [
    {
      path: "../public/fonts/source-han-serif-sc-regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/source-han-serif-sc-bold.otf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-source-han",
  display: "swap",
});

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <html lang={locale} className={sourceHan.className}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className="flex min-h-screen flex-col">
        <NextIntlClientProvider>
          {/* <ThemeProvider> */}
          <Header locale={locale as Locale}></Header>
          <main className="flex-1">{children}</main>
          <Footer locale={locale as Locale}></Footer>
          {/* </ThemeProvider> */}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
