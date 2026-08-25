import type { Metadata } from "next";

export const SITE_NAME = "Lisbon Mates";
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://lisbonmates.com"
).replace(/\/$/, "");
export const DEFAULT_OG_IMAGE = "/lisbon-mates-desktop-image-2026.jpeg";

type SeoOptions = {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  image?: string;
  noIndex?: boolean;
};

export function createSeo({
  title,
  description,
  path,
  keywords = [],
  image = DEFAULT_OG_IMAGE,
  noIndex = false,
}: SeoOptions): Metadata {
  const canonicalPath = path === "/" ? "/" : `/${path.replace(/^\/+|\/+$/g, "")}`;
  const absoluteImage = image.startsWith("http") ? image : `${SITE_URL}${image}`;

  return {
    title,
    description,
    keywords,
    alternates: { canonical: canonicalPath },
    robots: noIndex
      ? { index: false, follow: false, nocache: true }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        },
    openGraph: {
      type: "website",
      locale: "en_GB",
      siteName: SITE_NAME,
      title,
      description,
      url: canonicalPath,
      images: [{ url: absoluteImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [absoluteImage],
    },
  };
}

export const privateSeo = (title: string, path: string): Metadata =>
  createSeo({
    title,
    description: `${title} – Lisbon Mates.`,
    path,
    noIndex: true,
  });
