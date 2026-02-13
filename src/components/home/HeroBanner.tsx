import Image from "next/image";

interface HeroBannerProps {
  title: string;
  description: string[];
  imageSrc: string;
  imageAlt: string;
  iconSrc?: string;
  iconAlt?: string;
  videoSrc?: string;
}

export default function HeroBanner({
  title,
  description,
  imageSrc,
  imageAlt,
  iconSrc = "/hand-holding-heart.svg",
  iconAlt = "hand-holding-heart",
  videoSrc = "https://www.medtronic.com/content/dam/medtronic-wide/public/brand-corporate-assets/imagery/concept/26-dtc-masterbrand-home-page-abstract-bnr-desktop-1440-700-web.mp4",
}: HeroBannerProps) {
  return (
    <section className="relative overflow-hidden">
      <video
        className="absolute inset-0 -z-10 h-full w-full object-cover"
        autoPlay
        muted
        loop
      >
        <source src={videoSrc} />
      </video>
      <div className="mx-auto px-4 py-4 xl:container xl:px-26 xl:py-16">
        <div className="grid h-full w-full grid-cols-1 gap-3 rounded-2xl bg-white/70 px-4 py-6 md:grid-cols-2 xl:gap-24 xl:px-9 xl:py-12">
          <div>
            <div className="mb-4">
              <Image
                className="border-b-2 border-b-gray-400 pb-4"
                src={iconSrc}
                alt={iconAlt}
                width={50}
                height={50}
              />
            </div>
            <h2 className="mb-5 text-xl font-bold md:text-2xl xl:text-4xl">
              {title}
            </h2>
            {description.map((paragraph, index) => (
              <p
                key={index}
                className="indent-8 text-base leading-7 md:leading-9"
              >
                {paragraph}
              </p>
            ))}
          </div>
          <div className="flex flex-col justify-center">
            <Image
              style={{
                boxShadow:
                  "7px 7px 10px rgba(0,0,0,0.15), 7px 7px 10px rgba(0,0,0,0.15), 7px 7px 10px rgba(0,0,0,0.15)",
              }}
              className="-right-24 w-full rounded-2xl object-cover xl:relative"
              src={imageSrc}
              alt={imageAlt}
              width={500}
              height={500}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
