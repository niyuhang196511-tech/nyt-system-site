import { getLanguage } from "@/lib/getLanguage";
import { Language } from "@/types/language";
import Image from "next/image";
import ContactForm from "@/components/contact/ContactForm";
import { Separator } from "@/components/ui/separator";

export default async function ContactPage({
  params,
}: {
  params: Promise<{ language: string }>;
}) {
  const { language } = await params;

  const dict = await getLanguage(language as Language);
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
        {/* <ContactForm></ContactForm> */}

        <Separator className="my-6"></Separator>
        <div className="flex items-center justify-between gap-x-4">
          <p>
            欢迎您扫描二维码关注我们的官方微信公众号，我们将持续为您推送最新产品动态、功能更新、活动资讯以及专业服务内容，让您随时随地都能获取第一手信息。
          </p>
          <Image
            src="/images/qrcode.png"
            alt="微信公众号二维码"
            width={100}
            height={100}
          />
        </div>
      </section>
    </section>
  );
}
