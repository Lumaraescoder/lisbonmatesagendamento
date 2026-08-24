import { Poppins } from "next/font/google";
import type { Metadata } from "next";
import SiteHeader from "./(client-components)/(Header)/SiteHeader";
import ClientCommons from "./ClientCommons";
import "./globals.css";
import "@/fonts/line-awesome-1.3.0/css/line-awesome.css";
import "@/styles/index.scss";
import "rc-slider/assets/index.css";
import Footer from "@/components/Footer";
import { I18nProvider } from "@/i18n/I18nProvider";
import { defaultLocale, normalizeLocale, pickLocaleFromAcceptLanguage } from "@/i18n";
import { cookies, headers } from "next/headers";

export const metadata: Metadata = {
  title: "Tuk Tuk Tour in Lisbon | Lisbon Mates",
  description:
    "Discover Lisbon on a private electric tuk tuk tour with local guides. Explore Alfama, Belém, viewpoints, and more with Lisbon Mates.",
  keywords: [
    "tuk tuk tour in Lisbon",
    "Lisbon tuk tuk tour",
    "tuk tuk tours Lisbon",
    "private tuk tuk tour Lisbon",
    "electric tuk tuk Lisbon",
    "Lisbon sightseeing tour",
    "Alfama tuk tuk tour",
    "Belém tuk tuk tour",
    "Lisbon Mates",
  ],
  robots: {
    index: true,
    follow: true,
  },
};

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: any;
}) {
  const cookieStore = cookies();
  const headerStore = headers();
  const initialLocale =
    normalizeLocale(cookieStore.get("locale")?.value) ||
    pickLocaleFromAcceptLanguage(headerStore.get("accept-language")) ||
    defaultLocale;

  return (
    <html lang={initialLocale} className={poppins.className}>
      <body className="bg-white text-base dark:bg-neutral-900 text-neutral-900 dark:text-neutral-200">
        <I18nProvider initialLocale={initialLocale}>
          <ClientCommons />
          <SiteHeader />
          {children}
          <Footer />
        </I18nProvider>
      </body>
    </html>
  );
}
