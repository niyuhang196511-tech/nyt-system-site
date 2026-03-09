"use client";

import { Cta } from "@/types/home";
import Image from "next/image";
import Link from "next/link";

interface HeroBannerProps {
  title: string;
  description: string[];
  imageSrc: string;
  imageAlt: string;
  iconSrc?: string;
  iconAlt?: string;
  videoSrc?: string;
  ctas: Cta[];
}

export default function HeroBanner({
  title,
  description,
  imageSrc,
  imageAlt,
  iconSrc = "/hand-holding-heart.svg",
  iconAlt = "hand-holding-heart",
  videoSrc = "https://www.medtronic.com/content/dam/medtronic-wide/public/brand-corporate-assets/imagery/concept/26-dtc-masterbrand-home-page-abstract-bnr-desktop-1440-700-web.mp4",
  ctas,
}: HeroBannerProps) {
  return (
    <section className="relative overflow-hidden">
      <video
        className="absolute inset-0 -z-10 h-full w-full object-cover"
        autoPlay
        muted
        loop
        preload="metadata"
        playsInline
      >
        <source src={videoSrc} />
      </video>
      <div className="mx-auto px-4 py-4 xl:container xl:px-26 xl:py-16">
        <div className="grid h-full w-full grid-cols-1 gap-3 rounded-2xl bg-white/70 px-4 py-6 md:grid-cols-2 xl:py-12 2xl:gap-24 2xl:px-9">
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
            <h2 className="mb-2 text-xl font-bold md:text-2xl xl:mb-5 xl:text-3xl">
              {title}
            </h2>
            {description.map((paragraph, index) => (
              <p key={index} className="text-base leading-7 md:leading-8">
                {paragraph}
              </p>
            ))}
            <div className="flex flex-col gap-4 py-2">
              {ctas.map((cat, index) => (
                <Link href={cat.link} key={index}>
                  <button className="nded-full relative w-full cursor-pointer overflow-hidden rounded-full bg-white px-8 py-2 text-base font-bold text-black shadow-md transition-all duration-400 ease-in-out before:absolute before:top-0 before:-left-full before:z-[-1] before:h-full before:w-full before:rounded-full before:bg-linear-to-r before:from-blue-500 before:to-blue-300 before:transition-all before:duration-500 before:ease-in-out hover:scale-105 hover:text-white hover:shadow-lg hover:before:left-0 active:scale-90">
                    {cat.title}
                  </button>
                </Link>
              ))}
            </div>
          </div>
          <div className="hidden flex-col justify-center md:flex">
            <Image
              style={{
                boxShadow:
                  "7px 7px 10px rgba(0,0,0,0.15), 7px 7px 10px rgba(0,0,0,0.15), 7px 7px 10px rgba(0,0,0,0.15)",
              }}
              className="-right-24 aspect-3/2 w-full rounded-2xl object-cover xl:relative"
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
