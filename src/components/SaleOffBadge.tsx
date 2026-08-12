"use client";

import React, { FC } from "react";
import { useI18n } from "@/i18n/I18nProvider";

export interface SaleOffBadgeProps {
  className?: string;
  desc?: string;
}

const SaleOffBadge: FC<SaleOffBadgeProps> = ({
  className = "",
  desc = "-10% today",
}) => {
  const { t } = useI18n();
  const discountMatch = desc.match(/^-([0-9]+)% today$/);
  return (
    <div
      className={`nc-SaleOffBadge flex items-center justify-center text-xs py-0.5 px-3 bg-red-700 text-red-50 rounded-full ${className}`}
      data-nc-id="SaleOffBadge"
    >
      {discountMatch ? t("common.saleToday", { discount: discountMatch[1] }) : desc}
    </div>
  );
};

export default SaleOffBadge;
