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
  const [hours, setHours] = React.useState<number>(1);
  const [time, setTime] = React.useState<string>("09:00");

  // parse numeric price from item.price string like "From€30" or "Fixed Price€320"
  const rawPrice = (item.price || '').toString();
  const priceNum = parseFloat((rawPrice.match(/[0-9]+(\.[0-9]+)?/) || ['0'])[0]) || 0;
  const currencyMatch = rawPrice.match(/[$€£¥]/);
  const currency = currencyMatch ? currencyMatch[0] : '$';
  const isFixed = /fixed/i.test(rawPrice);
  const payableGuests = Math.max(1, adults + children); // infants free
  // Pricing table (EUR) — matches checkout logic
  const PRICE_TABLE: Record<number, Record<number, number>> = {
    1: { 1: 60, 2: 90, 3: 120, 4: 150, 5: 185, 6: 220 },
    2: { 1: 60, 2: 120, 3: 180, 4: 240, 5: 300, 6: 360 },
    3: { 1: 90, 2: 170, 3: 250, 4: 330, 5: 410, 6: 480 },
    4: { 1: 120, 2: 190, 3: 260, 4: 330, 5: 400, 6: 480 },
    5: { 1: 150, 2: 210, 3: 280, 4: 350, 5: 420, 6: 480 },
  };

  const peopleKey = payableGuests >= 6 ? 5 : Math.min(5, payableGuests);
  const hoursKey = Math.min(6, Math.max(1, hours || 1));
  const total = isFixed
    ? priceNum
    : (PRICE_TABLE[peopleKey] ? PRICE_TABLE[peopleKey][hoursKey] || PRICE_TABLE[peopleKey][6] : priceNum * payableGuests);

  const formatEUR = (v: number) => new Intl.NumberFormat("pt-PT", { style: "currency", currency: "EUR" }).format(v);
  const unitPricePerPerson = Math.max(0, Number((total / Math.max(1, payableGuests)).toFixed(2)));

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

          {/* Mobile: show full reserve sidebar after content */}
          <div className="block lg:hidden mt-8">
            <div className="listingSectionSidebar__wrap shadow-xl">
              <div className="flex justify-between">
                <span className="text-3xl font-semibold">
                  {item.price || "$0"}
                  <span className="ml-1 text-base font-normal text-neutral-500 dark:text-neutral-400">/person</span>
                </span>
                <StartRating />
              </div>

              <form className="flex flex-col border border-neutral-200 dark:border-neutral-700 rounded-3xl mt-4">
                <StayDatesRangeInput className="flex-1 z-[11]" single />
                <div className="w-full border-b border-neutral-200 dark:border-neutral-700"></div>
                <GuestsInput
                  className="flex-1"
                  adults={adults}
                  children={children}
                  onChange={(v) => {
                    setAdults(v.guestAdults);
                    setChildren(v.guestChildren);
                    setInfants(0);
                  }}
                />

                <div className="p-4">
                  <label className="block text-sm text-neutral-500">Time</label>
                  <select
                    className="w-full mt-2 px-4 py-3 border rounded-md"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                  >
                    {Array.from({ length: 11 }).map((_, i) => {
                      const hour = 9 + i;
                      const hh = hour.toString().padStart(2, "0");
                      const value = `${hh}:00`;
                      return (
                        <option key={value} value={value}>
                          {value}
                        </option>
                      );
                    })}
                  </select>

                  <label className="block text-sm text-neutral-500 mt-3">Hours</label>
                  <select
                    className="w-full mt-2 px-4 py-3 border rounded-md"
                    value={String(hours)}
                    onChange={(e) => setHours(Number(e.target.value))}
                  >
                    {Array.from({ length: 6 }).map((_, i) => {
                      const val = i + 1;
                      return (
                        <option key={val} value={String(val)}>
                          {val} {val === 1 ? "hour" : "hours"}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </form>

              <div className="flex flex-col space-y-4 mt-4">
                <div className="flex justify-between text-neutral-6000 dark:text-neutral-300">
                  <span>{formatEUR(unitPricePerPerson)} x {payableGuests} persons × {hours}h</span>
                  <span>{formatEUR(total)}</span>
                </div>
                <div className="border-b border-neutral-200 dark:border-neutral-700"></div>
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>{formatEUR(total)}</span>
                </div>
              </div>

              <div className="mt-4">
                <ButtonPrimary href={`/checkout?listingId=${encodeURIComponent(item.id || '')}&adults=${adults}&children=${children}&infants=${infants}&hours=${hours}&time=${encodeURIComponent(time)}`}>
                  Reserve
                </ButtonPrimary>
              </div>
            </div>
          </div>
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
                <StayDatesRangeInput className="flex-1 z-[11]" single />
                <div className="w-full border-b border-neutral-200 dark:border-neutral-700"></div>
                <GuestsInput
                  className="flex-1"
                  adults={adults}
                  children={children}
                  onChange={(v) => {
                    setAdults(v.guestAdults);
                    setChildren(v.guestChildren);
                    setInfants(0);
                  }}
                />

                <div className="p-4">
                  <label className="block text-sm text-neutral-500">Time</label>
                  <select
                    className="w-full mt-2 px-4 py-3 border rounded-md"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                  >
                    {Array.from({ length: 11 }).map((_, i) => {
                      const hour = 9 + i;
                      const hh = hour.toString().padStart(2, "0");
                      const value = `${hh}:00`;
                      return (
                        <option key={value} value={value}>
                          {value}
                        </option>
                      );
                    })}
                  </select>

                  <label className="block text-sm text-neutral-500 mt-3">Hours</label>
                  <select
                    className="w-full mt-2 px-4 py-3 border rounded-md"
                    value={String(hours)}
                    onChange={(e) => setHours(Number(e.target.value))}
                  >
                    {Array.from({ length: 6 }).map((_, i) => {
                      const val = i + 1;
                      return (
                        <option key={val} value={String(val)}>
                          {val} {val === 1 ? "hour" : "hours"}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </form>

              <div className="flex flex-col space-y-4">
                <div className="flex justify-between text-neutral-6000 dark:text-neutral-300">
                  <span>{formatEUR(unitPricePerPerson)} x {payableGuests} persons × {hours}h</span>
                  <span>{formatEUR(total)}</span>
                </div>
                <div className="border-b border-neutral-200 dark:border-neutral-700"></div>
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>{formatEUR(total)}</span>
                </div>
              </div>

              <ButtonPrimary href={`/checkout?listingId=${encodeURIComponent(item.id || '')}&adults=${adults}&children=${children}&infants=${infants}&hours=${hours}&time=${encodeURIComponent(time)}`}>
                Reserve
              </ButtonPrimary>
            </div>
          </div>
        </div>
      </main>
      {/* MobileFooterSticky removed: inline reservation component is used instead */}
    </div>
  );
};

export default ListingExperiencesDetailPageDynamic;