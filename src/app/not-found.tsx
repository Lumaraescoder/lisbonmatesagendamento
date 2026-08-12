import React from "react";
import I404Png from "@/images/404.png";
import Image from "next/image";
import ButtonPrimary from "@/shared/ButtonPrimary";
import { t, defaultLocale, normalizeLocale, pickLocaleFromAcceptLanguage } from "@/i18n";
import { cookies, headers } from "next/headers";

const Page404 = async () => {
  const cookieStore = await cookies();
  const headerStore = await headers();
  const locale =
    normalizeLocale(cookieStore.get("locale")?.value) ||
    pickLocaleFromAcceptLanguage(headerStore.get("accept-language")) ||
    defaultLocale;
  return (
    <div className="nc-Page404">
      <div className="container relative pt-5 pb-16 lg:pb-20 lg:pt-5">
        <header className="text-center max-w-2xl mx-auto space-y-2">
          <Image src={I404Png} alt="not-found" />
          <span className="block text-sm text-neutral-800 sm:text-base dark:text-neutral-200 tracking-wider font-medium">
            {String(t(locale, "common.pageNotFound"))}{" "}
          </span>
          <div className="pt-8">
            <ButtonPrimary href="/">{String(t(locale, "common.returnHomePage"))}</ButtonPrimary>
          </div>
        </header>
      </div>
    </div>
  );
};

export default Page404;
