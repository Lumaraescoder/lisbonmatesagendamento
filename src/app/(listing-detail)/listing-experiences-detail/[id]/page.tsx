"use client";

import React, { FC } from "react";
import { useParams, usePathname, useRouter } from "next/navigation";
import { Route } from "next";
import Image from "next/image";
import { ArrowRightIcon, Squares2X2Icon } from "@heroicons/react/24/outline";
// Comments removed; using testimonials
import SectionClientSay from "@/components/SectionClientSay";
import FiveStartIconForRate from "@/components/FiveStartIconForRate";
// Avatar removed per request
import Badge from "@/shared/Badge";
import ButtonCircle from "@/shared/ButtonCircle";
import ButtonPrimary from "@/shared/ButtonPrimary";
import ButtonSecondary from "@/shared/ButtonSecondary";
import Input from "@/shared/Input";
import LikeSaveBtns from "@/components/LikeSaveBtns";
import StartRating from "@/components/StartRating";
import StayDatesRangeInput from "../StayDatesRangeInput";
import GuestsInput from "../GuestsInput";
// SectionDateRange removed for experiences detail
import { DEMO_EXPERIENCES_LISTINGS, DEMO_STAY_LISTINGS } from "@/data/listings";
import { ITINERARIES } from "@/data/itineraries";
import TourItinerary from "@/components/TourItinerary";

