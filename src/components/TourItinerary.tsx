"use client";

import React, { FC, useState } from "react";
import { MapPinIcon, FlagIcon } from "@heroicons/react/24/solid";
import { TourStop } from "@/data/itineraries";
import { useI18n } from "@/i18n/I18nProvider";

export interface TourItineraryProps {
  stops: TourStop[];
  tourKey: string;
  title?: string;
}

const TourItinerary: FC<TourItineraryProps> = ({ stops, tourKey, title }) => {
  const { t } = useI18n();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  if (!stops || stops.length === 0) return null;

  const handleToggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className="listingSection__wrap">
      <h2 className="text-2xl font-semibold">{title || t("itinerary.title")}</h2>
      <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
      <div className="relative">
        {stops.map((stop, index) => {
          const isLast = index === stops.length - 1;
          const isOpen = openIndex === index;
          return (
            <div key={index} className="relative flex gap-5 pb-10 last:pb-0">
              {!isLast && (
                <div className="absolute left-[15px] top-8 bottom-0 border-l-2 border-dashed border-primary-6000/40" />
              )}
              <div className="relative z-10 flex-shrink-0">
                {stop.isStart || stop.isEnd ? (
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary-6000 text-white">
                    {stop.isStart ? <MapPinIcon className="w-4 h-4" /> : <FlagIcon className="w-4 h-4" />}
                  </div>
                ) : (
                  <div className="flex items-center justify-center w-8 h-8">
                    <div className="w-3 h-3 rounded-full border-2 border-primary-6000 bg-white dark:bg-neutral-900" />
                  </div>
                )}
              </div>
              <div className="pt-1 flex-1">
                <button
                  type="button"
                  onClick={() => handleToggle(index)}
                  className="font-semibold text-neutral-900 dark:text-neutral-100 text-left hover:text-primary-6000 transition-colors cursor-pointer"
                >
                  {t(`itinerary.tours.${tourKey}.stops.${index}.title`, undefined, stop.title)}
                </button>
                {stop.description && (
                  <div
                    className="grid transition-all duration-300 ease-in-out"
                    style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                  >
                    <div className="overflow-hidden">
                      <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
                        {t(`itinerary.tours.${tourKey}.stops.${index}.description`, undefined, stop.description)}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TourItinerary;
