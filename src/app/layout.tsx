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

const lisbonMatesStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "TravelAgency",
      "@id": "#business",
      name: "Lisbon Mates",
      alternateName: "Lisbon Mates Tuk Tuk Tours",
      description:
        "Private electric tuk tuk tours through Lisbon's historic neighborhoods, landmarks, and panoramic viewpoints with local guides.",
      priceRange: "€€",
      telephone: "+351928386233",
      email: "lisbonmates@gmail.com",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Lisbon",
        addressRegion: "Lisbon",
        addressCountry: "PT",
      },
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
          ],
          opens: "09:00",
          closes: "21:00",
        },
      ],
      sameAs: [
        "https://www.instagram.com/lisbonmates/",
        "https://www.tripadvisor.com/Attraction_Review-g189158-d27982309-Reviews-Lisbonmates_Tuk_tuk_Experience-Lisbon_Lisbon_District_Central_Portugal.html",
      ],
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+351928386233",
        email: "lisbonmates@gmail.com",
        contactType: "customer service",
        areaServed: "PT",
        availableLanguage: [
          "Portuguese",
          "English",
          "Italian",
          "German",
          "French",
          "Spanish",
        ],
      },
    },
  ],
};

export const metadata: Metadata = {
  title: "Tuk Tuk Tour in Lisbon | Lisbon Mates",
  description:
    "Discover Lisbon on a private electric tuk tuk tour with local guides. Explore Alfama, Belém, viewpoints, and more with Lisbon Mates.",
  keywords: [
    "tuk tuk tour in Lisbon",
    "Lisbon tuk tuk tour",
    "tuk tuk tours Lisbon",
    "Lisbon tuk tuk tours",
    "tuk tuk Lisbon",
    "tuk tuk tour Lisbon Portugal",
    "private tuk tuk tour Lisbon",
    "guided tuk tuk tour Lisbon",
    "electric tuk tuk Lisbon",
    "electric tuk tuk tour Lisbon",
    "Lisbon sightseeing tour",
    "Lisbon city tour",
    "Lisbon guided tours",
    "things to do in Lisbon",
    "Alfama tuk tuk tour",
    "Alfama tour Lisbon",
    "Belém tuk tuk tour",
    "Belém tour Lisbon",
    "Lisbon viewpoints tour",
    "eco friendly tours Lisbon",
    "passeio de tuk tuk Lisboa",
    "tour de tuk tuk Lisboa",
    "passeios tuk tuk Lisboa",
    "tour privado Lisboa",
    "visita guiada Lisboa",
    "Lisbon Mates",
  ],
  robots: {
    index: true,
    follow: true,
  },
  applicationName: "Lisbon Mates",
  authors: [{ name: "Lisbon Mates" }],
  creator: "Lisbon Mates",
  publisher: "Lisbon Mates",
  category: "Travel & Tourism",
  referrer: "origin-when-cross-origin",
  formatDetection: {
    telephone: false,
    email: false,
    address: false,
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
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(lisbonMatesStructuredData),
          }}
        />
      </head>
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
