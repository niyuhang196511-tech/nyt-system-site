import { Locale } from "@/types/locale";
import Image from "next/image";
import ContactForm from "@/components/contact/ContactForm";
import { Separator } from "@/components/ui/separator";
import { getTranslations } from "next-intl/server";
import { Metadata } from "next";

interface IParams {
  locale: Locale;
}

export const generateMetadata = async ({
  params,
}: {
  params: Promise<IParams>;
}): Promise<Metadata> => {
  const { locale } = await params;
  const siteDict = await getTranslations("site");
  const contactDict = await getTranslations("contact");

  const title = `${contactDict("title")}`;
  const description = `${contactDict("weixin")} / ${contactDict("special_plane")} / ${contactDict("phone")} / ${contactDict("address")}`;

  return {
    title,
    description,
    keywords: [title, ...description.split(" / ")],
    openGraph: {
      type: "website",
      title,
      description,
      url: `https://www.jundaoxin.com/${locale}/contact`,
      siteName: siteDict("title"),
      locale,
    },
    alternates: {
      canonical: `https://www.jundaoxin.com/${locale}/contact`,
      languages: {
        "zh-CN": `https://www.jundaoxin.com/zh-CN/contact`,
        "en-US": `https://www.jundaoxin.com/en-US/contact`,
      },
    },
    robots: {
      index: true,
      follow: true,
    },
    other: {
      "script:ld+json": JSON.stringify({
        "@context": "https://schema.org",
        "@type": "ContactPage",
        name: contactDict("title"),
        description,
        url: "https://www.jundaoxin.com",
        logo: "/images/logo.webp",
        foundingDate: "2015",
        industry: "Medical Devices",
      }),
    },
  };
};

export default async function ContactPage() {
  const contactDict = await getTranslations("contact");

  return (
    <section>
      <Image
        className="w-full object-cover"
        src="/images/contact_us.webp"
        alt="Contact Us"
        width={1920}
        height={1000}
      />

      <section className="mx-auto px-6 py-3 xl:container xl:px-12 xl:py-12">
        <ContactForm></ContactForm>

        <Separator className="my-6"></Separator>
        <div className="flex items-center justify-between gap-x-4">
          <p>{contactDict("qr_message")}</p>
          <Image
            src="/images/qrcode.png"
            alt={contactDict("qr_alt")}
            width={100}
            height={100}
          />
        </div>
      </section>
    </section>
  );
}
