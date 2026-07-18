import React, { FC } from "react";
import capadesktopJpeg from "@/images/capa.jpeg";
import capamobileJpeg from "@/images/capa.jpeg";
import Image from "next/image";
import ButtonPrimary from "@/shared/ButtonPrimary";

export interface SectionHero3Props {
  className?: string;
  title?: string;
  subtitle?: string;
  buttonLabel?: string;
}

const SectionHero3: FC<SectionHero3Props> = ({
  className = "",
  title = "Lisbon Mates",
  subtitle = "Discover the best tours and experiences in Lisbon",
  buttonLabel = "Book now",
}) => {
  return (
    <div
      className={`nc-SectionHero3 relative ${className}`}
      data-nc-id="SectionHero3"
    >
      <div className="absolute z-10 inset-x-0 top-[20%] sm:top-[25%] text-center flex flex-col items-center max-w-2xl mx-auto space-y-4 lg:space-y-6">
        <span className="text-lg sm:text-xl md:text-2xl font-semibold text-primary-6000">
          {subtitle}
        </span>
        <h2 className="font-bold text-primary-6000 text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl !leading-[115%] ">
          {title}
        </h2>
        <ButtonPrimary
          sizeClass="px-6 py-3 lg:px-8 lg:py-4 rounded-xl"
          fontSize="text-sm sm:text-base lg:text-lg font-medium"
        >
          {buttonLabel}
        </ButtonPrimary>
      </div>
      <div className="relative h-[800px] sm:h-auto aspect-w-1 aspect-h-1 sm:aspect-w-4 sm:aspect-h-3 lg:aspect-w-16 lg:aspect-h-9 xl:aspect-h-8 ">
        <picture>
          <source media="(max-width: 768px)" srcSet={capamobileJpeg.src} />
          <Image
            className="absolute inset-0 object-cover rounded-xl"
            src={capadesktopJpeg}
            alt="hero"
            priority
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </picture>
      </div>
    </div>
  );
};

export default SectionHero3;