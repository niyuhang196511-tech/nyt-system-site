import Image from "next/image";
import ChinaMapScatterShandong, { type City } from "../ChinaMapScatterShandong";
import { Strength } from "@/types/strength";

interface IProps {
  title: string;
  subTitle: string;
  points: City[];
  strengths: Strength[];
}

export default function HeroBanner({
  title,
  subTitle,
  points,
  strengths,
}: IProps) {
  return (
    <section className="relative mx-auto px-6 py-4 xl:container xl:px-12">
      <div className="mb-96">
        <h2 className="mb-4 text-3xl font-bold">{title}</h2>
        <p>{subTitle}</p>
      </div>
      <ChinaMapScatterShandong
        className="absolute inset-0 -z-10"
        cities={points}
      />
      <div className="grid gap-8 sm:grid-cols-2 sm:gap-12 lg:grid-cols-4">
        {strengths.map((strength) => (
          <div
            key={strength.description}
            className="flex flex-col items-center gap-3 py-6"
            style={{
              boxShadow: "0 1px 0 rgba(171, 171, 171, 0.4)",
            }}
          >
            <div className="grid min-w-48 grid-cols-2 items-center justify-center">
              <Image
                src={strength.icon}
                alt={strength.description}
                width={50}
                height={50}
                className="icon-sm"
              />
              <span className="card-text text-2xl font-semibold text-foreground">
                {strength.quantity}
                {strength.unit}
              </span>
            </div>
            <div className="card-text text-lg text-foreground sm:text-2xl">
              {strength.description}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
