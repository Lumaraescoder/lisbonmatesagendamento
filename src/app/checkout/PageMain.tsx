"use client";

import { PencilSquareIcon } from "@heroicons/react/24/outline";
import React, { FC, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Input from "@/shared/Input";
import Label from "@/components/Label";
import Textarea from "@/shared/Textarea";
import ButtonPrimary from "@/shared/ButtonPrimary";
import StartRating from "@/components/StartRating";
import NcModal from "@/shared/NcModal";
import ModalSelectDate from "@/components/ModalSelectDate";
import converSelectedDateToString from "@/utils/converSelectedDateToString";
import ModalSelectGuests from "@/components/ModalSelectGuests";
import Image from "next/image";
import { GuestsObject } from "../(client-components)/type";
import { DEMO_EXPERIENCES_LISTINGS, DEMO_STAY_LISTINGS } from "@/data/listings";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useRouter } from "next/navigation";

export interface CheckOutPagePageMainProps {
  className?: string;
  initialDate?: Date | string | null;
  initialGuests?: GuestsObject;
  initialTime?: string | null;
}

const CheckOutPagePageMain: FC<CheckOutPagePageMainProps> = ({
  className = "",
  initialDate = null,
  initialGuests,
  initialTime = null,
}) => {
  const searchParams = useSearchParams();

  const [startDate, setStartDate] = useState<Date | null>(
    new Date("2026/07/24")
  );
  const [endDate, setEndDate] = useState<Date | null>(new Date("2026/07/24"));

  const [guests, setGuests] = useState<GuestsObject>({
    guestAdults: 2,
    guestChildren: 0,
    guestInfants: 0,
  });

  const [listingImage, setListingImage] = useState<string | null>(null);
  const [listingTitle, setListingTitle] = useState<string | null>(null);
  const [listingSubtitle, setListingSubtitle] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [paymentProcessing, setPaymentProcessing] = useState<boolean>(false);
  const [paymentCompleted, setPaymentCompleted] = useState<boolean>(false);
  const [time, setTime] = useState<string | null>(initialTime || "09:00");
  const [dateInput, setDateInput] = useState<string>(converSelectedDateToString([startDate, endDate]));
  const [hours, setHours] = useState<number>(2);
  const [isReadOnly, setIsReadOnly] = useState<boolean>(false);
  const listingIdParam = (searchParams && (searchParams.get("listingId") || searchParams.get("listing"))) || "";

  async function handleSubmit(e: any) {
    e.preventDefault();
    const formEl = e.currentTarget as HTMLFormElement;
    const fd = new FormData(formEl);
    // append contextual fields
    if (listingIdParam) fd.append("listingId", listingIdParam);
    if (listingTitle) fd.append("listingTitle", listingTitle);
    if (listingImage) fd.append("listingImage", listingImage);
    if (startDate) fd.append("date_iso", startDate.toISOString());
    fd.append("adults", String((guests.guestAdults || 0)));
    fd.append("children", String((guests.guestChildren || 0)));
    fd.append("infants", String((guests.guestInfants || 0)));
    // include visible date string and hours
    if (dateInput) fd.append("date_display", dateInput);
    if (hours) fd.append("hours", String(hours));

    try {
      if (time) fd.append("time", time);
      const res = await fetch("https://formspree.io/f/mrenpbrj", {
        method: "POST",
        body: fd,
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        setSubmitted(true);
      } else {
        console.error("Formspree error", res.status);
        setSubmitted(true);
      }
    } catch (err) {
      console.error(err);
      setSubmitted(true);
    }
  }

  useEffect(() => {
    // Props override
    if (initialDate) {
      const d = typeof initialDate === "string" ? new Date(initialDate) : initialDate;
      if (d instanceof Date && !isNaN(d.getTime())) {
        setStartDate(d);
        setEndDate(d);
      }
    }

    // sync visible date input when start/end date change
    setDateInput(converSelectedDateToString([startDate, endDate]));

    if (initialGuests) {
      setGuests(initialGuests);
    }

    // Query params override (highest precedence)
    if (searchParams) {
      const timeParam = searchParams.get("time") || searchParams.get("horario");
    const dateParam = searchParams.get("date") || searchParams.get("start");
      const endParam = searchParams.get("end");
      const adults = parseInt(searchParams.get("adults") || "", 10);
      const children = parseInt(searchParams.get("children") || "", 10);
      const infants = parseInt(searchParams.get("infants") || "", 10);
    const listingId = searchParams.get("listingId") || searchParams.get("listing");

      if (dateParam) {
        const sd = new Date(dateParam);
        if (!isNaN(sd.getTime())) {
          setStartDate(sd);
          setEndDate(endParam ? new Date(endParam) : sd);
        }
      }

      if (!isNaN(adults)) {
        setGuests((g) => ({ ...g, guestAdults: adults }));
      }
      if (!isNaN(children)) {
        setGuests((g) => ({ ...g, guestChildren: children }));
      }
      if (!isNaN(infants)) {
        setGuests((g) => ({ ...g, guestInfants: infants }));
      }

      if (listingId) {
        const all = [...DEMO_EXPERIENCES_LISTINGS, ...DEMO_STAY_LISTINGS];
        const found = all.find((it) => it.id === listingId || it.href?.endsWith(`/${listingId}`));
        if (found) {
          setListingTitle(found.title || null);
          setListingSubtitle(found.author?.displayName || null);
          const img = (found.gallery && found.gallery[0] && (found.gallery[0].src as any)) || found.featuredImage || null;
          setListingImage(img || null);
        }
      }
      if (timeParam) {
        setTime(timeParam);
      }
      // If any reservation context exists from query params or initial props, make some fields read-only
      const adultsParam = searchParams.get("adults");
      const hasPrefill = Boolean(listingId || dateParam || timeParam || adultsParam || initialDate || initialGuests);
      setIsReadOnly(hasPrefill);
    }
  }, [initialDate, initialGuests, searchParams]);

  const router = useRouter();

  // compute amount from listing when possible
  const computeAmount = () => {
    try {
      const listingId = searchParams ? (searchParams.get("listingId") || searchParams.get("listing")) : null;
      if (!listingId) return 1.0;
      const all = [...DEMO_EXPERIENCES_LISTINGS, ...DEMO_STAY_LISTINGS];
      const found = all.find((it) => it.id === listingId || it.href?.endsWith(`/${listingId}`));
      if (!found) return 1.0;
      const rawPrice = (found.price || "").toString();
      const priceNum = parseFloat((rawPrice.match(/[0-9]+(\.[0-9]+)?/) || ["0"])[0]) || 0;
      const isFixed = /fixed/i.test(rawPrice);
      const payableGuests = (guests.guestAdults || 0) + (guests.guestChildren || 0);
      const amount = isFixed ? priceNum : Math.max(1, priceNum * Math.max(1, payableGuests));
      return Number(amount.toFixed(2));
    } catch (err) {
      return 1.0;
    }
  };

  const renderSidebar = () => {
    return (
      <div className="w-full flex flex-col sm:rounded-2xl lg:border border-neutral-200 dark:border-neutral-700 space-y-6 sm:space-y-8 px-0 sm:p-6 xl:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center">
          <div className="flex-shrink-0 w-full sm:w-40">
            <div className="aspect-w-4 aspect-h-3 sm:aspect-h-4 rounded-2xl overflow-hidden">
              <Image
                alt={listingTitle || ""}
                fill
                sizes="200px"
                src={listingImage || "https://images.pexels.com/photos/6373478/pexels-photo-6373478.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"}
              />
            </div>
          </div>
          <div className="py-5 sm:px-5 space-y-3">
            <div>
              <span className="text-sm text-neutral-500 dark:text-neutral-400 line-clamp-1">
                {listingSubtitle || ""}
              </span>
              <span className="text-base font-medium mt-1 block">
                {listingTitle || "Listing"}
              </span>
            </div>
            <div className="w-10 border-b border-neutral-200 dark:border-neutral-700"></div>
            <StartRating />
          </div>
        </div>
        <div className="flex flex-col space-y-4">
          <h3 className="text-2xl font-semibold">Your reservation details</h3>
          <div className="flex justify-between text-neutral-6000 dark:text-neutral-300">
            <span>Date:</span>
            <span>{converSelectedDateToString([startDate, endDate])}</span>
          </div>
          <div className="flex justify-between text-neutral-6000 dark:text-neutral-300">
            <span>People:</span>
            <span>{`${(guests.guestAdults || 0) + (guests.guestChildren || 0)} people`}</span>
          </div>

          <div className="border-b border-neutral-200 dark:border-neutral-700"></div>
          <div className="flex justify-between font-semibold">
            <span>Total</span>
            <span>On request</span>
          </div>
        </div>
      </div>
    );
  };

  const renderMain = () => {
    return (
      <div className="w-full flex flex-col sm:rounded-2xl sm:border border-neutral-200 dark:border-neutral-700 space-y-8 px-0 sm:p-6 xl:p-8">
        <h2 className="text-3xl lg:text-4xl font-semibold">Confirm and payment</h2>
        <div className="border-b border-neutral-200 dark:border-neutral-700"></div>
        <div>
          <div>
            <h3 className="text-2xl font-semibold">Your trip</h3>
            <NcModal
              renderTrigger={(openModal) => (
                <span
                  onClick={() => openModal()}
                  className="block lg:hidden underline mt-1 cursor-pointer"
                >
                  View booking details
                </span>
              )}
              renderContent={renderSidebar}
              modalTitle="Booking details"
            />
          </div>
          <div className="mt-6 border border-neutral-200 dark:border-neutral-700 rounded-3xl flex flex-col sm:flex-row divide-y sm:divide-x sm:divide-y-0 divide-neutral-200 dark:divide-neutral-700 overflow-hidden z-10">
            <ModalSelectDate
              renderChildren={({ openModal }) => (
                isReadOnly ? (
                  <div
                    className="text-left flex-1 p-5 flex justify-between space-x-5 bg-neutral-50 dark:bg-neutral-900"
                    role="button"
                    aria-disabled
                  >
                    <div className="flex flex-col">
                      <span className="text-sm text-neutral-400">Date</span>
                      <span className="mt-1.5 text-lg font-semibold text-neutral-600">
                        {converSelectedDateToString([startDate, endDate])}
                      </span>
                    </div>
                    <PencilSquareIcon className="w-6 h-6 text-neutral-300" />
                  </div>
                ) : (
                  <button
                    onClick={openModal}
                    className="text-left flex-1 p-5 flex justify-between space-x-5 hover:bg-neutral-50 dark:hover:bg-neutral-800"
                    type="button"
                  >
                    <div className="flex flex-col">
                      <span className="text-sm text-neutral-400">Date</span>
                      <span className="mt-1.5 text-lg font-semibold">
                        {converSelectedDateToString([startDate, endDate])}
                      </span>
                    </div>
                    <PencilSquareIcon className="w-6 h-6 text-neutral-6000 dark:text-neutral-400" />
                  </button>
                )
              )}
            />

            <ModalSelectGuests
              renderChildren={({ openModal }) => (
                isReadOnly ? (
                  <div className="text-left flex-1 p-5 flex justify-between space-x-5 bg-neutral-50 dark:bg-neutral-900" aria-disabled>
                    <div className="flex flex-col">
                      <span className="text-sm text-neutral-400">Guests</span>
                      <span className="mt-1.5 text-lg font-semibold">
                        <span className="line-clamp-1 text-neutral-600">
                          {`${(guests.guestAdults || 0) + (guests.guestChildren || 0)} Guests, ${guests.guestInfants || 0} Infants`}
                        </span>
                      </span>
                    </div>
                    <PencilSquareIcon className="w-6 h-6 text-neutral-300" />
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={openModal}
                    className="text-left flex-1 p-5 flex justify-between space-x-5 hover:bg-neutral-50 dark:hover:bg-neutral-800"
                  >
                    <div className="flex flex-col">
                      <span className="text-sm text-neutral-400">Guests</span>
                      <span className="mt-1.5 text-lg font-semibold">
                        <span className="line-clamp-1">
                          {`${(guests.guestAdults || 0) + (guests.guestChildren || 0)} Guests, ${guests.guestInfants || 0} Infants`}
                        </span>
                      </span>
                    </div>
                    <PencilSquareIcon className="w-6 h-6 text-neutral-6000 dark:text-neutral-400" />
                  </button>
                )
              )}
            />
          </div>
        </div>

        <div>
          {!submitted ? (
            <>
              <h3 className="text-2xl font-semibold">Fill in tour information</h3>
              <div className="w-14 border-b border-neutral-200 dark:border-neutral-700 my-5"></div>
              <form onSubmit={handleSubmit} className="space-y-6">
              <input type="hidden" name="listingId" value={listingIdParam} />
              <input type="hidden" name="listingTitle" value={listingTitle || ""} />
              <input type="hidden" name="listingImage" value={listingImage || ""} />
              <input type="hidden" name="date_iso" value={startDate ? startDate.toISOString() : ""} />
              <input type="hidden" name="adults" value={String(guests.guestAdults || 0)} />
              <input type="hidden" name="children" value={String(guests.guestChildren || 0)} />
              <input type="hidden" name="infants" value={String(guests.guestInfants || 0)} />
              {/* keep action attr for noscript fallback */}
              <noscript>
                <form action="https://formspree.io/f/mrenpbrj" method="POST"></form>
              </noscript>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1">
                <Label>Date *</Label>
                <Input
                  type="text"
                  name="date"
                  value={dateInput}
                  onChange={(e) => setDateInput(e.target.value)}
                  required
                  disabled={isReadOnly}
                  readOnly={isReadOnly}
                  className={isReadOnly ? "bg-neutral-100 text-neutral-500 cursor-not-allowed" : ""}
                />
              </div>
              <div className="space-y-1">
                <Label>Time *</Label>
                <select
                  name="time"
                  required
                  value={time || ""}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full px-4 py-3 border rounded-md"
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
              </div>
            </div>

            <div className="space-y-1">
              <Label>Hours *</Label>
              <select
                name="hours"
                required
                value={String(hours)}
                onChange={(e) => setHours(Number(e.target.value))}
                className="w-full px-4 py-3 border rounded-md"
              >
                {Array.from({ length: 8 }).map((_, i) => {
                  const val = i + 1;
                  return (
                    <option key={val} value={String(val)}>
                      {val} {val === 1 ? "hour" : "hours"}
                    </option>
                  );
                })}
              </select>
            </div>

            <div className="space-y-1">
              <Label>Full name *</Label>
              <Input type="text" name="name" placeholder="Your name" required />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1">
                <Label>Email *</Label>
                <Input type="email" name="email" placeholder="you@example.com" required />
              </div>
              <div className="space-y-1">
                <Label>Phone *</Label>
                <Input type="tel" name="phone" placeholder="+351..." required />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1">
                <Label>Country</Label>
                <Input type="text" name="country" placeholder="Portugal" />
              </div>
              <div className="space-y-1">
                <Label>City</Label>
                <Input type="text" name="city" placeholder="Lisbon" />
              </div>
            </div>

            <div className="space-y-1">
              <Label>Hotel or pickup point (you can choose later)</Label>
              <Input type="text" name="pickup_point" placeholder="Address or hotel name" />
            </div>

            <div className="space-y-1">
              <Label>Trip details</Label>
              <Textarea name="trip_details" placeholder="Any detail or special request for your trip?" />
            </div>

              <div className="pt-4">
                <ButtonPrimary type="submit" className="w-full md:w-auto bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-xl font-medium">
                  Next
                </ButtonPrimary>
              </div>
            </form>
            </>
          ) : (
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold">Reservation received</h3>
              <div className="text-neutral-600">Your reservation request was submitted. Proceed to payment.</div>
              <div className="pt-4">
                <PayPalScriptProvider
                  options={{
                    "client-id": process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "test",
                    currency: "USD",
                    locale: "en_US",
                    intent: "capture",
                  }}
                >
                  <div>
                    <PayPalButtons
                      style={{ layout: "vertical" }}
                      forceReRender={[computeAmount(), time]}
                      createOrder={async (_data, actions) => {
                        const amount = computeAmount();
                        return actions.order.create({
                          purchase_units: [
                            {
                              amount: { value: String(amount) },
                            },
                          ],
                        });
                      }}
                      onApprove={async (_data, actions) => {
                        setPaymentProcessing(true);
                        if (!actions || !actions.order) return;
                        const details = await actions.order.capture();
                        setPaymentProcessing(false);
                        setPaymentCompleted(true);
                        // redirect after successful capture
                        if (typeof window !== "undefined") {
                          window.location.href = "/pay-done";
                        }
                      }}
                      onError={(err) => {
                        console.error("PayPal error", err);
                      }}
                    />
                  </div>
                </PayPalScriptProvider>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className={`nc-CheckOutPagePageMain ${className}`}>
      <main className="container mt-11 mb-24 lg:mb-32 flex flex-col-reverse lg:flex-row">
        <div className="w-full lg:w-3/5 xl:w-2/3 lg:pr-10 ">{renderMain()}</div>
        <div className="hidden lg:block flex-grow">{renderSidebar()}</div>
      </main>
    </div>
  );
};

export default CheckOutPagePageMain;
