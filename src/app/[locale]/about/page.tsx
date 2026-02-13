import type { City } from "@/components/ChinaMapScatterShandong";
import { Locale } from "@/types/locale";
import Timeline from "@/components/AnimatedTimeline";
import HeroBanner from "@/components/about/HeroBanner";
import CompanyIntroduce from "@/components/about/CompanyIntroduce";
import { getTranslations } from "next-intl/server";
import { strengthsConstants } from "@/constants/about";
import { timeLines } from "@/constants/timeline";
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
  const aboutDict = await getTranslations("about");

  const title = `${aboutDict("title")}`;
  const description = `${aboutDict("description-1")} ${aboutDict("description-2")}`;

  return {
    title,
    description,
    keywords: [
      title,
      `${aboutDict("heroBanner.title")}`,
      ...timeLines[locale].map((item) => `${item.date}-${item.title}`),
    ],
    openGraph: {
      type: "website",
      title,
      description,
      url: `https://www.jundaoxin.com/${locale}/about`,
      siteName: siteDict("title"),
      locale,
    },
    alternates: {
      canonical: `https://www.jundaoxin.com/${locale}/about`,
      languages: {
        "zh-CN": `https://www.jundaoxin.com/zh-CN/about`,
        "en-US": `https://www.jundaoxin.com/en-US/about`,
      },
    },
    robots: {
      index: true,
      follow: true,
    },
    other: {
      "script:ld+json": JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Organization",
        name: aboutDict("title"),
        description,
        url: "https://www.jundaoxin.com",
        logo: "/images/logo.webp",
        foundingDate: "2015",
        industry: "Medical Devices",
      }),
    },
  };
};

export default async function AboutPage({
  params,
}: {
  params: Promise<IParams>;
}) {
  const { locale } = await params;

  const siteDict = await getTranslations("site");
  const aboutDict = await getTranslations("about");

  const points: City[] = [
    { name: "北京市", coords: [116.405285, 39.904989] },
    { name: "天津市", coords: [117.190182, 39.125596] },
    { name: "上海市", coords: [121.472644, 31.231706] },
    { name: "重庆市", coords: [106.504962, 29.533155] },
    { name: "河北省", coords: [114.502461, 38.045474] },
    { name: "山西省", coords: [112.549248, 37.857014] },
    { name: "辽宁省", coords: [123.429096, 41.796767] },
    { name: "吉林省", coords: [125.3245, 43.886841] },
    { name: "黑龙江省", coords: [126.642464, 45.756967] },
    { name: "江苏省", coords: [118.767413, 32.041544] },
    { name: "浙江省", coords: [120.153576, 30.287459] },
    { name: "安徽省", coords: [117.283042, 31.86119] },
    { name: "福建省", coords: [119.306239, 26.075302] },
    { name: "江西省", coords: [115.892151, 28.676493] },
    { name: "山东省", coords: [117.000923, 36.675807] },
    { name: "河南省", coords: [113.665412, 34.757975] },
    { name: "湖北省", coords: [114.298572, 30.584355] },
    { name: "湖南省", coords: [112.982279, 28.19409] },
    { name: "广东省", coords: [113.280637, 23.125178] },
    { name: "海南省", coords: [110.33119, 20.031971] },
    { name: "四川省", coords: [104.065735, 30.659462] },
    { name: "贵州省", coords: [106.713478, 26.578343] },
    { name: "云南省", coords: [102.712251, 25.040609] },
    { name: "陕西省", coords: [108.948024, 34.263161] },
    { name: "甘肃省", coords: [103.823557, 36.058039] },
    { name: "青海省", coords: [101.778916, 36.623178] },
    { name: "台湾省", coords: [121.509062, 25.044332] },
    { name: "内蒙古自治区", coords: [111.670801, 40.818311] },
    { name: "广西壮族自治区", coords: [108.320004, 22.82402] },
    { name: "西藏自治区", coords: [91.132212, 29.660361] },
    { name: "宁夏回族自治区", coords: [106.278179, 38.46637] },
    { name: "新疆维吾尔自治区", coords: [87.617733, 43.792818] },
    { name: "香港特别行政区", coords: [114.173355, 22.320048] },
    { name: "澳门特别行政区", coords: [113.54909, 22.198951] },
  ];

  return (
    <section>
      <HeroBanner
        title={aboutDict("heroBanner.title")}
        subTitle={aboutDict("heroBanner.subtitle")}
        points={points}
        strengths={strengthsConstants[locale]}
      ></HeroBanner>

      <CompanyIntroduce
        title={siteDict("title")}
        descriptions={[aboutDict("description-1"), aboutDict("description-2")]}
      ></CompanyIntroduce>

      <section>
        <Timeline timelines={timeLines[locale]} />
      </section>
    </section>
  );
}
