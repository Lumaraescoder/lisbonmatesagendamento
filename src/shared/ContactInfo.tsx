"use client";

import React from "react";
import { useI18n } from "@/i18n/I18nProvider";
import SocialsList from "@/shared/SocialsList";

export interface ContactInfoProps {
  className?: string;
}

const ContactInfo: React.FC<ContactInfoProps> = ({ className = "" }) => {
  const { t } = useI18n();

  return (
    <div className={`space-y-5 ${className}`}>
      <div>
        <h3 className="uppercase font-semibold text-sm dark:text-neutral-200 tracking-wider">
          <i className="las la-phone mr-1" aria-hidden="true" />
          {t("common.phone")}
        </h3>
        <a
          href="tel:+351928386233"
          className="block mt-2 text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
        >
          +351 928 386 233
        </a>
      </div>

      <div>
        <h3 className="uppercase font-semibold text-sm dark:text-neutral-200 tracking-wider">
          <i className="las la-envelope mr-1" aria-hidden="true" />
          {t("common.email")}
        </h3>
        <a
          href="mailto:lisbonmates@gmail.com"
          className="block mt-2 text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
        >
          lisbonmates@gmail.com
        </a>
      </div>

      <div>
        <h3 className="uppercase font-semibold text-sm dark:text-neutral-200 tracking-wider">
          {t("common.socials")}
        </h3>
        <SocialsList className="mt-2" showLabels />
      </div>
    </div>
  );
};

export default ContactInfo;
