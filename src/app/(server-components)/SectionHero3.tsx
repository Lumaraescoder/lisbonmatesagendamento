"use client";

import React, { FC } from "react";
import capadesktopImage from "@/images/capa-upscale.png";
import capamobileImage from "@/images/capa-upscale.png";
import Image from "next/image";
import { useI18n } from "@/i18n/I18nProvider";

export interface SectionHero3Props {
  className?: string;
  title?: string;
  subtitle?: string;
  buttonLabel?: string;
}

const SectionHero3: FC<SectionHero3Props> = ({
  className = "",
  title,
  subtitle,
  buttonLabel,
}) => {
  const { t } = useI18n();
  const resolvedTitle = title || t("hero.title");
  const resolvedSubtitle = subtitle || t("hero.subtitle");
  const resolvedButtonLabel = buttonLabel || t("hero.button");

  return (
    <div
      className={`nc-SectionHero3 relative ${className}`}
      data-nc-id="SectionHero3"
    >
      <div className="absolute z-10 inset-x-0 top-[20%] sm:top-[25%] text-center flex flex-col items-center max-w-2xl mx-auto space-y-4 lg:space-y-6">
        <span className="text-lg sm:text-xl md:text-2xl font-semibold text-primary-6000">
          {resolvedSubtitle}
        </span>
        <h2 className="font-bold text-primary-6000 text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl !leading-[115%] ">
          {resolvedTitle}
        </h2>
        <a
          href="/#tours"
          className="nc-Button ttnc-ButtonPrimary relative inline-flex h-auto items-center justify-center rounded-xl bg-primary-6000 px-6 py-3 text-sm font-medium text-neutral-50 transition-colors hover:bg-primary-700 sm:text-base lg:px-8 lg:py-4 lg:text-lg"
        >
          {resolvedButtonLabel}
        </a>
      </div>
      <div className="relative h-[800px] sm:h-auto aspect-w-1 aspect-h-1 sm:aspect-w-4 sm:aspect-h-3 lg:aspect-w-16 lg:aspect-h-9 xl:aspect-h-8 ">
        <picture>
          <source media="(max-width: 768px)" srcSet={capamobileImage.src} />
          <Image
            className="absolute inset-0 object-cover rounded-xl"
            src={capadesktopImage}
            alt={t("hero.imageAlt")}
            priority
            fill
            quality={100}
            sizes="100vw"
          />
        </picture>
      </div>
    </div>
  );
};

export default SectionHero3;
