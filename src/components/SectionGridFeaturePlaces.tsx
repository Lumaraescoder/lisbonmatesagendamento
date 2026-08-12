"use client";

import React, { FC, ReactNode } from "react";
import { DEMO_STAY_LISTINGS } from "@/data/listings";
import { StayDataType } from "@/data/types";
import ButtonPrimary from "@/shared/ButtonPrimary";
import HeaderFilter from "./HeaderFilter";
import StayCard from "./StayCard";
import StayCard2 from "./StayCard2";
import { useI18n } from "@/i18n/I18nProvider";

// OTHER DEMO WILL PASS PROPS
const DEMO_DATA: StayDataType[] = DEMO_STAY_LISTINGS.filter((_, i) => i < 8);

//
export interface SectionGridFeaturePlacesProps {
  stayListings?: StayDataType[];
  gridClass?: string;
  heading?: ReactNode;
  subHeading?: ReactNode;
  headingIsCenter?: boolean;
  tabs?: string[];
  cardType?: "card1" | "card2";
  unit?: string;
}

const SectionGridFeaturePlaces: FC<SectionGridFeaturePlacesProps> = ({
  stayListings = DEMO_DATA,
  gridClass = "",
  heading,
  subHeading,
  headingIsCenter,
  tabs = [],
  cardType = "card2",
  unit = "/night",
}) => {
  const { t } = useI18n();
  const resolvedHeading = heading || t("section.featuredTours");
  const renderCard = (stay: StayDataType, idx: number) => {
    let CardName = StayCard;
    switch (cardType) {
      case "card1":
        CardName = StayCard;
        break;
      case "card2":
        CardName = StayCard2;
        break;

      default:
        CardName = StayCard;
    }

    const gallery = stay.gallery && stay.gallery.length ? stay.gallery : (stay.featuredImage ? [{ src: stay.featuredImage, alt: stay.title || "" }] : []);
    const newData = { ...stay, gallery } as StayDataType;
    return <CardName key={stay.id} data={newData} unit={unit} />;
  };

  return (
    <div className="nc-SectionGridFeaturePlaces relative">
      <HeaderFilter tabActive={"New York"} subHeading={subHeading} tabs={tabs} heading={resolvedHeading} showViewAll={false} />
      <div
        className={`grid gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ${gridClass}`}
      >
        {stayListings.map((stay, idx) => renderCard(stay, idx))}
      </div>
      <div className="flex mt-16 justify-center items-center">
        {/* <ButtonPrimary loading>Show me more</ButtonPrimary> */}
      </div>
    </div>
  );
};

export default SectionGridFeaturePlaces;