const ListingExperiencesDetailPageDynamic: FC = () => {
  const params = useParams();
  const id = params?.id;
  const thisPathname = usePathname();
  const router = useRouter();

  const all = [...DEMO_EXPERIENCES_LISTINGS, ...DEMO_STAY_LISTINGS];
  const item = all.find((it) => {
    const href = (it.href || "").toString();
    if (!id) return false;
    // Exact match for slug or id at the end
    if (href.endsWith(`/${id}`)) return true;
    // If id is the short id (like 'id1') but href contains a slug like '/id1-title', match that too
    if (href.includes(`/${id}-`)) return true;
    // Also allow href that simply contains the id segment
    if (href.includes(`/${id}`)) return true;
    return false;
  });

  const handleOpenModalImageGallery = () => {
    router.push(`${thisPathname}/?modal=PHOTO_TOUR_SCROLLABLE` as Route);
  };

  if (!item) {
    return <div className="container py-20">Listing not found: {id}</div>;
  }

  const shortId = typeof id === "string" ? id.split("-")[0] : "";

  const gallery = item.gallery || [];
  const [adults, setAdults] = React.useState<number>(1);
  const [children, setChildren] = React.useState<number>(0);
  const [infants, setInfants] = React.useState<number>(0);

  // parse numeric price from item.price string like "From€30" or "Fixed Price€320"
  const rawPrice = (item.price || '').toString();
  const priceNum = parseFloat((rawPrice.match(/[0-9]+(\.[0-9]+)?/) || ['0'])[0]) || 0;
  const currencyMatch = rawPrice.match(/[$€£¥]/);
  const currency = currencyMatch ? currencyMatch[0] : '$';
  const isFixed = /fixed/i.test(rawPrice);
  const payableGuests = adults + children; // infants free
  const subtotal = isFixed ? priceNum : priceNum * payableGuests;
  const serviceCharge = 0;
  const total = subtotal + serviceCharge;

  return (
    <div className={` nc-ListingExperiencesDetailPage `}>
      <header className="rounded-md sm:rounded-xl">
        {/* gallery debug removed */}
        <div className="relative grid grid-cols-4 gap-1 sm:gap-2">
          <div
            className="col-span-3 row-span-3 relative rounded-md sm:rounded-xl overflow-hidden cursor-pointer"
            onClick={handleOpenModalImageGallery}
          >
            <Image
              alt={item.title}
              fill
              className="object-cover  rounded-md sm:rounded-xl"
              src={gallery[0]?.src || item.featuredImage || ""}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
            />
            <div className="absolute inset-0 bg-neutral-900 bg-opacity-20 opacity-0 hover:opacity-100 transition-opacity"></div>
          </div>

          {gallery.filter((_, i) => i >= 1 && i < 4).map((p: any, index: number) => (
            <div
              key={index}
              className={`relative rounded-md sm:rounded-xl overflow-hidden ${index >= 2 ? "block" : ""}`}
            >
              <div className="aspect-w-4 aspect-h-3">
                <Image
                  alt={p?.alt || `photo ${index + 2}`}
                  fill
                  className="object-cover w-full h-full rounded-md sm:rounded-xl "
                  src={p?.src || item.featuredImage || ""}
                  sizes="400px"
                />
              </div>

              <div
                className="absolute inset-0 bg-neutral-900 bg-opacity-20 opacity-0 hover:opacity-100 transition-opacity cursor-pointer"
                onClick={handleOpenModalImageGallery}
              />
            </div>
          ))}

          <div
            className="absolute hidden md:flex md:items-center md:justify-center left-3 bottom-3 px-4 py-2 rounded-xl bg-neutral-100 text-neutral-500 cursor-pointer hover:bg-neutral-200 z-10"
            onClick={handleOpenModalImageGallery}
          >
            <Squares2X2Icon className="h-5 w-5" />
            <span className="ml-2 text-neutral-800 text-sm font-medium">Show all photos</span>
          </div>
        </div>
      </header>

      <main className="relative z-10 mt-11 flex flex-col lg:flex-row ">
        <div className="w-full lg:w-3/5 xl:w-2/3 space-y-8 lg:pr-10 lg:space-y-10">
          <div className="listingSection__wrap !space-y-6">
            <div className="flex justify-between items-center">
              <Badge color="pink" name={item.listingCategory?.name || "Tour"} />
              <LikeSaveBtns />
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold">{item.title}</h2>

            <div className="flex items-center space-x-4">
              <StartRating />
              <span>·</span>
              <span>
                <i className="las la-map-marker-alt"></i>
                <span className="ml-1"> {item.address}</span>
              </span>
            </div>

            <div className="flex items-center">
              <span className="text-neutral-500 dark:text-neutral-400">
                Hosted by <span className="text-neutral-900 dark:text-neutral-200 font-medium">{item.author?.displayName || item.author?.name || "Host"}</span>
              </span>
            </div>
          </div>

          <div className="listingSection__wrap">
            <h2 className="text-2xl font-semibold">Experiences descriptions</h2>
            <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
            <div className="text-neutral-6000 dark:text-neutral-300">
              <p>{item.description || item.content || "No description provided."}</p>
            </div>
          </div>

          {/* Availability removed for experiences detail */}

          {/* Host Information removed as requested */}

          {ITINERARIES[shortId] && (
            <TourItinerary stops={ITINERARIES[shortId].stops} />
          )}

          <SectionClientSay />
        </div>

        <div className="hidden lg:block flex-grow mt-14 lg:mt-0">
          <div className="sticky top-28">
            <div className="listingSectionSidebar__wrap shadow-xl">
              <div className="flex justify-between">
                <span className="text-3xl font-semibold">
                  {item.price || "$0"}
                  <span className="ml-1 text-base font-normal text-neutral-500 dark:text-neutral-400">/person</span>
                </span>
                <StartRating />
              </div>

              <form className="flex flex-col border border-neutral-200 dark:border-neutral-700 rounded-3xl ">
                <StayDatesRangeInput className="flex-1 z-[11]" />
                <div className="w-full border-b border-neutral-200 dark:border-neutral-700"></div>
                <GuestsInput
                  className="flex-1"
                  adults={adults}
                  children={children}
                  infants={infants}
                  onChange={(v) => {
                    setAdults(v.guestAdults);
                    setChildren(v.guestChildren);
                    setInfants(v.guestInfants);
                  }}
                />
              </form>

              <div className="flex flex-col space-y-4">
                <div className="flex justify-between text-neutral-6000 dark:text-neutral-300">
                  <span>{rawPrice} x {isFixed ? '—' : `${payableGuests} persons`}</span>
                  <span>{currency}{isFixed ? priceNum : (priceNum * payableGuests)}</span>
                </div>
                <div className="border-b border-neutral-200 dark:border-neutral-700"></div>
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>{currency}{total}</span>
                </div>
              </div>

              <ButtonPrimary href={"/checkout"}>Reserve</ButtonPrimary>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ListingExperiencesDetailPageDynamic;