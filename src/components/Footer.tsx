"use client";

import Logo from "@/shared/Logo";
import SocialsList1 from "@/shared/SocialsList1";
import { CustomLink } from "@/data/types";
import React from "react";

const HEADER_LINKS: CustomLink[] = [
  { href: "/", label: "Home" },
  { href: "/listing-experiences", label: "Tours" },
  { href: "/testimonials", label: "Testimonials" },
  { href: "/contact", label: "Contact" },
];

const Footer: React.FC = () => {
  return (
    <div className="nc-Footer relative py-24 lg:py-28 border-t border-neutral-200 dark:border-neutral-700">
      <div className="container grid grid-cols-1 md:grid-cols-2 gap-y-12 gap-x-5 sm:gap-x-8 items-center">
        {/* Coluna 1: Logo e Redes Sociais */}
        <div className="col-span-1 flex flex-col space-y-6 md:items-start items-center">
          <Logo className="w-40" imgClassName="max-h-28" />
          <SocialsList1 className="flex items-center space-x-4" />
        </div>

        {/* Coluna 2: Links */}
        <div className="col-span-1 flex flex-col md:items-end items-center text-base md:pr-10">
          <div className="flex flex-col md:items-start items-center">
            <h2 className="font-semibold text-neutral-700 dark:text-neutral-200">Links</h2>
            <ul className="mt-5 space-y-4 text-center md:text-left">
              {HEADER_LINKS.map((item, index) => (
                <li key={index}>
                  <a
                    className="text-neutral-6000 dark:text-neutral-300 hover:text-black dark:hover:text-white transition-colors"
                    href={item.href}
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