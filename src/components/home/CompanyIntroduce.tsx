import { Strength } from "@/types/strength";
import Image from "next/image";

interface IProps {
  title: string;
  descriptions: string[];
  strengths: Strength[];
}

export default function CompanyIntroduce({
  title,
  descriptions: description,
  strengths: strength,
}: IProps) {
  return (
    <section>
      <div className="container mx-auto px-4 py-6">
        <div className="mb-12 sm:mb-16">
          <h1 className="mb-2 text-center text-xl font-bold text-foreground sm:text-4xl md:mb-4 md:text-2xl xl:mb-6 xl:text-3xl">
            {title}
          </h1>

          <div className="mx-auto max-w-4xl">
            {description.map((paragraph, index) => (
              <p className="mb-5 indent-8 leading-7 md:leading-9" key={index}>
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 sm:gap-12 lg:grid-cols-4">
          {strength.map((strength) => (
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
      </div>
    </section>
  );
}
