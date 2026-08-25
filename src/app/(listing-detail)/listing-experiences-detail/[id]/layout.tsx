import type { Metadata } from "next";
import { DEMO_EXPERIENCES_LISTINGS, DEMO_STAY_LISTINGS } from "@/data/listings";
import { createSeo } from "@/lib/seo";
import { getTourSeo } from "@/data/tourSeo";
import { SITE_URL } from "@/lib/seo";

type Props = { children: React.ReactNode; params: { id: string } };

function findTour(id: string) {
  return [...DEMO_EXPERIENCES_LISTINGS, ...DEMO_STAY_LISTINGS].find((item) => {
    const href = String(item.href || "");
    return href.endsWith(`/${id}`) || href.includes(`/${id}-`) || href.includes(`/${id}`);
  });
}

export function generateMetadata({ params }: Props): Metadata {
  const tour = findTour(params.id);
  const seo = getTourSeo(params.id);
  const title = seo?.title || tour?.title || "Private Lisbon Tuk Tuk Tour";
  const source = tour as (typeof tour & { description?: string; content?: string }) | undefined;
  const description =
    seo?.description ||
    source?.description ||
    source?.content ||
    `Discover ${title} with a friendly local Lisbon Mates guide. View the route, pricing and availability.`;
  const image = tour?.gallery?.[0]?.src;

  const metadata = createSeo({
    title,
    description: description.slice(0, 160),
    path: `/listing-experiences-detail/${params.id}`,
    image: typeof image === "string" ? image : undefined,
    keywords: seo?.keywords || ["Lisbon tuk tuk tour", title, "private Lisbon tour"],
  });

  return {
    ...metadata,
    authors: [{ name: "Lucas Guimarães", url: SITE_URL }],
    creator: "Lucas Guimarães",
  };
}

export default function TourLayout({ children, params }: Props) {
  const tour = findTour(params.id);
  const seo = getTourSeo(params.id);
  const title = seo?.title || tour?.title || "Private Lisbon Tuk Tuk Tour";
  const rawPrice = String(tour?.price || "");
  const price = rawPrice.match(/[0-9]+(?:\.[0-9]+)?/)?.[0];
  const schema = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: title,
    description: seo?.description,
    url: `${SITE_URL}/listing-experiences-detail/${params.id}`,
    touristType: "Sightseeing",
    provider: {
      "@type": "TravelAgency",
      name: "Lisbon Mates",
      url: SITE_URL,
      employee: {
        "@type": "Person",
        name: "Lucas Guimarães",
        jobTitle: "Local Tour Guide",
      },
    },
    ...(tour?.address
      ? { itinerary: { "@type": "Place", name: tour.address } }
      : {}),
    ...(price
      ? {
          offers: {
            "@type": "Offer",
            price,
            priceCurrency: "EUR",
            availability: "https://schema.org/InStock",
            url: `${SITE_URL}/listing-experiences-detail/${params.id}`,
          },
        }
      : {}),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      {children}
    </>
  );
}
