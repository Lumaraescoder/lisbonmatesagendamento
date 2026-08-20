"use client";

import React, { FC } from "react";
import SectionSubscribe2 from "@/components/SectionSubscribe2";
import ContactInfo from "@/shared/ContactInfo";
import Label from "@/components/Label";
import Input from "@/shared/Input";
import Textarea from "@/shared/Textarea";
import ButtonPrimary from "@/shared/ButtonPrimary";
import { useI18n } from "@/i18n/I18nProvider";

export interface PageContactProps { }

const PageContact: FC<PageContactProps> = ({ }) => {
  const { t } = useI18n();
  return (
    <div className={`nc-PageContact overflow-hidden`}>
      <div className="mb-24 lg:mb-32">
        <h2 className="my-16 sm:my-20 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
          {t("common.contactTitle")}
        </h2>
        <div className="container max-w-7xl mx-auto">
          <div className="flex-shrink-0 grid grid-cols-1 sm:grid-cols-2 gap-12 ">
            <div className="max-w-sm space-y-8">
              <div>
                <h3 className="uppercase font-semibold text-sm dark:text-neutral-200 tracking-wider">
                  {t("checkout.fillTourInformation")}
                </h3>
                <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
                  {t("checkout.tripDetailsPlaceholder")}
                </span>
              </div>
              <ContactInfo />
            </div>
            <div>
              <form
                className="grid grid-cols-1 gap-6"
                action="https://formspree.io/f/xgogoyqq"
                method="POST"
              >
                <label className="block">
                  <Label>{t("common.fullName")}</Label>

                  <Input
                    placeholder={String(t("contactPage.fullNamePlaceholder"))}
                    type="text"
                    name="nome"
                    required
                    className="mt-1"
                  />
                </label>
                <label className="block">
                  <Label>{t("common.email")}</Label>

                  <Input
                    type="email"
                    name="email"
                    required
                    placeholder={String(t("contactPage.emailPlaceholder"))}
                    className="mt-1"
                  />
                </label>
                <label className="block">
                  <Label>{t("checkout.phoneNumber")}</Label>

                  <Input
                    type="tel"
                    name="telefone"
                    required
                    placeholder="+351 928 386 233"
                    className="mt-1"
                  />
                </label>
                <label className="block">
                  <Label>{t("common.guests")}</Label>

                  <Input
                    type="number"
                    min={1}
                    max={15}
                    name="pessoas"
                    required
                    placeholder="1"
                    className="mt-1"
                  />
                </label>
                <label className="block">
                  <Label>{t("common.tour")}</Label>

                  <select
                    defaultValue=""
                    name="tour"
                    required
                    className="mt-1 block h-11 w-full rounded-2xl border border-neutral-200 bg-white px-4 text-sm dark:border-neutral-700 dark:bg-neutral-900"
                  >
                    <option value="" disabled>
                      {t("common.tour")}
                    </option>
                    <option>Alfama Tour</option>
                    <option>Chiado &amp; Bairro Alto Tour</option>
                    <option>Belém Tour</option>
                    <option>Lisbon Full Day</option>
                    <option>Miradouros de Lisboa Tour</option>
                    <option>Sintra &amp; Cascais Tour</option>
                    <option>Custom Tour</option>
                  </select>
                </label>
                <label className="block">
                  <Label>{t("common.date")}</Label>

                  <Input type="date" name="data" required className="mt-1" />
                </label>
                <label className="block">
                  <Label>{t("checkout.tripDetailsLabel", undefined, String(t("contactPage.message")))}</Label>

                  <Textarea
                    className="mt-1"
                    name="conteudo_passeio"
                    required
                    rows={6}
                    placeholder={String(t("checkout.tripDetailsPlaceholder"))}
                  />
                </label>
                <div>
                  <ButtonPrimary type="submit">{t("contactPage.sendMessage")}</ButtonPrimary>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>


    </div>
  );
};

export default PageContact;
