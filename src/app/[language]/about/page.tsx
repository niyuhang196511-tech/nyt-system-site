import type { City } from "@/components/ChinaMapScatterShandong";
import { getLanguage } from "@/lib/getLanguage";
import { Language } from "@/types/language";
import Timeline from "@/components/AnimatedTimeline";
import HeroBanner from "@/components/about/HeroBanner";
import CompanyIntroduce from "@/components/about/CompanyIntroduce";

export default async function AboutPage({
  params,
}: {
  params: Promise<{ language: string }>;
}) {
  const { language } = await params;

  const dict = await getLanguage(language as Language);

  const points: City[] = [
    { name: "山东", coords: [117.0009, 36.6758] },

    //（山东→全国）示例散点
    { name: "北京", coords: [116.4074, 39.9042] },
    { name: "上海", coords: [121.4737, 31.2304] },
    { name: "广州", coords: [113.2644, 23.1291] },
    { name: "西安", coords: [108.9398, 34.3416] },
    { name: "成都", coords: [104.0665, 30.5723] },
  ];

  return (
    <section>
      <HeroBanner
        title={dict.about.heroBanner.title}
        subTitle={dict.about.heroBanner.subtitle}
        points={points}
        strengths={dict.about.strengths}
      ></HeroBanner>

      <CompanyIntroduce
        title={dict.site.title}
        descriptions={dict.about.descriptions}
      ></CompanyIntroduce>

      <section>
        <Timeline />
      </section>
    </section>
  );
}
