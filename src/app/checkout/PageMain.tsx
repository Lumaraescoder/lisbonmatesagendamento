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
import { calculateTourAmount } from "@/utils/bookingPricing";
import { useI18n } from "@/i18n/I18nProvider";

export interface CheckOutPagePageMainProps {
  className?: string;
  initialDate?: Date | string | null;
  initialGuests?: GuestsObject;
  initialTime?: string | null;
  initialHours?: number | null;
}

const CheckOutPagePageMain: FC<CheckOutPagePageMainProps> = ({
  className = "",
  initialDate = null,
  initialGuests,
  initialTime = null,
  initialHours = null,
}) => {
  const { t, locale } = useI18n();
  const searchParams = useSearchParams();

  const [startDate, setStartDate] = useState<Date | null>(
    new Date("2026/07/24")
  );
  const [endDate, setEndDate] = useState<Date | null>(new Date("2026/07/24"));

  const [guests, setGuests] = useState<GuestsObject>({
    guestAdults: 0,
    guestChildren: 0,
    guestInfants: 0,
  });
  const [guestError, setGuestError] = useState<string | null>(null);

  const [listingImage, setListingImage] = useState<string | null>(null);
  const [listingTitle, setListingTitle] = useState<string | null>(null);
  const [listingSubtitle, setListingSubtitle] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [paymentProcessing, setPaymentProcessing] = useState<boolean>(false);
  const [successModalOpen, setSuccessModalOpen] = useState<boolean>(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [paidOrderId, setPaidOrderId] = useState<string | null>(null);
  const [time, setTime] = useState<string | null>(initialTime || "09:00");
  const [dateInput, setDateInput] = useState<string>(converSelectedDateToString([startDate, endDate]));
  const [hours, setHours] = useState<number>(2);
  const paypalClientId = typeof process !== 'undefined' ? process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || (process.env.NODE_ENV !== 'production' ? 'sb' : '') : '';
  const isPaypalClientIdValid = typeof paypalClientId === 'string' && paypalClientId.trim().length > 0;
  const [isReadOnly, setIsReadOnly] = useState<boolean>(false);
  const listingIdParam = (searchParams && (searchParams.get("listingId") || searchParams.get("listing"))) || "";

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const totalGuests = (guests.guestAdults || 0) + (guests.guestChildren || 0);
    if (totalGuests < 1) {
      setGuestError(String(t("checkout.pleaseSelectPeople")));
      setSubmitted(false);
      return;
    }

    setGuestError(null);
    setPaymentError(null);
    setSubmitted(true);
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

    if (typeof initialHours === "number" && !isNaN(initialHours)) {
      setHours(initialHours);
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
  }, [initialDate, initialGuests, initialHours, searchParams]);

  // compute amount from listing when possible
  const computeAmount = () => {
    return calculateTourAmount({
      adults: guests.guestAdults || 0,
      children: guests.guestChildren || 0,
      hours,
    });
  };

  const totalPayableGuests = (guests.guestAdults || 0) + (guests.guestChildren || 0);

  const getErrorMessage = (error: unknown, fallback: string) => {
    if (error instanceof Error && error.message) return error.message;
    if (typeof error === "string" && error) return error;
    try {
      return JSON.stringify(error);
    } catch {
      return fallback;
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
          <h3 className="text-2xl font-semibold">{t("checkout.yourReservationDetails")}</h3>
          <div className="flex justify-between text-neutral-6000 dark:text-neutral-300">
            <span>{t("common.date")}:</span>
            <span>{converSelectedDateToString([startDate, endDate])}</span>
          </div>
          <div className="flex justify-between text-neutral-6000 dark:text-neutral-300">
            <span>{t("common.people")}:</span>
            <span>{`${(guests.guestAdults || 0) + (guests.guestChildren || 0)} ${t("common.persons")}`}</span>
          </div>

          <div className="border-b border-neutral-200 dark:border-neutral-700"></div>
          <div className="flex flex-col space-y-2">
            <div className="flex justify-between font-semibold">
              <span>{t("common.total")}</span>
              <span>{new Intl.NumberFormat(locale === "en" ? "en-GB" : locale, { style: "currency", currency: "EUR" }).format(computeAmount())}</span>
            </div>
            <div className="flex justify-between text-sm text-neutral-500">
              <span>{t("common.breakdown")}</span>
              <span>
                {(() => {
                  const total = computeAmount();
                  const unit = Number((total / Math.max(1, hours)).toFixed(2));
                  return `${new Intl.NumberFormat(locale === "en" ? "en-GB" : locale, { style: "currency", currency: "EUR" }).format(unit)} / h × ${hours}h`;
                })()}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderMain = () => {
    return (
      <div className="w-full flex flex-col sm:rounded-2xl sm:border border-neutral-200 dark:border-neutral-700 space-y-8 px-0 sm:p-6 xl:p-8">
        <h2 className="text-3xl lg:text-4xl font-semibold">{t("checkout.confirmAndPayment")}</h2>
        <div className="border-b border-neutral-200 dark:border-neutral-700"></div>
        <div>
          <div>
            <h3 className="text-2xl font-semibold">{t("checkout.yourTrip")}</h3>
            <NcModal
              renderTrigger={(openModal) => (
                <span
                  onClick={() => openModal()}
                  className="block lg:hidden underline mt-1 cursor-pointer"
                >
                  {t("checkout.viewBookingDetails")}
                </span>
              )}
              renderContent={renderSidebar}
              modalTitle={String(t("common.bookingDetails"))}
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
                      <span className="text-sm text-neutral-400">{t("common.date")}</span>
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
                      <span className="text-sm text-neutral-400">{t("common.date")}</span>
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
              value={guests}
              onSave={(data) => {
                setGuests({
                  guestAdults: data.guestAdults || 0,
                  guestChildren: data.guestChildren || 0,
                  guestInfants: data.guestInfants || 0,
                });
                setSubmitted(false);
                setGuestError(null);
                setPaymentError(null);
              }}
              renderChildren={({ openModal }) => (
                isReadOnly ? (
                  <div className="text-left flex-1 p-5 flex justify-between space-x-5 bg-neutral-50 dark:bg-neutral-900" aria-disabled>
                    <div className="flex flex-col">
                      <span className="text-sm text-neutral-400">{t("common.guests")}</span>
                      <span className="mt-1.5 text-lg font-semibold">
                        <span className="line-clamp-1 text-neutral-600 dark:text-neutral-300">
                          {totalPayableGuests > 0 ? `${totalPayableGuests} ${t("common.guests")}` : t("common.noGuestsSelected")}
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
                      <span className="text-sm text-neutral-400">{t("common.guests")}</span>
                      <span className="mt-1.5 text-lg font-semibold">
                        <span className="line-clamp-1">
                          {totalPayableGuests > 0 ? `${totalPayableGuests} ${t("common.guests")}` : t("common.selectGuests")}
                        </span>
                      </span>
                    </div>
                    <PencilSquareIcon className="w-6 h-6 text-neutral-6000 dark:text-neutral-400" />
                  </button>
                )
              )}
            />
          </div>
          {guestError && <p className="mt-3 text-sm text-red-600">{guestError}</p>}
        </div>

        <div>
          {!submitted ? (
            <>
              <h3 className="text-2xl font-semibold">{t("checkout.fillTourInformation")}</h3>
              <div className="w-14 border-b border-neutral-200 dark:border-neutral-700 my-5"></div>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <Label>{t("common.date")} *</Label>
                    <Input
                      type="text"
                      name="date"
                      value={dateInput}
                      onChange={(e) => {
                        setDateInput(e.target.value);
                        setSubmitted(false);
                        setPaymentError(null);
                      }}
                      required
                      disabled={isReadOnly}
                      readOnly={isReadOnly}
                      className={isReadOnly ? "bg-neutral-100 text-neutral-500 cursor-not-allowed" : ""}
                    />
                  </div>
                  <div className="space-y-1">
                    <Label>{t("common.time")} *</Label>
                    <select
                      name="time"
                      required
                      value={time || ""}
                      onChange={(e) => {
                        setTime(e.target.value);
                        setSubmitted(false);
                        setPaymentError(null);
                      }}
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
                  <Label>{t("common.hoursLabel")} *</Label>
                  <select
                    name="hours"
                    required
                    value={String(hours)}
                    onChange={(e) => {
                      setHours(Number(e.target.value));
                      setSubmitted(false);
                      setPaymentError(null);
                    }}
                    className="w-full px-4 py-3 border rounded-md"
                  >
                    {Array.from({ length: 6 }).map((_, i) => {
                      const val = i + 1;
                      return (
                        <option key={val} value={String(val)}>
                          {val} {val === 1 ? t("common.hour") : t("common.hours")}
                        </option>
                      );
                    })}
                  </select>
                </div>

                <div className="space-y-1">
                  <Label>{t("common.fullName")} *</Label>
                  <Input type="text" name="name" placeholder={String(t("checkout.yourName"))} required />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <Label>{t("common.email")} *</Label>
                    <Input type="email" name="email" placeholder="you@example.com" required />
                  </div>
                  <div className="space-y-1">
                    <Label>{t("common.phone")} *</Label>
                    <Input type="tel" name="phone" placeholder={String(t("checkout.phoneNumber"))} required />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <Label>{t("common.country")}</Label>
                    <Input type="text" name="country" placeholder={String(t("checkout.writeYourCountry"))} />
                  </div>
                  <div className="space-y-1">
                    <Label>{t("common.city")}</Label>
                    <Input type="text" name="city" placeholder={String(t("checkout.writeYourCity"))} />
                  </div>
                </div>

                <div className="space-y-1">
                  <Label>{t("checkout.pickupPointLabel")}</Label>
                  <Input type="text" name="pickup_point" placeholder={String(t("checkout.pickupPointPlaceholder"))} />
                </div>

                <div className="space-y-1">
                  <Label>{t("checkout.tripDetailsLabel")}</Label>
                  <Textarea name="trip_details" placeholder={String(t("checkout.tripDetailsPlaceholder"))} />
                </div>

                <div className="pt-4">
                  <ButtonPrimary type="submit" className="w-full md:w-auto bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-xl font-medium">
                    {t("common.next")}
                  </ButtonPrimary>
                </div>
              </form>
            </>
          ) : (
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold">{t("common.payment")}</h3>
              <div className="text-neutral-600 dark:text-neutral-300">
                {t("checkout.yourDetailsComplete")}
              </div>
              {paymentError && (
                <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {paymentError}
                </div>
              )}
              {paymentProcessing && (
                <div className="rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm text-neutral-700">
                  {t("common.confirmingPaypal")}
                </div>
              )}
              <div className="pt-4">
                {isPaypalClientIdValid ? (
                  <PayPalScriptProvider
                    options={{
                      "client-id": paypalClientId,
                      currency: "EUR",
                      locale: locale === "pt" ? "pt-PT" : locale === "es" ? "es-ES" : locale === "fr" ? "fr-FR" : locale === "de" ? "de-DE" : locale === "it" ? "it-IT" : "en-US",
                      intent: "capture",
                    }}
                  >
                    <div>
                      <PayPalButtons
                        style={{ layout: "vertical" }}
                        forceReRender={[computeAmount(), time]}
                        createOrder={async () => {
                          const res = await fetch('/api/paypal/create-order', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                              bookingData: {
                                listingId: listingIdParam,
                                tourTitle: listingTitle || String(t("common.tour")),
                                adults: guests.guestAdults || 0,
                                children: guests.guestChildren || 0,
                                infants: guests.guestInfants || 0,
                                persons: totalPayableGuests,
                                date: dateInput,
                                hours,
                                time: time || '',
                              },
                            }),
                          });
                          const data = await res.json();
                          if (!res.ok) {
                            const message = data?.details || data?.error || t("checkout.paypalCreateOrderError");
                            setPaymentError(typeof message === 'string' ? message : String(t("checkout.paypalCreateOrderError")));
                            throw new Error(data?.error || String(t("checkout.paypalCreateOrderError")));
                          }
                          const orderId = data.orderId || data.id;
                          if (!orderId) throw new Error('No order ID returned from server');
                          return orderId;
                        }}
                        onApprove={async (data) => {
                          setPaymentProcessing(true);
                          try {
                            const orderID = (data as any)?.orderID;
                            if (!orderID) throw new Error(String(t("checkout.paypalOrderIdMissing")));
                            const captureRes = await fetch('/api/paypal/capture-order', {
                              method: 'POST',
                              headers: { 'Content-Type': 'application/json' },
                              body: JSON.stringify({ orderID }),
                            });
                            const captureData = await captureRes.json();
                            if (!captureRes.ok || captureData?.status !== 'COMPLETED') {
                              const details = captureData?.details || captureData?.error || t("checkout.paypalPaymentIncomplete");
                              throw new Error(typeof details === 'string' ? details : JSON.stringify(details));
                            }
                            setPaidOrderId(orderID);
                            setSuccessModalOpen(true);
                          } catch (err) {
                            console.error('PayPal capture error', err);
                            setPaymentError(err instanceof Error ? err.message : String(t("checkout.paypalCaptureFailed")));
                          } finally {
                            setPaymentProcessing(false);
                          }
                        }}
                        onError={(err) => {
                          console.error("PayPal error", err);
                          setPaymentError(getErrorMessage(err, String(t("checkout.paypalPaymentFailed"))));
                        }}
                      />
                    </div>
                  </PayPalScriptProvider>
                ) : (
                  <div className="rounded-xl border border-yellow-200 bg-yellow-50 px-4 py-3 text-sm text-yellow-700">
                    {t("common.payPalConfigMissing")}
                    {process.env.NODE_ENV === 'production' && typeof window !== 'undefined' && (function logMissing() {
                      try {
                        console.error('Missing or empty NEXT_PUBLIC_PAYPAL_CLIENT_ID in production build. PayPal SDK will not be initialized and PayPal Buttons will not render.');
                      } catch (e) { }
                      return null;
                    })()}
                  </div>
                )}
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
      <NcModal
        isOpenProp={successModalOpen}
        onCloseModal={() => setSuccessModalOpen(false)}
        renderTrigger={() => null}
        modalTitle={String(t("common.paymentConfirmed"))}
        contentExtraClass="max-w-lg"
        renderContent={() => (
          <div className="space-y-5 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-3xl text-green-700">
              ✓
            </div>
            <div>
              <h3 className="text-xl font-semibold">{t("common.bookingPaymentSuccessful")}</h3>
              <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-300">
                {t("common.bookingPaymentConfirmedText")}
              </p>
            </div>
            <div className="space-y-2 rounded-xl bg-neutral-50 p-4 text-left text-sm dark:bg-neutral-900">
              <div className="flex justify-between gap-4">
                <span className="text-neutral-500">{t("common.tour")}</span>
                <span className="font-medium text-right">{listingTitle || t("common.tour")}</span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-neutral-500">{t("common.date")}</span>
                <span className="font-medium text-right">{dateInput}</span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-neutral-500">{t("common.time")}</span>
                <span className="font-medium text-right">{time}</span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-neutral-500">{t("common.guests")}</span>
                <span className="font-medium text-right">{totalPayableGuests}</span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-neutral-500">{t("common.total")}</span>
                <span className="font-medium text-right">
                  {new Intl.NumberFormat(locale === "en" ? "en-GB" : locale, { style: "currency", currency: "EUR" }).format(computeAmount())}
                </span>
              </div>
              {paidOrderId && (
                <div className="flex justify-between gap-4">
                  <span className="text-neutral-500">{t("common.paypalOrder")}</span>
                  <span className="font-medium text-right">{paidOrderId}</span>
                </div>
              )}
            </div>
            <ButtonPrimary href="/">{t("common.done")}</ButtonPrimary>
          </div>
        )}
      />
    </div>
  );
};

export default CheckOutPagePageMain;
