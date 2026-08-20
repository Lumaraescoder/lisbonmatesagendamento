"use client";

import Logo from "@/shared/Logo";
import ContactInfo from "@/shared/ContactInfo";
import { CustomLink } from "@/data/types";
import React from "react";
import { useI18n } from "@/i18n/I18nProvider";
import { usePathname } from "next/navigation";

const Footer: React.FC = () => {
  const { t } = useI18n();
  const pathname = usePathname();
  const headerLinks: CustomLink[] = [
    { href: "/#hero", label: t("common.home") },
    { href: "/#tours", label: t("common.tours") },
    { href: "/contact", label: t("common.contact") },
  ];

  return (
    <div className="nc-Footer relative py-24 lg:py-28 border-t border-neutral-200 dark:border-neutral-700">
      <div className="container grid grid-cols-1 md:grid-cols-2 gap-y-12 gap-x-5 sm:gap-x-8 items-start">
        {/* Coluna 1: Logo e Redes Sociais */}
        <div className="col-span-1 flex justify-center md:justify-start">
          <div className="w-[255px] flex flex-col items-center md:items-start space-y-6">
            <Logo className="w-40 md:-ml-5" imgClassName="max-h-28" />
            <ContactInfo className="text-center md:text-left [&_.nc-SocialsList]:justify-center md:[&_.nc-SocialsList]:justify-start" />
          </div>
        </div>

        {/* Coluna 2: Links */}
        <div className="col-span-1 flex justify-center md:justify-end text-base md:pr-10 md:pt-8">
          <div className="w-[255px] flex flex-col items-center md:items-start">
            <h2 className="font-semibold text-neutral-700 dark:text-neutral-200">{t("common.links")}</h2>
            <ul className="mt-5 space-y-4 text-center md:text-left">
              {headerLinks.map((item, index) => (
                <li key={index}>
                  <a
                    className="text-neutral-6000 dark:text-neutral-300 hover:text-black dark:hover:text-white transition-colors"
                    href={item.href}
                    onClick={(event) => {
                      if (item.href === "/#hero" && pathname === "/") {
                        event.preventDefault();
                        document.getElementById("hero")?.scrollIntoView({ behavior: "smooth" });
                      }
                    }}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
