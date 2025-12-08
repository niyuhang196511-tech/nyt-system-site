import type { ReactNode } from "react";
import ThemeProvider from "@/components/ThemeProvider";
import localFont from "next/font/local";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import { Language } from "@/types/language";
import { NextIntlClientProvider } from "next-intl";
import { getLanguage } from "@/lib/getLanguage";

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
  params: Promise<{ language: string }>;
}) {
  const { language } = await params;

  const messages = (await import(`../../languages/${language}.json`)).default;

  return (
    <html lang={language} className={sourceHan.variable}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body>
        <NextIntlClientProvider locale={language} messages={messages}>
          <ThemeProvider>
            <Header language={language as Language}></Header>
            <main>{children}</main>
            <Footer language={language as Language}></Footer>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
